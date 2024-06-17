'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Carousel from '@/components/Carousel'

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

  return (
    <div className='pt-[88px] px-3 md:px-10 lg:px-[3.75rem]'>
      <section className='flex gap-6 pt-6 md:pt-10'>
        <div className='flex flex-col gap-2'>
          {/* {searchParams.images.map(({image})) } */}
          {searchParams.images.map((imageUrl, index) => (
            <img key={index} className='h-14 w-14 object-cover rounded-lg' src={imageUrl} alt={`Image ${index}`} />
          ))}
        </div>

        <div className="carousel w-full">
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

      <section className="pt-4 flex justify-between">
        <h3 className="text-[#1E1E1EE5] text-3xl font-openSans font-semibold">{searchParams.address}</h3>

        <div className="flex gap-8">
            <section className="flex flex-col">
                <h4 className="text-4xl text-[#1E1E1EB2] pb-1 font-openSans font-semibold">{searchParams.lotSize} m<sup className='text-2xl'>2</sup></h4>
                <span className="text-[#1E1E1EB2] font-openSans font-normal text-xl">Lots</span>
            </section>
            <section className="flex flex-col">
                <h4 className="text-4xl text-[#1E1E1EB2] pb-1 font-openSans font-semibold">{searchParams.propertySize} m<sup className='text-2xl'>2</sup></h4>
                <span className="text-[#1E1E1EB2] font-openSans font-normal text-xl">Property</span>
            </section>
        </div>
      </section>

      <section className="pt-4">
        <h4 className="text-[#1E1E1EB2] pb-1 text-xl font-normal">Price</h4>
        <h2 className="text-[#1E1E1EE5] text-6xl font-bold">€ {searchParams.price.toLocaleString()}</h2>
      </section>
    </div>
  )
}

export default ListingDetails
