import { unstable_cache } from 'next/cache'
import Image from 'next/image'
import Link from 'next/link'
import { PROPERTY_CACHE } from '../../../../cache/keys'
import Carousel from '../../../../components/carousel/carousel'
import CldImageWrapper from '../../../../components/cloudinary/cld-image.wrapper'
import AddressInfo from '../../../../components/map/address-info'
import { getServerClient } from '../../../../supabase/async-config'
import { getSinglePropertyWithImages } from '../../../../types/more-queries'
import { ensureHttps } from '../../../../utils/ensure-https'
import { Suspense } from 'react'
import Loading from '../../../loading'
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { id: string }
}

const cachedProperty = unstable_cache(
  async (client, id) => {
    return await getSinglePropertyWithImages(client, id)
  },
  ['view-property'],
  { tags: [PROPERTY_CACHE] }
)

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const id = params.id

  // fetch data
  const supabase = await getServerClient()
  const { data, error } = await cachedProperty(supabase, params.id)

  if (error) return {}

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  const images: string[] = (data.property_images?.map((img) => img.link).filter((link) => link !== null) || []) as string[]

  return {
    metadataBase: new URL('https://www.sunlitcaribbeanestates.com/'),
    title: data.seo_title,
    description: data.seo_description,
    keywords: data.seo_keywords,
    openGraph: {
      images: [...images, ...previousImages],
    },
  }
}

