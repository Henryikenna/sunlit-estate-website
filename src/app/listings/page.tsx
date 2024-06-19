'use client'
import { SetStateAction, Suspense, useState } from 'react'
import { useRouter } from 'next/router'
import Carousel from '@/components/Carousel'
import { IoBedOutline, IoHeartSharp } from 'react-icons/io5'
import { LiaBathSolid, LiaSwimmingPoolSolid } from 'react-icons/lia'
import { FaCheck } from 'react-icons/fa6'
import Loading from '../loading'
import { FaRegEye } from 'react-icons/fa'
import Link from 'next/link'

const homeForSaleListings = [
  {
    id: 1,
    images: [
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG91c2V8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG91c2V8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdXNlfGVufDB8fDB8fHww',
    ],
    type: '3 Bedroom',
    address: 'Kaya Seminole 32, Noord Saliña',
    price: 385000,
    lotSize: 342,
    propertySize: 653,
    location: 'Sunbelt Realty Bonaire',
  },
  {
    id: 2,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdXNlfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdXNlfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8fDA%3D',
    ],
    type: '2 Bedroom',
    address: 'Kaya Amalia 11E',
    price: 126000,
    lotSize: 222,
    propertySize: 69,
    location: 'Sunbelt Realty Bonaire',
  },
  {
    id: 3,
    images: [
      'https://images.unsplash.com/photo-1448630360428-65456885c650?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGhvdXNlfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGhvdXNlfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1584738766473-61c083514bf4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGhvdXNlfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1430285561322-7808604715df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGhvdXNlfGVufDB8fDB8fHww',
    ],
    type: '2 Bedroom',
    address: 'Oud Lagoen 45A',
    price: 364200,
    lotSize: 252,
    propertySize: 564,
    location: 'Sunbelt Realty Bonaire',
  },
  {
    id: 4,
    images: ['https://images.unsplash.com/photo-1574259392081-dbe3c19cd15e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGhvdXNlfGVufDB8fDB8fHww'],
    type: '4 Bedroom',
    address: 'Suikerpalm 28, Suikerpalm',
    price: 980000,
    lotSize: 498,
    propertySize: 87,
    location: 'Sunbelt Realty Bonaire',
  },
]

