'use client';
// allowImportingTsExtension
import Carousel from '@/components/Carousel'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
// import "@/components/listing/home-for-sale-listing-list.ts";

// import Carousel from "../components/Carousel";

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
  {
    id: 5,
    images: ['https://images.unsplash.com/photo-1574259392081-dbe3c19cd15e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGhvdXNlfGVufDB8fDB8fHww'],
    type: '4 Bedroom',
    address: 'Suikerpalm 28, Suikerpalm',
    price: 980000,
    lotSize: 498,
    propertySize: 87,
    location: 'Sunbelt Realty Bonaire',
  },
]

const HomeForSalePage = () => {
  const router = useRouter();

  // const handleNavigation = (id: number) => {
  //   router.push(`/listings/${id}`);
  //   // router.push(`/details/${id}`);
  // };
  
  return (
    <div className=' px-3 pt-6 w-full flex flex-wrap gap-y-5 md:px-5 md:gap-y-8 lg:gap-y-14'>
      {homeForSaleListings.map(({ id, images, type, address, price, lotSize, propertySize, location }) => (
        <div key={id} className=' flex flex-col w-1/2 md:w-1/3 lg:w-1/4 p-2'>
          <Carousel id={id} images={images} />

          {/* <div key={id} onClick={() => handleNavigation(id)} className=' w-auto px-[0.625rem] pt-3 lg:pt-6 lg:px-[1.125rem]'> */}
          {/* <Link href={`/listings?param1=value1&param2=value2`}> */}
          <Link href={{
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
            }
          }}>
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
  )
}


export default HomeForSalePage






// const HomeForSalePage = () => {
//   const router = useRouter()

//   const handleItemClick = (id: number) => {
//     router.push(`/details/${id}`)
//   }

//   return (
//     <div className=' px-3 pt-6 w-full flex flex-wrap gap-y-5 md:px-5 md:gap-y-8 lg:gap-y-14'>
//       {homeForSaleListings.map(({ id, images, type, address, price, lotSize, propertySize, location }) => (
//         <div key={id} className=' flex flex-col w-1/2 md:w-1/3 lg:w-1/4 p-2' onClick={() => handleItemClick(id)}>
//           <Carousel id={id} images={images} />
//           <div className=' w-auto px-[0.625rem] pt-3 lg:pt-6 lg:px-[1.125rem]'>
//             <h4 className=' font-openSans text-[0.5625rem] pb-[0.4375rem] font-bold text-[#1E1E1E] opacity-90 lg:pb-3 lg:text-base'>{address}</h4>
//             <h4 className=' font-openSans text-sm pb-[0.4375rem] font-extrabold text-[#1E1E1E] opacity-90 lg:pb-3 lg:text-lg'>{`€ ${price.toLocaleString()}`}</h4>
//             <section className=' flex items-center justify-between pb-3'>
//               <div className=' flex items-center gap-1'>
//                 <h5 className=' font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>Lot:</h5>
//                 <h5 className=' font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>
//                   {`${lotSize} m`}
//                   <sup>2</sup>
//                 </h5>
//               </div>
//               <div className=' flex items-center gap-1'>
//                 <h5 className=' font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>Property:</h5>
//                 <h5 className=' font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>
//                   {`${propertySize} m`}
//                   <sup>2</sup>
//                 </h5>
//               </div>
//             </section>
//             <section className=' flex items-center justify-between'>
//               <h5 className=' font-openSans text-[0.625rem] font-semibold text-[#1E1E1E] opacity-70 lg:text-sm'>{location}</h5>
//             </section>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }