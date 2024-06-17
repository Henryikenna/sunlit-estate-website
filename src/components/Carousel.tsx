// import { useState } from "react";
// import { IoBedOutline, IoHeartSharp } from "react-icons/io5";
// import { LiaBathSolid, LiaSwimmingPoolSolid } from "react-icons/lia";
// import { FaCheck } from "react-icons/fa6";

// const Carousel = ({ id, images }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const handlePrev = () => {
//     setCurrentSlide((prev) => (prev > 0 ? prev - 1 : images.length - 1));
//   };

//   const handleNext = () => {
//     setCurrentSlide((prev) => (prev < images.length - 1 ? prev + 1 : 0));
//   };

//   return (
//     // <div key={id} className="carousel w-full">
//     //   {images.map((image, index) => (
//     //     <div
//     //       key={`slide${id}-${index}`}
//     //       id={`slide${id}-${index}`}
//     //       className="carousel-item relative w-full"
//     //     >
//     //       <img
//     //         src={image}
//     //         className=" w-full h-[144px] rounded-2xl object-cover md:h-[200px] lg:h-[272px]"
//     //       />
//     //       <div
//     //         className={`absolute justify-between transform -translate-y-1/2 left-0 right-0 w-auto px-[0.375rem] top-1/2 lg:px-3 ${
//     //           images.length == 1 ? "hidden" : "flex"
//     //         }`}
//     //       >
//     //         {index > 0 ? (
//     //           <a
//     //             href={`#slide${id}-${index - 1}`}
//     //             className="btn btn-circle btn-xs bg-[#1E1E1E] bg-opacity-60 text-white outline-none border-none lg:btn-sm"
//     //             onClick={(e) => e.preventDefault()}
//     //           >
//     //             ❮
//     //           </a>
//     //         ) : (
//     //           <a></a>
//     //         )}

//     //         {index < images.length - 1 ? (
//     //           <a
//     //             href={`#slide${id}-${(index + 1) % images.length}`}
//     //             className="btn btn-circle btn-xs bg-[#1E1E1E] bg-opacity-60 text-white outline-none border-none lg:btn-sm"
//     //             onClick={(e) => e.preventDefault()}
//     //           >
//     //             ❯
//     //           </a>
//     //         ) : (
//     //           <a></a>
//     //         )}
//     //       </div>
//     //       <div
//     //         className={`absolute bottom-0 left-0 right-0 flex justify-center items-center content-center w-[164px] space-x-2 p-4 lg:w-[310px] ${
//     //           images.length == 1 ? "hidden" : "flex"
//     //         }`}
//     //       >
//     //         {images.slice(0, 5).map((_, dotIndex) => (
//     //           <span
//     //             key={dotIndex}
//     //             className={`inline-block rounded-full h-1 w-1 lg:h-[0.4375rem] lg:w-[0.4375rem] ${
//     //               dotIndex === index ? "bg-white" : "bg-gray-400"
//     //             }`}
//     //           ></span>
//     //         ))}
//     //       </div>
//     //     </div>
//     //   ))}
//     // </div>
//     <div key={id} className="carousel w-full">
//       {images.map((image, index) => (
//         <div
//           key={`slide${id}-${index}`}
//           className={`carousel-item relative w-full ${
//             index === currentSlide ? "block" : "hidden"
//           }`}
//         >
//           <img
//             src={image}
//             className="w-full h-[160px] rounded-2xl object-cover md:h-[200px] lg:h-[272px]"
//           />
//           <div className="absolute top-0 left-0 right-0 flex justify-between items-center content-center w-auto space-x-2 pt-5 px-4">
//             <section className=" flex gap-1 md:gap-2">
//               <button className=" shadow-sm text-white text-[0.4375rem] bg-white bg-opacity-30 w-[0.875rem] h-[0.875rem] flex justify-center items-center rounded-full md:text-[0.8125rem] md:w-[1.625rem] md:h-[1.625rem]">
//                 <IoBedOutline />
//               </button>
//               <button className=" shadow-sm text-white text-[0.4375rem] bg-white bg-opacity-30 w-[0.875rem] h-[0.875rem] flex justify-center items-center rounded-full md:text-[0.8125rem] md:w-[1.625rem] md:h-[1.625rem] transform scale-x-[-1]">
//                 <LiaBathSolid />
//               </button>
//               <button className=" shadow-sm text-white text-[0.4375rem] bg-white bg-opacity-30 w-[0.875rem] h-[0.875rem] flex justify-center items-center rounded-full md:text-[0.8125rem] md:w-[1.625rem] md:h-[1.625rem] transform scale-x-[-1]">
//                 <LiaSwimmingPoolSolid />
//               </button>
//               <button className=" shadow-sm text-white text-[0.4375rem] bg-white bg-opacity-30 w-[0.875rem] h-[0.875rem] flex justify-center items-center rounded-full md:text-[0.8125rem] md:w-[1.625rem] md:h-[1.625rem]">
//                 <FaCheck />
//               </button>
//             </section>