const ListingDetails = ({
  searchParams,
}: {
  searchParams: {
    id: number
    images: string[]
    type: string
    address: string
    price: number
    lotSize: number
    propertySize: number
    location: string
  }
}) => {
  // const router = useRouter()
  //   const { param1, param2 } = router.query
  // const router = useRouter();
  //   const [isMounted, setIsMounted] = useState(false);

  //   useEffect(() => {
  //     // Set mounted state to true when component mounts
  //     setIsMounted(true);
  //   }, []);

  //   if (!isMounted) {
  //     return null; // or a loader if you prefer
  //   }

  // // const searchParams = useSearchParams()
  //   const param1 = router.query.param1;
  //   const param2 = searchParams.getAll('param2')
  const [currentSlide, setCurrentSlide] = useState(0)

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : searchParams.images.length - 1))
  }

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < searchParams.images.length - 1 ? prev + 1 : 0))
  }

  const [selectedPage, setSelectedPage] = useState('description')

  const handlePageChange = (page: SetStateAction<string>) => {
    setSelectedPage(page)
  }

  return (
    <div className='pt-[88px] px-3 md:px-10 lg:px-[3.75rem]'>
      <section className='flex gap-6 pt-6 md:pt-10'>
        <div className='flex flex-col gap-2'>
          {/* {searchParams.images.map(({image})) } */}
          {searchParams.images.map((imageUrl, index) => (
            <img key={index} className='h-14 w-14 object-cover rounded-lg' src={imageUrl} alt={`Image ${index}`} />
          ))}
        </div>

        <div className='carousel w-full'>
          {searchParams.images.map((image, index) => (
            <div key={`slide-${index}`} className={`carousel-item relative w-full ${index === currentSlide ? 'block' : 'hidden'}`}>
              <img src={image} className='w-full h-[200px] rounded-2xl object-cover md:h-[400px] lg:h-[495px]' />
              {/* <div className='absolute top-0 left-0 right-0 flex justify-between items-center content-center w-auto space-x-2 pt-5 px-4'>
            <section className=' flex gap-1 md:gap-2'>
              <button className=' shadow-sm text-white text-[0.4375rem] bg-black bg-opacity-70 w-[0.9625rem] h-[0.9625rem] flex justify-center items-center rounded-full md:text-[0.8125rem] md:w-[1.625rem] md:h-[1.625rem]'>

                <IoBedOutline />
              </button>
              <button className=' shadow-sm text-white text-[0.4375rem] bg-black bg-opacity-70 w-[0.9625rem] h-[0.9625rem] flex justify-center items-center rounded-full md:text-[0.8125rem] md:w-[1.625rem] md:h-[1.625rem] transform scale-x-[-1]'>
            
                <LiaBathSolid />
              </button>
              <button className=' shadow-sm text-white text-[0.4375rem] bg-black bg-opacity-70 w-[0.9625rem] h-[0.9625rem] flex justify-center items-center rounded-full md:text-[0.8125rem] md:w-[1.625rem] md:h-[1.625rem] transform scale-x-[-1]'>
               
                <LiaSwimmingPoolSolid />
              </button>
              <button className=' shadow-sm text-white text-[0.4375rem] bg-black bg-opacity-70 w-[0.9625rem] h-[0.9625rem] flex justify-center items-center rounded-full md:text-[0.8125rem] md:w-[1.625rem] md:h-[1.625rem]'>
               
                <FaCheck />
              </button>
            </section>

            <section className=''>
              <svg
                className={`w-[0.8025rem] h-[0.8025rem] md:w-6 md:h-6 ${isLikeButtonAnimating ? 'pop-animation' : ''}`}
                viewBox='0 0 24 23'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                onClick={likeButtonFill}
                onAnimationEnd={handleLikeButtonAnimationEnd}
                style={{ cursor: 'pointer' }}
              >
                <path
                  d='M11.6416 2.69307L12 3.06148L12.3584 2.69307C15.4196 -0.453634 20.8456 0.7004 22.7895 4.49668C23.745 6.36253 23.8732 8.91857 22.3206 11.9819C20.7865 15.0084 17.6125 18.52 12 22.2736C6.38744 18.5204 3.21347 15.009 1.67944 11.9825C0.126771 8.91927 0.255045 6.36318 1.21049 4.49723C3.15447 0.700726 8.58047 -0.453596 11.6416 2.69307Z'
                  fill={isLiked ? '#F6812D' : '#1E1E1E'}
                  fillOpacity={isLiked ? '1' : '0.4'}
                  stroke='white'
                />
              </svg>
            </section>
          </div> */}
              <div className={`absolute justify-between transform -translate-y-1/2 left-0 right-0 w-auto px-[0.375rem] top-1/2 lg:px-3 ${searchParams.images.length === 1 ? 'hidden' : 'flex'}`}>
                {index > 0 ? (
                  <button className='btn btn-circle btn-xs bg-[#1E1E1E] bg-opacity-60 text-white outline-none border-none lg:btn-sm' onClick={handlePrev}>
                    ❮
                  </button>
                ) : (
                  <button></button>
                )}
                {index < searchParams.images.length - 1 ? (
                  <button className='btn btn-circle btn-xs bg-[#1E1E1E] bg-opacity-60 text-white outline-none border-none lg:btn-sm' onClick={handleNext}>
                    ❯
                  </button>
                ) : (
                  <button></button>
                )}
              </div>
              {/* <div className={`absolute bottom-0 left-0 right-0 flex justify-center items-center content-center w-auto space-x-2 p-4 ${images.length === 1 ? 'hidden' : 'flex'}`}>
            {searchParams.images.slice(0, 5).map((_, dotIndex) => (
              <span key={dotIndex} className={`inline-block rounded-full h-1 w-1 lg:h-[0.4375rem] lg:w-[0.4375rem] ${dotIndex === currentSlide ? 'bg-white' : 'bg-gray-400'}`}></span>
            ))}
          </div> */}
            </div>
          ))}
        </div>
      </section>

      <section className='pt-4 flex justify-between'>
        <h3 className='text-[#1E1E1EE5] text-3xl font-openSans font-semibold'>{searchParams.address}</h3>

        <div className='flex gap-8'>
          <section className='flex flex-col'>
            <h4 className='text-4xl text-[#1E1E1EB2] pb-1 font-openSans font-semibold'>{searchParams.lotSize} m²</h4>
            <span className='text-[#1E1E1EB2] font-openSans font-normal text-xl'>Lots</span>
          </section>
          <section className='flex flex-col'>
            <h4 className='text-4xl text-[#1E1E1EB2] pb-1 font-openSans font-semibold'>{searchParams.propertySize} m²</h4>
            <span className='text-[#1E1E1EB2] font-openSans font-normal text-xl'>Property</span>
          </section>
        </div>
      </section>

      <section className='pt-4'>
        <h4 className='text-[#1E1E1EB2] pb-1 text-xl font-normal'>Price</h4>
        <h2 className='text-[#1E1E1EE5] text-5xl font-bold'>€ {searchParams.price.toLocaleString()}</h2>
      </section>

      <section className='flex mt-10 gap-5'>
        <div className=' w-2/5'>
          <section className=''>
            <section className='flex gap-6'>
              <span className='flex items-center gap-10'>
                <h4 className='text-[#1E1E1EE5] font-openSans text-2xl font-semibold'>3</h4>
                <IoBedOutline className='text-[#06384A] text-3xl' />
              </span>
              <span className='flex items-center gap-10'>
                <h4 className='text-[#1E1E1EE5] font-openSans text-2xl font-semibold'>2</h4>
                <LiaBathSolid className='text-[#06384A] text-3xl' />
              </span>
              <span className='flex items-center gap-10'>
                <h4 className='text-[#1E1E1EE5] font-openSans text-2xl font-semibold'>1</h4>
                <LiaSwimmingPoolSolid className='text-[#06384A] text-3xl' />
              </span>
            </section>
          </section>

          <section className=' pt-8'>
            <div className=' flex items-end gap-4 md:gap-6'>
              <button onClick={() => handlePageChange('description')}>
                <h3 className={` font-openSans font-semibold text-base pt-1 border-b-2 ${selectedPage === 'description' ? 'border-[#F6812D] text-[#F6812D]' : 'border-transparent'} md:text-xl`}>
                  Description
                </h3>
              </button>
              <button onClick={() => handlePageChange('features')}>
                <h3 className={` font-openSans font-semibold text-base pt-1 border-b-2 ${selectedPage === 'features' ? 'border-[#F6812D] text-[#F6812D]' : 'border-transparent'} md:text-xl`}>
                  Features
                </h3>
              </button>
              <button onClick={() => handlePageChange('propertyDetails')}>
                <h3 className={` font-openSans font-semibold text-base pt-1 border-b-2 ${selectedPage === 'propertyDetails' ? 'border-[#F6812D] text-[#F6812D]' : 'border-transparent'} md:text-xl`}>
                  Property details
                </h3>
              </button>
            </div>

            <Suspense fallback={<Loading />}>
              {selectedPage === 'description' && (
                <h4 className='pt-3'>
                  Discover the perfect combination of comfortable living space and tropical charm at Kaya Seminole 32 in the residential area of Noord Salina. This stunning detached house features
                  three spacious bedrooms, three bathrooms, a cozy living room, and a lush tropical garden. Relax and unwind in this serene oasis just minutes from the center of Kralendijk.
                </h4>
              )}
              {selectedPage === 'features' && (
                <ul className='pt-3 pl-5 font-openSans text-[#1E1E1EE5] list-disc'>
                  <li className='font-openSans text-[#1E1E1EE5]'>Three spacious bedrooms, all with air conditioning and ceiling fans</li>
                  <li className='font-openSans text-[#1E1E1EE5]'>Three bathrooms and a laundry room</li>
                  <li className='font-openSans text-[#1E1E1EE5]'>Cozy living room ideal for social gatherings</li>
                  <li className='font-openSans text-[#1E1E1EE5]'>Separate storage space in the garden</li>
                  <li className='font-openSans text-[#1E1E1EE5]'>Outdoor kitchen for preparing meals in the fresh air</li>
                  <li className='font-openSans text-[#1E1E1EE5]'>Covered carport for multiple cars</li>
                  <li className='font-openSans text-[#1E1E1EE5]'>Roof terrace with views of the surroundings</li>
                  <li className='font-openSans text-[#1E1E1EE5]'>Only 8 minutes to the center of Kralendijk</li>
                  <li className='font-openSans text-[#1E1E1EE5]'>Beautiful tropical garden with lush vegetation</li>
                  <li className='font-openSans text-[#1E1E1EE5]'>Only 8 minutes to the center of Kralendijk</li>
                  <li className='font-openSans text-[#1E1E1EE5]'>Ceramic tiles throughout the house and covered terrace</li>
                  <li className='font-openSans text-[#1E1E1EE5]'>Composite roof with ceramic tiles</li>
                  <li className='font-openSans text-[#1E1E1EE5]'>Hardwood windows and doors with mosquito nets and shutters</li>
                </ul>
              )}
              {selectedPage === 'propertyDetails' && (
                <div className='mt-3 flex flex-col gap-3'>
                  <span className='flex justify-between px-2 py-[10px] shadow-sm'>
                    <h4 className='text-[#1E1E1EE5] font-openSans font-semibold'>Name</h4>
                    <h5 className='text-[#1E1E1EE5] font-openSans font-normal'>Kaya Seminole 32, Noord Saliña</h5>
                  </span>
                  <span className='flex justify-between px-2 py-[10px] shadow-sm'>
                    <h4 className='text-[#1E1E1EE5] font-openSans font-semibold'>Area</h4>
                    <h5 className='text-[#1E1E1EE5] font-openSans font-normal'>Noord Saliña</h5>
                  </span>
                  <span className='flex justify-between px-2 py-[10px] shadow-sm'>
                    <h4 className='text-[#1E1E1EE5] font-openSans font-semibold'>Address</h4>
                    <h5 className='text-[#1E1E1EE5] font-openSans font-normal'>Kaya Seminole 32</h5>
                  </span>
                  <span className='flex justify-between px-2 py-[10px] shadow-sm'>
                    <h4 className='text-[#1E1E1EE5] font-openSans font-semibold'>Type</h4>
                    <h5 className='text-[#1E1E1EE5] font-openSans font-normal'>house</h5>
                  </span>
                  <span className='flex justify-between px-2 py-[10px] shadow-sm'>
                    <h4 className='text-[#1E1E1EE5] font-openSans font-semibold'>Price</h4>
                    <h5 className='text-[#1E1E1EE5] font-openSans font-normal'>$ 385,000</h5>
                  </span>
                  <span className='flex justify-between px-2 py-[10px] shadow-sm'>
                    <h4 className='text-[#1E1E1EE5] font-openSans font-semibold'>Lot size</h4>
                    <h5 className='text-[#1E1E1EE5] font-openSans font-normal'>222m²</h5>
                  </span>
                  <span className='flex justify-between px-2 py-[10px] shadow-sm'>
                    <h4 className='text-[#1E1E1EE5] font-openSans font-semibold'>Property size</h4>
                    <h5 className='text-[#1E1E1EE5] font-openSans font-normal'>69m²</h5>
                  </span>
                  <span className='flex justify-between px-2 py-[10px] shadow-sm'>
                    <h4 className='text-[#1E1E1EE5] font-openSans font-semibold'>Bedrooms</h4>
                    <h5 className='text-[#1E1E1EE5] font-openSans font-normal'>3</h5>
                  </span>
                  <span className='flex justify-between px-2 py-[10px] shadow-sm'>
                    <h4 className='text-[#1E1E1EE5] font-openSans font-semibold'>Pool</h4>
                    <h5 className='text-[#1E1E1EE5] font-openSans font-normal'>Yes</h5>
                  </span>
                  <span className='flex justify-between px-2 py-[10px] shadow-sm'>
                    <h4 className='text-[#1E1E1EE5] font-openSans font-semibold'>Garden</h4>
                    <h5 className='text-[#1E1E1EE5] font-openSans font-normal'>No</h5>
                  </span>
                  <span className='flex justify-between px-2 py-[10px] shadow-sm'>
                    <h4 className='text-[#1E1E1EE5] font-openSans font-semibold'>Balcony</h4>
                    <h5 className='text-[#1E1E1EE5] font-openSans font-normal'>No</h5>
                  </span>
                  <span className='flex justify-between px-2 py-[10px] shadow-sm'>
                    <h4 className='text-[#1E1E1EE5] font-openSans font-semibold'>Parking</h4>
                    <h5 className='text-[#1E1E1EE5] font-openSans font-normal'>Yes</h5>
                  </span>
                </div>
              )}
            </Suspense>

            <div className='pt-3 flex justify-between items-end'>
              <section className=''>
                <h5 className='text-sm text-[#1E1E1ECC] pb-[2px]'>Listed on:</h5>
                <h3 className='text-[#1E1E1ECC] text-2xl font-openSans font-semibold'>Sunbelt Realty Bonaire</h3>
              </section>

              <span className='flex items-center gap-1'>
                <FaRegEye className='text-[#F6812D]' />
                <h5 className='text-[#F6812D] font-semibold text-sm font-openSans'>View listings</h5>
              </span>
            </div>
            <button className='btn btn-primary font-openSans h-14 mt-5 rounded-[8px] border-none text-white w-full flex justify-center bg-[#F6812D] hover:bg-[#ed7b29]'>Rent/Buy</button>
          </section>
        </div>

        {/* <div className=""> */}
        <img className='w-3/5 h-[530px] object-cover rounded-2xl' src='https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2V8ZW58MHx8MHx8fDA%3D' alt='' />
        {/* </div> */}
      </section>

      <section className='pt-14'>
        <h4 className=' font-openSans text-[0.5625rem] pb-[0.4375rem] font-bold text-[#1E1E1EE5] md:pb-3 lg:text-2xl'>Listings handpick for you</h4>

        <div className='w-full flex flex-wrap gap-y-5 md:gap-y-8 lg:gap-y-14'>
          {homeForSaleListings.map(({ id, images, type, address, price, lotSize, propertySize, location }) => (
            <div key={id} className=' flex flex-col w-1/2 md:w-1/3 lg:w-1/4 p-2'>
              <Carousel id={id} images={images} />

              <Link
                href={{
                  pathname: '/listings',
                  query: {
                    id: id,
                    images: images,
                    type: type,
                    address: address,
                    price: price,
                    lotSize: lotSize,
                    propertySize: propertySize,
                    location: location,
                  },
                }}
              >
                <div key={id} className=' w-auto px-[0.625rem] pt-3 lg:pt-6 lg:px-[1.125rem]'>
                  <h4 className=' font-openSans text-[0.5625rem] pb-[0.4375rem] font-bold text-[#1E1E1E] opacity-90 lg:pb-3 lg:text-base'>{address}</h4>
                  <h4 className=' font-openSans text-sm pb-[0.4375rem] font-extrabold text-[#1E1E1E] opacity-90 lg:pb-3 lg:text-lg'>{`€ ${price.toLocaleString()}`}</h4>

                  <section className=' flex items-center justify-between pb-3'>
                    <div className=' flex items-center gap-1'>
                      <h5 className=' font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>Lot:</h5>
                      <h5 className=' font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>
                        {`${lotSize} m`}
                        <sup>2</sup>
                      </h5>
                    </div>
                    <div className=' flex items-center gap-1'>
                      <h5 className=' font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>Property:</h5>
                      <h5 className=' font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>
                        {`${propertySize} m`}
                        <sup>2</sup>
                      </h5>
                    </div>
                  </section>

                  <section className=' flex items-center justify-between'>
                    <h5 className=' font-openSans text-[0.625rem] font-semibold text-[#1E1E1E] opacity-70 lg:text-sm'>{location}</h5>
                    <svg
                      className=' w-[0.5625rem] h-[0.5625rem] lg:w-[1.0625rem] lg:h-[1.0625rem]'
                      // width="17"
                      // height="17"
                      viewBox='0 0 17 17'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M0.945098 0.582275C1.10594 0.582275 1.2602 0.646172 1.37394 0.759908C1.48768 0.873644 1.55157 1.0279 1.55157 1.18875V1.62541L3.03784 1.25344C4.86365 0.796934 6.79254 1.00861 8.47589 1.85021L8.56323 1.89388C9.95905 2.59189 11.5554 2.77846 13.0746 2.42111L15.5894 1.82919C15.6838 1.80707 15.782 1.80786 15.876 1.83151C15.9699 1.85515 16.0568 1.90096 16.1294 1.9651C16.202 2.02923 16.2582 2.10983 16.2933 2.20014C16.3283 2.29045 16.3413 2.38785 16.331 2.48418C16.0301 5.26241 16.0315 8.06508 16.335 10.843C16.3512 10.9903 16.3129 11.1383 16.2274 11.2593C16.1419 11.3803 16.015 11.4658 15.8708 11.4996L13.3528 12.0924C11.5573 12.5149 9.67045 12.2946 8.02063 11.4697L7.9333 11.426C6.50907 10.7138 4.87705 10.5346 3.33218 10.9206L1.55157 11.3654V15.7441C1.55157 15.905 1.48768 16.0592 1.37394 16.173C1.2602 16.2867 1.10594 16.3506 0.945098 16.3506C0.784251 16.3506 0.629991 16.2867 0.516255 16.173C0.402519 16.0592 0.338623 15.905 0.338623 15.7441V1.18875C0.338623 1.10911 0.35431 1.03024 0.384788 0.956662C0.415266 0.883081 0.459939 0.816224 0.516255 0.759908C0.572572 0.703591 0.639429 0.658919 0.71301 0.62844C0.786591 0.597962 0.865454 0.582275 0.945098 0.582275Z'
                        fill='#06384A'
                      />
                    </svg>
                  </section>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ListingDetails
