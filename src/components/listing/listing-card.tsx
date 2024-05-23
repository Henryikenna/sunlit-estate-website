import Link from 'next/link'

import Image from 'next/image'
import { propertyWithImages } from '../../types/queries'
import slugify from '../../utils/slugify'
import SupabaseImage from '../supabase/image'
import CldImageWrapper from '../cloudinary/cld-image.wrapper'
import { getCldImageUrl } from 'next-cloudinary'

type Props = {
  listing: propertyWithImages
}

const ListingCard = ({ listing }: Props) => {
  return (
    <div className='card lg:card-side bg-base-100 shadow-xl m-3 static'>
      <figure className='h-48 lg:w-64 lg:h-auto relative'>
        <Link className='h-full w-full' href={`/listings/${listing.id}/${slugify(listing.name)}#top`}>
          {listing.property_images[0] && <CldImageWrapper src={listing.property_images[0]?.link!} />}
        </Link>
      </figure>

      <div className='card-body py-2 px-4'>
        <Link href={`/listings/${listing.id}/${slugify(listing.name)}#top`}>
          <h2 className='card-title link link-hover'>{listing.name}</h2>
        </Link>
        <div className='flex items-start'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5 mr-1 flex-shrink-0'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' />
          </svg>
          <p>{listing.address}</p>
        </div>

        <h2 className='text-lg font-bold'>€ {listing.price?.toLocaleString()}</h2>
        <div className='text-sm grid grid-cols-2'>
          {listing.lot_square_meter != null && (
            <>
              <div>Lot: </div>
              <div>{listing.lot_square_meter.toLocaleString()} m²</div>
            </>
          )}
          {listing.property_square_meter != null && (
            <>
              <div>Property: </div>
              <div>{listing.property_square_meter.toLocaleString()} m²</div>
            </>
          )}
        </div>
        <div className='flex items-end justify-end space-x-2 mt-2'>
          <div className='flex items-center'>
            <div className='badge badge-lg mr-2'>{listing.has_pool ? '✓' : 'X'}</div>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='currentColor' viewBox='0 0 900 900'>
              <g>
                <path d='M451.7 837.9c44.4 0 84.2-20.4 110.2-52.2 17.3-18 17.3-18 34.7 0 26 31.8 65.7 52.2 110.2 52.2 44.4 0 84.2-20.4 110.2-52.2 17.3-18 17.3-18 34.7 0 26 31.8 65.7 52.2 110.2 52.2v-28.1c-43.8 0-83.1-25-102-63.4-10.3-21.1-40.6-21.1-51 0-18.8 38.4-58.2 63.4-102 63.4s-83.1-25-102-63.4c-10.3-21.1-40.6-21.1-51 0-18.8 38.4-58.2 63.4-102 63.4s-83.1-25-102-63.4c-10.3-21.1-40.6-21.1-51 0-18.8 38.4-58.2 63.4-102 63.4-44.8 0-83.7-26-102-63.4-11.3-20.8-39.6-20.8-27.7 7.4 21.9 49.4 71.8 84.1 129.8 84.1 44.4 0 84.2-20.4 110.2-52.2 17.3-18 17.3-18 34.7 0 25.6 31.8 65.3 52.2 109.8 52.2zm146-533.8v-56.7c-.3-15.3-12.7-27.6-28.1-27.6-15.5 0-28.1 12.6-28.1 28.1 0 0 0 28.1-28.1 28.1s-28.1-28.1-28.1-28.1c0-46.5 37.7-84.3 84.3-84.3 46.5 0 84.3 37.7 84.3 84.3v332.5c8.9-8.8 16.5-19.1 22.1-30.7 10.3-21.1 40.6-21.1 51 0 18.8 38.4 58.2 63.4 102 63.4 44.8 0 83.7-26 102-63.4 11.3-20.8 39.6-20.8 27.7 7.4-21.9 49.4-71.8 84.1-129.8 84.1-44.4 0-84.2-20.4-110.2-52.2-17.3-18-17.3-18-34.7 0-26 31.8-65.7 52.2-110.2 52.2-44.4 0-84.2-20.4-110.2-52.2-17.3-18-17.3-18-34.7 0-26 31.8-65.7 52.2-110.2 52.2-44.4 0-84.2-20.4-110.2-52.2-17.3-18-17.3-18-34.7 0-26 31.8-65.7 52.2-110.2 52.2v-28.1c43.8 0 83.1-25 102-63.4 10.3-21.1 40.6-21.1 51 0 18.8 38.4 58.2 63.4 102 63.4 31.7 0 61.1-13.1 82.1-34.9V247.5c-.3-15.3-12.7-27.6-28.1-27.6-15.5 0-28.1 12.6-28.1 28.1 0 0 0 28.1-28.1 28.1S288.7 248 288.7 248c0-46.5 37.7-84.3 84.3-84.3 46.5 0 84.3 37.7 84.3 84.3v56.2l140.4-.1z'></path>
                <path fill='#FFF' d='M457.3 360.3h140.4v56.2H457.3zm0 112.4h140.4v56.2H457.3zm140.4 138V585H499c20.3 17.7 46.7 28.1 75 28.1 8.1 0 16-.8 23.7-2.4z'></path>
              </g>
            </svg>
          </div>
          {listing.num_bedrooms != null && (
            <div className='flex items-center'>
              <div className='badge badge-lg mr-2'>{listing.num_bedrooms}</div>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='currentColor' viewBox='0 0 512 512'>
                <path d='M496 320V72c0-8.836-7.164-16-16-16s-16 7.164-16 16v16H48V72c0-8.836-7.164-16-16-16s-16 7.164-16 16v248c-8.836 0-16 7.164-16 16v104c0 8.836 7.164 16 16 16h40a16 16 0 0012.8-6.4L88 424h336l19.2 25.6A15.999 15.999 0 00456 456h40c8.836 0 16-7.164 16-16V336c0-8.836-7.164-16-16-16zm-32-71.39c-17.206-9.979-30.797-8.61-48-8.61v-32c0-26.467-21.533-48-48-48h-80c-12.284 0-23.501 4.644-32 12.261-8.499-7.617-19.716-12.261-32-12.261h-80c-26.467 0-48 21.533-48 48v32c-17.989 0-30.887-1.315-48 8.61V120h416zM128 240v-32c0-8.822 7.178-16 16-16h80c8.822 0 16 7.178 16 16v32zm144-32c0-8.822 7.178-16 16-16h80c8.822 0 16 7.178 16 16v32H272zM48 304c0-17.645 14.355-32 32-32h352c17.645 0 32 14.355 32 32v16H48zm432 120h-16l-19.2-25.6A15.999 15.999 0 00432 392H80a16 16 0 00-12.8 6.4L48 424H32v-72h448z'></path>
              </svg>
            </div>
          )}
          {listing.num_bathrooms != null && (
            <div className='flex items-center'>
              <div className='badge badge-lg mr-2'>{listing.num_bathrooms}</div>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='currentColor' viewBox='0 0 512 512'>
                <path d='M464 280H80V100a51.258 51.258 0 0115.113-36.485l.4-.4a51.691 51.691 0 0158.6-10.162 79.1 79.1 0 0011.778 96.627l10.951 10.951-20.157 20.158 22.626 22.626 20.157-20.157L311.157 71.471l20.157-20.157-22.627-22.627-20.158 20.157-10.951-10.951a79.086 79.086 0 00-100.929-8.976A83.61 83.61 0 0072.887 40.485l-.4.4A83.054 83.054 0 0048 100v180H16v32h32v30.7a23.95 23.95 0 001.232 7.589L79 439.589A23.969 23.969 0 00101.766 456h12.9L103 496h33.333L148 456h208.1l12 40h33.4l-12-40h20.73A23.969 23.969 0 00433 439.589l29.766-89.3A23.982 23.982 0 00464 342.7V312h32v-32zM188.52 60.52a47.025 47.025 0 0166.431 0L265.9 71.471 199.471 137.9l-10.951-10.949a47.027 47.027 0 010-66.431zM432 341.4L404.468 424H107.532L80 341.4V312h352z'></path>
              </svg>
            </div>
          )}
        </div>
        {listing.realtors && (
          <div className='flex items-center justify-end space-x-2 mt-2'>
            {listing.realtors?.name} <Image width={32} height={32} src={`/realtors_logos/${listing.realtors?.icon}`} alt={`${listing.realtors?.name} Logo`} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ListingCard