//             <section className="">
//               <svg
//               className="w-[0.8025rem] h-[0.8025rem] md:w-6 md:h-6"
//                 // width="24"
//                 // height="23"
//                 viewBox="0 0 24 23"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M11.6416 2.69307L12 3.06148L12.3584 2.69307C15.4196 -0.453634 20.8456 0.7004 22.7895 4.49668C23.745 6.36253 23.8732 8.91857 22.3206 11.9819C20.7865 15.0084 17.6125 18.52 12 22.2736C6.38744 18.5204 3.21347 15.009 1.67944 11.9825C0.126771 8.91927 0.255045 6.36318 1.21049 4.49723C3.15447 0.700726 8.58047 -0.453596 11.6416 2.69307Z"
//                   fill="#1E1E1E"
//                   fill-opacity="0.4"
//                   stroke="white"
//                 />
//               </svg>
//             </section>
//           </div>
//           <div
//             className={`absolute justify-between transform -translate-y-1/2 left-0 right-0 w-auto px-[0.375rem] top-1/2 lg:px-3 ${
//               images.length === 1 ? "hidden" : "flex"
//             }`}
//           >
//             {index > 0 ? (
//                       <button
//                       className="btn btn-circle btn-xs bg-[#1E1E1E] bg-opacity-60 text-white outline-none border-none lg:btn-sm"
//                       onClick={handlePrev}
//                     >
//                       ❮
//                     </button>
//                     ) : (
//                       <button></button>
//                     )}
//             {/* <button
//               className="btn btn-circle btn-xs bg-[#1E1E1E] bg-opacity-60 text-white outline-none border-none lg:btn-sm"
//               onClick={handlePrev}
//             >
//               ❮
//             </button> */}
//             {index < images.length - 1 ? (
//                       <button
//                       className="btn btn-circle btn-xs bg-[#1E1E1E] bg-opacity-60 text-white outline-none border-none lg:btn-sm"
//                       onClick={handleNext}
//                     >
//                       ❯
//                     </button>
//                     ) : (
//                       <button></button>
//                     )}
//             {/* <button
//               className="btn btn-circle btn-xs bg-[#1E1E1E] bg-opacity-60 text-white outline-none border-none lg:btn-sm"
//               onClick={handleNext}
//             >
//               ❯
//             </button> */}
//           </div>
//           <div
//             className={`absolute bottom-0 left-0 right-0 flex justify-center items-center content-center w-auto space-x-2 p-4 ${
//               images.length === 1 ? "hidden" : "flex"
//             }`}
//           >
//             {images.slice(0, 5).map((_, dotIndex) => (
//               <span
//                 key={dotIndex}
//                 className={`inline-block rounded-full h-1 w-1 lg:h-[0.4375rem] lg:w-[0.4375rem] ${
//                   // dotIndex === currentSlide ? "bg-white w-[0.32rem] h-[0.32rem] lg:w-2 lg:h-2" : "bg-gray-400 h-1 w-1 lg:h-[0.4375rem] lg:w-[0.4375rem]"
//                   dotIndex === currentSlide ? "bg-white" : "bg-gray-400"
//                 }`}
//               ></span>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Carousel;

