import BodyBackground from '@/components/BodyBackground'
import Image from 'next/image'
import Link from 'next/link'
import { BsPatchCheckFill } from 'react-icons/bs'
import { PiRocketLight } from 'react-icons/pi'
import { IoDiamondOutline } from 'react-icons/io5'

export type Realtor = {
  id: number
  name: string
  website: string
  description: string
  // Add more properties as needed
}

type Props = {
  realtors: Realtor[]
}

type RealtorDetailsProps = {
  realtor: Realtor
}

const Realtors = ({ realtors }: Props) => {
  return (
    <>
      <BodyBackground isSearchInputVisible={false} />
      <div className='py-8 md:py-12 lg:py-[4.625rem]'>
        <h1 className='text-base font-openSans text-center font-bold text-[#1E1E1E] mb-8 opacity-80 md:pb-12 lg:pb-[4.625rem] md:text-xl lg:text-[2rem]'>Realtors We Work With</h1>
        {/* <ul>
          {realtors.map((realtor) => (
            <li key={realtor.id}>
              <RealtorDetails realtor={realtor} />
            </li>
          ))}
        </ul> */}

        {/* <Image src={'/bonaireImg.png'} alt='' layout='fill' objectFit='cover' className=' w-full h-40'></Image> */}
        <section className='pb-8 md:pb-12 lg:pb-[4.625rem] lg:flex lg:gap-10 lg:justify-center lg:items-center lg:px-[3.75rem]'>
          <img src='/bonaireImg.png' alt='' className='w-full pb-3 lg:w-1/2 lg:rounded-2xl lg:object-cover lg:pb-0 lg:shadow-md lg:h-[464px]' />
          <div className='lg:w-1/2'>
            <h3 className='font-openSans font-semibold pb-3 text-base px-2 lg:text-[2rem] lg:text-center lg:px-0'>Caribbean Homes Bonaire</h3>
            <h4 className='font-openSans font-normal text-sm px-2 pb-3 lg:text-lg lg:px-0 lg:pb-10'>
              Since its establishment in 2006, Caribbean Homes Bonaire has become a trusted entity in the real estate market for both purchasing and selling properties on the island. <br /> <br /> As
              Bonaire continues to grow, the team at Caribbean Homes offers local expertise and an extensive network to help clients navigate the complex real estate environment. The agency's trusted
              and knowledgeable agents are prepared to support clients through every step, providing access to a diverse portfolio that includes both publicized and exclusive listings.
            </h4>
            <button className='btn bg-[#F6812D] rounded-none border-none text-white font-openSans font-semibold shadow-none w-full lg:text-[1.125rem] lg:w-[274px] lg:h-[65px] lg:rounded-lg lg:justify-center lg:items-center lg:flex lg:mx-auto hover:bg-[#F6812D]'>
              <BsPatchCheckFill /> Visit Caribbean
            </button>
          </div>
        </section>

        <section className='pb-8 md:pb-12 lg:pb-[4.625rem] lg:flex lg:justify-center lg:items-center lg:px-[3.75rem]'>
          {/* <img src='/sunbeltBonaireImage.png' alt='' className=' w-full lg:w-1/2 lg:rounded-2xl lg:shadow-md' /> */}
          <div className='relative lg:w-1/2'>
            <img src='/sunbeltBonaireImage.png' alt='' className='w-full lg:rounded-l-2xl lg:h-[526px]' />
            <img src='/approvedIllustration.svg' alt='' className='absolute bottom-3 left-3 w-[50px] h-[50px] lg:bottom-[1.875rem] lg:left-[1.875rem] lg:w-[113px] lg:h-[113px]' />
          </div>
          <div className='bg-[#F6812D] px-4 py-8 lg:px-16 lg:w-1/2 lg:h-[526px] lg:rounded-r-2xl lg:flex lg:flex-col lg:justify-center lg:text-start'>
            <h3 className=' font-openSans font-semibold pb-3 text-base px-1 text-white lg:text-[2rem] lg:pb-6'>Sunbelt Bonaire</h3>
            <h4 className=' font-openSans font-normal text-sm px-1 pb-3 text-white lg:text-lg lg:pb-6'>
              Sunbelt Realty, boasting over 30 years of experience on Bonaire, has become a staple in the local real estate landscape. Its commitment to the community, understanding of the market, and
              professional integrity define its presence in the real estate services sector.
            </h4>
            <button className='btn bg-[#06384A] rounded-none border-none text-white font-openSans font-semibold shadow-none w-full hover:bg-[#06384A] lg:text-[1.125rem] lg:w-[254px] lg:h-[58px] lg:rounded-lg'>
              <BsPatchCheckFill /> Visit Sunbelt
            </button>
          </div>
        </section>

        <section className=' mb-8 px-4 py-6 bg-[#06384A] lg:flex lg:px-[3.75rem] lg:mb-[4.625rem] lg:py-10'>
          <div className=''>
            <div className=' w-max flex justify-center items-center pb-3 px-3 lg:px-6 lg:pb-6 lg:pt-4'>
              <img src='/doodle1.svg' alt='' className='w-9 absolute lg:w-16' />
              <PiRocketLight className='text-white text-xl relative lg:text-3xl' />
            </div>
            <h3 className='font-openSans font-semibold pb-2 text-base text-[#F6812D] lg:text-2xl'>RE/MAX Paradise Homes</h3>
            <h4 className='font-openSans font-normal text-sm text-white lg:text-xl'>
              RE/MAX Paradise Homes is recognized as a leader among real estate professionals in the Caribbean. Its expertise in customer service, market knowledge, and relationship building
              facilitates collaborations with individuals, land developers, and financial executives.
            </h4>
          </div>

          <hr className='text-white opacity-40 my-5 lg:hidden' />
          <div className=' hidden w-[1px] bg-white bg-opacity-40 mx-10 lg:mt-4 lg:block'></div>

          <div className=''>
            <div className=' w-max flex justify-center items-center pb-3 px-3 pt-2 lg:px-6 lg:pb-6 lg:pt-4'>
              <img src='/doodle2.svg' alt='' className='w-9 absolute lg:w-16' />
              <IoDiamondOutline className='text-white text-xl relative text-center lg:text-3xl' />
            </div>
            <h3 className='font-openSans font-semibold pb-2 text-base text-[#F6812D] lg:text-2xl'>Mission Statement</h3>
            <h4 className='font-openSans font-normal text-sm text-white lg:text-xl'>
              Dedicated to excellence, RE/MAX Paradise Homes strives to create exceptional real estate experiences. Being part of a network of successful professionals, the firm emphasizes trust,
              mutual respect, and remarkable service, qualities that are evident in all its marketing materials and outcomes.
            </h4>
          </div>
        </section>

        <h1 className='text-base font-openSans text-center font-bold mb-8 md:pb-12 lg:pb-10 md:text-xl lg:text-[2rem]'>RE/MAX Paradise Homes</h1>

        <section className=' lg:flex lg:gap-10 lg:justify-center lg:items-center lg:px-[3.75rem]'>
          <img src='/remaxImg.png' alt='' className=' w-full pb-3 lg:w-1/2 lg:rounded-2xl lg:object-cover lg:pb-0 lg:shadow-md lg:h-[464px]' />
          <div className='lg:w-1/2'>
            <h3 className=' font-openSans font-semibold pb-3 text-base px-2 lg:text-[2rem] lg:text-center lg:px-0'>Commitments</h3>
            <ul className=' font-openSans font-normal text-sm px-2 pb-3 list-disc lg:text-lg lg:px-0 lg:pb-10'>
              <li className=''>
                Leadership in the Real Estate Industry: The firm integrates advanced technology and professional marketing strategies, fostering a team environment that grants associates the freedom
                to meet client needs efficiently.
              </li>
              <li className=''>
                The Highest Ethical Standards: It upholds respectful and cooperative relationships, anchored in uncompromising honesty and integrity. Client interests are always a priority.
              </li>
              <li className=''>
                The Best for RE/MAX Paradise Homes People: Acknowledging its people as its greatest assets, the firm challenges its associates to excel, supporting their growth through coaching,
                training, and performance-based recognition.
              </li>
            </ul>
            <button className='btn bg-[#F6812D] rounded-none border-none text-white font-openSans font-semibold shadow-none w-full lg:text-[1.125rem] lg:w-[274px] lg:h-[65px] lg:rounded-lg lg:justify-center lg:items-center lg:flex lg:mx-auto hover:bg-[#F6812D]'>
              <BsPatchCheckFill /> Visit Re/Max
            </button>
          </div>
        </section>
      </div>
    </>
  )
}

export const RealtorDetails = ({ realtor }: RealtorDetailsProps) => {
  return (
    <div className='mockup-browser border bg-base-300 m-4'>
      <div className='mockup-browser-toolbar'>
        <Link href={realtor.website} className='input link'>
          {realtor.website}
        </Link>
      </div>
      <div className='justify-center px-4 py-16 bg-base-200'>
        <h2 className='text-xl font-semibold mb-4'>{realtor.name}</h2>
        <div className='prose lg:prose-xl w-full max-w-none' dangerouslySetInnerHTML={{ __html: realtor.description }} />
      </div>
    </div>
  )
}

export default Realtors