const Page = async ({ params }: Props) => {
  const supabase = await getServerClient()
  const { data, error } = await cachedProperty(supabase, params.id)
  if (error) throw error

  return (
    <div className='flex justify-center items-center w-full px-5 py-5'>
      <div className='xl:max-w-7xl w-full'>
        <div className='prose max-w-full'>
          <h1 className='mb-1'>{data.name}</h1>
          <div className='flex items-center'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' />
            </svg>
            <AddressInfo address={data.address} area={data.area} latLng={{ lat: data.latitude, lng: data.longitude }} />
          </div>
        </div>

        <Suspense fallback={<Loading />}>
          <Carousel loop>
            {data?.property_images.map((img, i) => {
              return (
                // 👇 style each individual slide.
                // relative - needed since we use the fill prop from next/image component
                // h-64 - arbitrary height
                // flex[0_0_100%]
                //   - shorthand for flex-grow:0; flex-shrink:0; flex-basis:100%
                //   - we want this slide to not be able to grow or shrink and take up 100% width of the viewport.
                <div className='relative flex-[0_0_100%]' key={i}>
                  {/* use object-cover + fill since we don't know the height and width of the parent */}
                  <CldImageWrapper src={img.link!} />
                </div>
              )
            })}
          </Carousel>
        </Suspense>
        <div className='flex lg:justify-between'>
          <div className='stats stats-vertical lg:stats-horizontal shadow-xl gap-2 my-6'>
            <div className='stat'>
              <div className='stat-figure text-primary'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='inline-block w-8 h-8 stroke-current'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z'
                  />
                </svg>
              </div>
              <div className='stat-title'>Price</div>
              <div className='stat-value text-primary'>${data.price?.toLocaleString()}</div>
            </div>
            <div className='stat'>
              <div className='stat-figure text-primary'>
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 48 48' className='inline-block w-8 h-8 stroke-current'>
                  <path d='M38.5 32.25v-16.5a5 5 0 10-6.25-6.25h-16.5a5 5 0 10-6.25 6.25v16.5a5 5 0 106.25 6.25h16.5a5 5 0 106.25-6.25zm-6.25 3.25h-16.5a5 5 0 00-3.25-3.25v-16.5a5 5 0 003.25-3.25h16.5a5 5 0 003.25 3.25v16.5a5 5 0 00-3.25 3.25zM37 9a2 2 0 11-2 2 2 2 0 012-2zM11 9a2 2 0 11-2 2 2 2 0 012-2zm0 30a2 2 0 112-2 2 2 0 01-2 2zm26 0a2 2 0 112-2 2 2 0 01-2 2z'></path>
                </svg>
              </div>
              <div className='stat-title'>Property size</div>
              <div className='stat-value text-primary'>{data.property_square_meter ? data.property_square_meter.toLocaleString() + 'm²' : '-'}</div>
            </div>
            <div className='stat'>
              <div className='stat-figure text-primary'>
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 48 48' className='inline-block w-8 h-8 stroke-current'>
                  <path d='M43 5.5A1.5 1.5 0 0041.5 4h-35A1.5 1.5 0 005 5.5v37A1.5 1.5 0 006.5 44h35a1.5 1.5 0 001.5-1.5zm-35 9h13v5a1.5 1.5 0 001.5 1.5H30v20H8zm25 5a1.5 1.5 0 00-1.5-1.5H24v-5a1.5 1.5 0 00-1.5-1.5H8V7h32v34h-7z'></path>
                </svg>
              </div>
              <div className='stat-title'>Lot size</div>
              <div className='stat-value text-primary'>{data.lot_square_meter ? data.lot_square_meter.toLocaleString() + 'm²' : '-'}</div>
            </div>
          </div>
          <div className='gap-2 my-6 ml-4'>
            <div className='flex flex-col lg:flex-row'>
              <div className='flex items-center mr-4'>
                <div className='cursor-default btn btn-outline btn-active btn-primary mr-2  mt-4 lg:mt-0'>{data.num_bedrooms}</div>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12' fill='currentColor' viewBox='0 0 512 512'>
                  <path d='M496 320V72c0-8.836-7.164-16-16-16s-16 7.164-16 16v16H48V72c0-8.836-7.164-16-16-16s-16 7.164-16 16v248c-8.836 0-16 7.164-16 16v104c0 8.836 7.164 16 16 16h40a16 16 0 0012.8-6.4L88 424h336l19.2 25.6A15.999 15.999 0 00456 456h40c8.836 0 16-7.164 16-16V336c0-8.836-7.164-16-16-16zm-32-71.39c-17.206-9.979-30.797-8.61-48-8.61v-32c0-26.467-21.533-48-48-48h-80c-12.284 0-23.501 4.644-32 12.261-8.499-7.617-19.716-12.261-32-12.261h-80c-26.467 0-48 21.533-48 48v32c-17.989 0-30.887-1.315-48 8.61V120h416zM128 240v-32c0-8.822 7.178-16 16-16h80c8.822 0 16 7.178 16 16v32zm144-32c0-8.822 7.178-16 16-16h80c8.822 0 16 7.178 16 16v32H272zM48 304c0-17.645 14.355-32 32-32h352c17.645 0 32 14.355 32 32v16H48zm432 120h-16l-19.2-25.6A15.999 15.999 0 00432 392H80a16 16 0 00-12.8 6.4L48 424H32v-72h448z'></path>
                </svg>
              </div>
              <div className='flex items-center mr-4'>
                <div className='cursor-default btn btn-outline btn-active btn-primary mr-2  mt-4 lg:mt-0'>{data.num_bathrooms}</div>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12' fill='currentColor' viewBox='0 0 512 512'>
                  <path d='M464 280H80V100a51.258 51.258 0 0115.113-36.485l.4-.4a51.691 51.691 0 0158.6-10.162 79.1 79.1 0 0011.778 96.627l10.951 10.951-20.157 20.158 22.626 22.626 20.157-20.157L311.157 71.471l20.157-20.157-22.627-22.627-20.158 20.157-10.951-10.951a79.086 79.086 0 00-100.929-8.976A83.61 83.61 0 0072.887 40.485l-.4.4A83.054 83.054 0 0048 100v180H16v32h32v30.7a23.95 23.95 0 001.232 7.589L79 439.589A23.969 23.969 0 00101.766 456h12.9L103 496h33.333L148 456h208.1l12 40h33.4l-12-40h20.73A23.969 23.969 0 00433 439.589l29.766-89.3A23.982 23.982 0 00464 342.7V312h32v-32zM188.52 60.52a47.025 47.025 0 0166.431 0L265.9 71.471 199.471 137.9l-10.951-10.949a47.027 47.027 0 010-66.431zM432 341.4L404.468 424H107.532L80 341.4V312h352z'></path>
                </svg>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row my-3'>
              <div className='flex items-center mr-4 mt-4 lg:mt-0'>
                <div className='cursor-default btn btn-outline btn-active btn-primary mr-2  mt-4 lg:mt-0'>{data.has_pool ? 'Y' : 'N'}</div>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12' fill='currentColor' viewBox='0 0 900 900'>
                  <g>
                    <path d='M451.7 837.9c44.4 0 84.2-20.4 110.2-52.2 17.3-18 17.3-18 34.7 0 26 31.8 65.7 52.2 110.2 52.2 44.4 0 84.2-20.4 110.2-52.2 17.3-18 17.3-18 34.7 0 26 31.8 65.7 52.2 110.2 52.2v-28.1c-43.8 0-83.1-25-102-63.4-10.3-21.1-40.6-21.1-51 0-18.8 38.4-58.2 63.4-102 63.4s-83.1-25-102-63.4c-10.3-21.1-40.6-21.1-51 0-18.8 38.4-58.2 63.4-102 63.4s-83.1-25-102-63.4c-10.3-21.1-40.6-21.1-51 0-18.8 38.4-58.2 63.4-102 63.4-44.8 0-83.7-26-102-63.4-11.3-20.8-39.6-20.8-27.7 7.4 21.9 49.4 71.8 84.1 129.8 84.1 44.4 0 84.2-20.4 110.2-52.2 17.3-18 17.3-18 34.7 0 25.6 31.8 65.3 52.2 109.8 52.2zm146-533.8v-56.7c-.3-15.3-12.7-27.6-28.1-27.6-15.5 0-28.1 12.6-28.1 28.1 0 0 0 28.1-28.1 28.1s-28.1-28.1-28.1-28.1c0-46.5 37.7-84.3 84.3-84.3 46.5 0 84.3 37.7 84.3 84.3v332.5c8.9-8.8 16.5-19.1 22.1-30.7 10.3-21.1 40.6-21.1 51 0 18.8 38.4 58.2 63.4 102 63.4 44.8 0 83.7-26 102-63.4 11.3-20.8 39.6-20.8 27.7 7.4-21.9 49.4-71.8 84.1-129.8 84.1-44.4 0-84.2-20.4-110.2-52.2-17.3-18-17.3-18-34.7 0-26 31.8-65.7 52.2-110.2 52.2-44.4 0-84.2-20.4-110.2-52.2-17.3-18-17.3-18-34.7 0-26 31.8-65.7 52.2-110.2 52.2-44.4 0-84.2-20.4-110.2-52.2-17.3-18-17.3-18-34.7 0-26 31.8-65.7 52.2-110.2 52.2v-28.1c43.8 0 83.1-25 102-63.4 10.3-21.1 40.6-21.1 51 0 18.8 38.4 58.2 63.4 102 63.4 31.7 0 61.1-13.1 82.1-34.9V247.5c-.3-15.3-12.7-27.6-28.1-27.6-15.5 0-28.1 12.6-28.1 28.1 0 0 0 28.1-28.1 28.1S288.7 248 288.7 248c0-46.5 37.7-84.3 84.3-84.3 46.5 0 84.3 37.7 84.3 84.3v56.2l140.4-.1z'></path>
                    <path fill='#FFF' d='M457.3 360.3h140.4v56.2H457.3zm0 112.4h140.4v56.2H457.3zm140.4 138V585H499c20.3 17.7 46.7 28.1 75 28.1 8.1 0 16-.8 23.7-2.4z'></path>
                  </g>
                </svg>
              </div>
              <div className='flex items-center'>
                <div className='cursor-default btn btn-outline btn-active btn-primary mr-2 mt-4 lg:mt-0'>{data.has_garden ? 'Y' : 'N'}</div>
                <svg viewBox='0 0 24 24' fill='currentColor' className='h-12 w-12' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M12.0007 13.537L12.5959 13.0807C12.454 12.8955 12.234 12.787 12.0007 12.787C11.7675 12.787 11.5475 12.8955 11.4055 13.0807L12.0007 13.537ZM8.88974 15.066L8.89204 14.316C8.88678 14.316 8.88153 14.316 8.87627 14.3161L8.88974 15.066ZM8.44674 7.443L8.52022 8.18939C8.76089 8.1657 8.97537 8.02741 9.09627 7.81797C9.21718 7.60853 9.22968 7.35364 9.12984 7.13338L8.44674 7.443ZM8.11174 5.889L8.86174 5.88968V5.889H8.11174ZM15.8897 5.889H15.1397V5.88968L15.8897 5.889ZM15.5547 7.443L14.8716 7.13338C14.7718 7.35364 14.7843 7.60853 14.9052 7.81797C15.0261 8.02741 15.2406 8.1657 15.4813 8.18939L15.5547 7.443ZM18.9949 11.4673L18.2462 11.4238V11.4238L18.9949 11.4673ZM15.1117 15.066L15.1252 14.3161C15.12 14.316 15.1147 14.316 15.1094 14.316L15.1117 15.066ZM12.7507 13.537C12.7507 13.1228 12.415 12.787 12.0007 12.787C11.5865 12.787 11.2507 13.1228 11.2507 13.537H12.7507ZM11.2507 21.066C11.2507 21.4802 11.5865 21.816 12.0007 21.816C12.415 21.816 12.7507 21.4802 12.7507 21.066H11.2507ZM11.2507 13.537C11.2507 13.9512 11.5865 14.287 12.0007 14.287C12.415 14.287 12.7507 13.9512 12.7507 13.537H11.2507ZM12.7507 11.551C12.7507 11.1368 12.415 10.801 12.0007 10.801C11.5865 10.801 11.2507 11.1368 11.2507 11.551H12.7507ZM12.7507 8.566C12.7507 8.15179 12.415 7.816 12.0007 7.816C11.5865 7.816 11.2507 8.15179 11.2507 8.566H12.7507ZM11.2507 9.566C11.2507 9.98021 11.5865 10.316 12.0007 10.316C12.415 10.316 12.7507 9.98021 12.7507 9.566H11.2507ZM12.4507 10.166C12.7821 9.91747 12.8493 9.44737 12.6007 9.116C12.3522 8.78463 11.8821 8.71747 11.5507 8.966L12.4507 10.166ZM9.55074 10.466C9.21937 10.7145 9.15221 11.1846 9.40074 11.516C9.64927 11.8474 10.1194 11.9145 10.4507 11.666L9.55074 10.466ZM12.7507 9.566C12.7507 9.15179 12.415 8.816 12.0007 8.816C11.5865 8.816 11.2507 9.15179 11.2507 9.566H12.7507ZM11.2507 11.551C11.2507 11.9652 11.5865 12.301 12.0007 12.301C12.415 12.301 12.7507 11.9652 12.7507 11.551H11.2507ZM12.2829 10.8561C11.8991 10.7003 11.4616 10.8851 11.3058 11.2689C11.15 11.6527 11.3348 12.0901 11.7186 12.2459L12.2829 10.8561ZM14.2186 13.2609C14.6024 13.4167 15.0398 13.2319 15.1956 12.8481C15.3515 12.4643 15.1667 12.0269 14.7829 11.8711L14.2186 13.2609ZM11.4055 13.0807C10.8064 13.8621 9.87675 14.319 8.89204 14.316L8.88743 15.816C10.3403 15.8205 11.7119 15.1463 12.5959 13.9933L11.4055 13.0807ZM8.87627 14.3161C7.22834 14.3457 5.8509 13.0692 5.75528 11.4238L4.2578 11.5108C4.40013 13.9599 6.45037 15.8599 8.90321 15.8159L8.87627 14.3161ZM5.75528 11.4238C5.65965 9.77837 6.87996 8.35087 8.52022 8.18939L8.37326 6.69661C5.93183 6.93696 4.11548 9.06171 4.2578 11.5108L5.75528 11.4238ZM9.12984 7.13338C8.95276 6.74269 8.86135 6.31863 8.86174 5.88968L7.36174 5.88832C7.36115 6.53131 7.49819 7.16698 7.76363 7.75262L9.12984 7.13338ZM8.86174 5.889C8.86174 4.15538 10.2671 2.75 12.0007 2.75V1.25C9.43869 1.25 7.36174 3.32695 7.36174 5.889H8.86174ZM12.0007 2.75C13.7344 2.75 15.1397 4.15538 15.1397 5.889H16.6397C16.6397 3.32695 14.5628 1.25 12.0007 1.25V2.75ZM15.1397 5.88968C15.1401 6.31863 15.0487 6.74269 14.8716 7.13338L16.2378 7.75262C16.5033 7.16698 16.6403 6.53131 16.6397 5.88832L15.1397 5.88968ZM15.4813 8.18939C17.1215 8.35087 18.3418 9.77837 18.2462 11.4238L19.7437 11.5108C19.886 9.06171 18.0696 6.93696 15.6282 6.69661L15.4813 8.18939ZM18.2462 11.4238C18.1506 13.0692 16.7731 14.3457 15.1252 14.3161L15.0983 15.8159C17.5511 15.8599 19.6013 13.9599 19.7437 11.5108L18.2462 11.4238ZM15.1094 14.316C14.1247 14.319 13.1951 13.8621 12.5959 13.0807L11.4055 13.9933C12.2895 15.1463 13.6612 15.8205 15.114 15.816L15.1094 14.316ZM11.2507 13.537V21.066H12.7507V13.537H11.2507ZM12.7507 13.537V11.551H11.2507V13.537H12.7507ZM11.2507 8.566V9.566H12.7507V8.566H11.2507ZM11.5507 8.966L9.55074 10.466L10.4507 11.666L12.4507 10.166L11.5507 8.966ZM11.2507 9.566V11.551H12.7507V9.566H11.2507ZM11.7186 12.2459L14.2186 13.2609L14.7829 11.8711L12.2829 10.8561L11.7186 12.2459Z'
                    fill='#000000'
                  ></path>
                </svg>
              </div>
              <div className='flex items-center'>
                <div className='cursor-default btn btn-outline btn-active btn-primary mr-2 mt-4 lg:mt-0'>{data.has_balcony ? 'Y' : 'N'}</div>
                <svg fill='currentColor' xmlns='http://www.w3.org/2000/svg' className='h-12 w-12' viewBox='0 0 582 542'>
                  <path d='M501.801,410.008h-54.566V220.303h25.498v126.47c0,5.633,4.567,10.199,10.199,10.199c5.632,0,10.199-4.566,10.199-10.199 v-126.47h8.669c5.632,0,10.199-4.566,10.199-10.199c0-5.633-4.567-10.199-10.199-10.199h-99.952V52.016 c0-5.633-4.567-10.199-10.199-10.199H120.351c-5.632,0-10.199,4.566-10.199,10.199v147.888H10.199 C4.567,199.904,0,204.471,0,210.104c0,5.633,4.567,10.199,10.199,10.199h8.669v189.705h-8.669C4.567,410.008,0,414.574,0,420.207 v39.777c0,5.633,4.567,10.199,10.199,10.199h491.602c5.632,0,10.199-4.566,10.199-10.199v-39.777 C512,414.574,507.433,410.008,501.801,410.008z M401.849,220.303h24.988v189.705h-24.988V220.303z M130.55,62.215h250.9v137.689 h-24.541V98.932c0-5.633-4.567-10.199-10.199-10.199H165.29c-5.632,0-10.199,4.566-10.199,10.199v100.972H130.55V62.215z M381.45,220.303v189.705h-24.541V220.303H381.45z M265.689,199.904v-90.773h70.821v90.773H265.689z M336.51,220.303v189.705 h-24.925V220.303H336.51z M291.187,220.303v189.705h-25.498V220.303H291.187z M175.49,199.904v-90.773h69.801v90.773H175.49z M245.291,220.303v189.705h-24.478V220.303H245.291z M200.414,220.303v189.705H175.49V220.303H200.414z M130.55,220.303h24.541 v189.705H130.55V220.303z M84.143,220.303h26.008v189.705H84.143V220.303z M39.267,220.303h24.478v189.705H39.267V220.303z M491.602,449.785H20.398v-19.378h471.203V449.785z'></path>
                  <path d='M482.932,369.211c-5.632,0-10.199,4.566-10.199,10.199v7.139c0,5.633,4.567,10.199,10.199,10.199 c5.632,0,10.199-4.566,10.199-10.199v-7.139C493.131,373.777,488.564,369.211,482.932,369.211z'></path>
                </svg>
              </div>
              <div className='flex items-center'>
                <div className='cursor-default btn btn-outline btn-active btn-primary mr-2 mt-4 lg:mt-0'>{data.has_parking ? 'Y' : 'N'}</div>
                <svg className='h-12 w-12' viewBox='0 0 17 15' version='1.1' id='parking-garage' xmlns='http://www.w3.org/2000/svg' fill='currentColor'>
                  <path
                    d='M10.5,10.14c-0.6637,0.4788-1.4732,0.7121-2.29,0.66h-1.9V14h-1.9V5h3.92
	c0.7801-0.0414,1.5484,0.2041,2.16,0.69c0.5779,0.5595,0.875,1.3483,0.81,2.15C11.4042,8.6892,11.1088,9.5388,10.5,10.14z M9,6.9
	C8.711,6.6881,8.3579,6.5822,8,6.6H6.31v2.65H8c0.3612,0.0191,0.717-0.0947,1-0.32c0.2559-0.2675,0.3867-0.6308,0.36-1
	C9.4072,7.5493,9.274,7.1684,9,6.9z M14.41,4.21c0.114-0.2486,0.007-0.5427-0.24-0.66L7.5,0.45l-6.71,3.1
	C0.5387,3.666,0.429,3.9637,0.545,4.215C0.661,4.4663,0.9587,4.576,1.21,4.46l0,0L7.5,1.55l6.29,2.9
	c0.2486,0.114,0.5427,0.007,0.66-0.24H14.41z'
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 w-full'>
          <div className='col-span-2 w-full'>
            <div>
              <div className='px-2 sm:px-0 mt-1 mb-4'>
                <h2 className='text-lg font-extrabold'>Description</h2>
              </div>
              <div className='prose w-full max-w-none' dangerouslySetInnerHTML={{ __html: data.description! }}></div>
            </div>
            <div>
              <div className='px-2 sm:px-0 mt-1 mb-4'>
                <h2 className='text-lg font-extrabold'>Property details</h2>
              </div>
              <div className='mt-1 border-t border-gray-100'>
                <dl className='divide-y divide-gray-100'>
                  <div className='px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0'>
                    <dt className='my-2 text-sm text-base-content'>Name</dt>
                    <dd className='my-2 text-sm text-base-content text-opacity-60'>{data.name}</dd>
                  </div>
                  <div className='px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0'>
                    <dt className='my-2 text-sm text-base-content'>Area</dt>
                    <dd className='my-2 text-sm text-base-content text-opacity-60'>{data.area}</dd>
                  </div>
                  <div className='px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0'>
                    <dt className='my-2 text-sm text-base-content'>Address</dt>
                    <dd className='my-2 text-sm text-base-content text-opacity-60'>{data.address}</dd>
                  </div>
                  <div className='px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0'>
                    <dt className='my-2 text-sm text-base-content'>Type</dt>
                    <dd className='my-2 text-sm text-base-content text-opacity-60'>{data.property_building_type}</dd>
                  </div>
                  <div className='px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0'>
                    <dt className='my-2 text-sm text-base-content'>Price</dt>
                    <dd className='my-2 text-sm text-base-content text-opacity-60'>$ {data.price?.toLocaleString()}</dd>
                  </div>
                  <div className='px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0'>
                    <dt className='my-2 text-sm text-base-content'>Property size</dt>
                    <dd className='my-2 text-sm text-base-content text-opacity-60'>{data.property_square_meter ? data.property_square_meter.toLocaleString() + 'm²' : '-'}</dd>
                  </div>
                  <div className='px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0'>
                    <dt className='my-2 text-sm text-base-content'>Property size</dt>
                    <dd className='my-2 text-sm text-base-content text-opacity-60'>{data.lot_square_meter ? data.lot_square_meter.toLocaleString() + 'm²' : '-'}</dd>
                  </div>
                  <div className='px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0'>
                    <dt className='my-2 text-sm text-base-content'>Bedrooms</dt>
                    <dd className='my-2 text-sm text-base-content text-opacity-60'>{data.num_bedrooms}</dd>
                  </div>
                  <div className='px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0'>
                    <dt className='my-2 text-sm text-base-content'>Bathrooms</dt>
                    <dd className='my-2 text-sm text-base-content text-opacity-60'>{data.num_bathrooms}</dd>
                  </div>
                  <div className='px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0'>
                    <dt className='my-2 text-sm text-base-content'>Pool</dt>
                    <dd className='my-2 text-sm text-base-content text-opacity-60'>{data.has_pool ? 'Yes' : 'No'}</dd>
                  </div>
                  <div className='px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0'>
                    <dt className='my-2 text-sm text-base-content'>Garden</dt>
                    <dd className='my-2 text-sm text-base-content text-opacity-60'>{data.has_garden ? 'Yes' : 'No'}</dd>
                  </div>
                  <div className='px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0'>
                    <dt className='my-2 text-sm text-base-content'>Balcony</dt>
                    <dd className='my-2 text-sm text-base-content text-opacity-60'>{data.has_balcony ? 'Yes' : 'No'}</dd>
                  </div>
                  <div className='px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0'>
                    <dt className='my-2 text-sm text-base-content'>Parking</dt>
                    <dd className='my-2 text-sm text-base-content text-opacity-60'>{data.has_parking ? 'Yes' : 'No'}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <div>
            {(data.realtors || data.realtor_url || data.property_url) && (
              <div className='card h-72 bg-base-100 shadow-xl mt-8 w-full'>
                <figure className='bg-primary p-4'>
                  <svg fill='white' className='h-12 w-12' viewBox='0 0 50 50' version='1.2' baseProfile='tiny' xmlns='http://www.w3.org/2000/svg' overflow='inherit'>
                    <path d='M14.237 39.5h30.483v-26.081h-30.483v26.081zm15.489-23.485l10.99 9.598h-2.769v11.516h-6.436v-8.129h-4.065v8.129h-6.096v-11.516h-2.84l11.216-9.598zm-18.876-9.031v-5.966h-6.774v48.982h6.774v-39.967h35.226v-3.049z'></path>
                  </svg>
                </figure>
                <div className='card-body'>
                  <h3 className='card-title'>Listed on: </h3>
                  {data.realtors && (
                    <div className='flex items-center space-x-2 mt-2'>
                      {data.realtors?.name} <Image width={32} height={32} src={`/realtors_logos/${data.realtors?.icon}`} alt={`${data.realtors?.name} Logo`} />
                    </div>
                  )}
                  {data.realtor_url && <div className='flex items-center space-x-2 mt-2'>{data.realtor_url}</div>}
                  <div className='card-actions justify-end'>
                    {data.property_url && (
                      <Link href={data.property_url.startsWith('http') ? data.property_url : `http://${data.property_url}`} className='btn btn-primary'>
                        View Listing
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}
            {data.youtube_url && (
              <div className='card h-92 bg-base-100 shadow-xl mt-8 w-full'>
                <figure className='bg-primary h-18 p-4'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17' />
                    <path d='m10 15 5-3-5-3z' />
                  </svg>
                </figure>
                <div className='card-body'>
                  <div className='aspect-w-16 aspect-h-9'>
                    <iframe src={ensureHttps(data.youtube_url)} allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen'></iframe>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