import { useState } from 'react'
import { IoBedOutline, IoHeartSharp } from 'react-icons/io5'
import { LiaBathSolid, LiaSwimmingPoolSolid } from 'react-icons/lia'
import { FaCheck } from 'react-icons/fa6'

interface CarouselProps {
  id: number
  images: string[]
}

const Carousel: React.FC<CarouselProps> = ({ id, images }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isLikeButtonAnimating, setIsLikeButtonAnimating] = useState(false)

  const likeButtonFill = () => {
    setIsLiked(!isLiked)
    setIsLikeButtonAnimating(true)
  }

  const handleLikeButtonAnimationEnd = () => {
    setIsLikeButtonAnimating(false)
  }

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < images.length - 1 ? prev + 1 : 0))
  }

  return (
    <div key={id} className='carousel w-full'>
      {images.map((image, index) => (
        <div key={`slide${id}-${index}`} className={`carousel-item relative w-full ${index === currentSlide ? 'block' : 'hidden'}`}>
          <img src={image} className='w-full h-[160px] rounded-2xl object-cover md:h-[200px] lg:h-[272px]' />
          <div className='absolute top-0 left-0 right-0 flex justify-between items-center content-center w-auto space-x-2 pt-5 px-4'>
            <section className=' flex gap-1 md:gap-2'>
              <button className=' shadow-sm text-white text-[0.4375rem] bg-black bg-opacity-70 w-[0.9625rem] h-[0.9625rem] flex justify-center items-center rounded-full md:text-[0.8125rem] md:w-[1.625rem] md:h-[1.625rem]'>
                {/* <IoBedOutline className="opacity-70" /> */}
                <IoBedOutline />
              </button>
              <button className=' shadow-sm text-white text-[0.4375rem] bg-black bg-opacity-70 w-[0.9625rem] h-[0.9625rem] flex justify-center items-center rounded-full md:text-[0.8125rem] md:w-[1.625rem] md:h-[1.625rem] transform scale-x-[-1]'>
                {/* <LiaBathSolid className="opacity-70" /> */}
                <LiaBathSolid />
              </button>
              <button className=' shadow-sm text-white text-[0.4375rem] bg-black bg-opacity-70 w-[0.9625rem] h-[0.9625rem] flex justify-center items-center rounded-full md:text-[0.8125rem] md:w-[1.625rem] md:h-[1.625rem] transform scale-x-[-1]'>
                {/* <LiaSwimmingPoolSolid className="opacity-70" /> */}
                <LiaSwimmingPoolSolid />
              </button>
              <button className=' shadow-sm text-white text-[0.4375rem] bg-black bg-opacity-70 w-[0.9625rem] h-[0.9625rem] flex justify-center items-center rounded-full md:text-[0.8125rem] md:w-[1.625rem] md:h-[1.625rem]'>
                {/* <FaCheck className="opacity-70" /> */}
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
          </div>
          <div className={`absolute justify-between transform -translate-y-1/2 left-0 right-0 w-auto px-[0.375rem] top-1/2 lg:px-3 ${images.length === 1 ? 'hidden' : 'flex'}`}>
            {index > 0 ? (
              <button className='btn btn-circle btn-xs bg-[#1E1E1E] bg-opacity-60 text-white outline-none border-none lg:btn-sm' onClick={handlePrev}>
                ❮
              </button>
            ) : (
              <button></button>
            )}
            {index < images.length - 1 ? (
              <button className='btn btn-circle btn-xs bg-[#1E1E1E] bg-opacity-60 text-white outline-none border-none lg:btn-sm' onClick={handleNext}>
                ❯
              </button>
            ) : (
              <button></button>
            )}
          </div>
          <div className={`absolute bottom-0 left-0 right-0 flex justify-center items-center content-center w-auto space-x-2 p-4 ${images.length === 1 ? 'hidden' : 'flex'}`}>
            {images.slice(0, 5).map((_, dotIndex) => (
              <span key={dotIndex} className={`inline-block rounded-full h-1 w-1 lg:h-[0.4375rem] lg:w-[0.4375rem] ${dotIndex === currentSlide ? 'bg-white' : 'bg-gray-400'}`}></span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Carousel
