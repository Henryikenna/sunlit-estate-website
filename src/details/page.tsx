// 'use client';

// import Carousel from '@/components/Carousel';
// import { GetStaticProps, GetStaticPaths } from 'next';
// import { useRouter } from 'next/navigation';

// interface Property {
//   id: number;
//   images: string[];
//   address: string;
//   price: number;
//   lotSize: number;
//   propertySize: number;
//   location: string;
// }

// interface PropertyDetailsProps {
//   property: Property | null;
// }

// const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
//   const router = useRouter();

//   if (!router) {
//     return <div>Loading...</div>;
//   }

//   if (!property) {
//     return <div>Property not found</div>;
//   }

//   return (
//     <div className='px-3 pt-6 w-full flex flex-col gap-y-5 md:px-5 md:gap-y-8 lg:gap-y-14'>
//       <Carousel id={property.id} images={property.images} />
//       <div className='w-auto px-[0.625rem] pt-3 lg:pt-6 lg:px-[1.125rem]'>
//         <h4 className='font-openSans text-[0.5625rem] pb-[0.4375rem] font-bold text-[#1E1E1E] opacity-90 lg:pb-3 lg:text-base'>{property.address}</h4>
//         <h4 className='font-openSans text-sm pb-[0.4375rem] font-extrabold text-[#1E1E1E] opacity-90 lg:pb-3 lg:text-lg'>{`€ ${property.price.toLocaleString()}`}</h4>
//         <section className='flex items-center justify-between pb-3'>
//           <div className='flex items-center gap-1'>
//             <h5 className='font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>Lot:</h5>
//             <h5 className='font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>
//               {`${property.lotSize} m`}
//               <sup>2</sup>
//             </h5>
//           </div>
//           <div className='flex items-center gap-1'>
//             <h5 className='font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>Property:</h5>
//             <h5 className='font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>
//               {`${property.propertySize} m`}
//               <sup>2</sup>
//             </h5>
//           </div>
//         </section>
//         <section className='flex items-center justify-between'>
//           <h5 className='font-openSans text-[0.625rem] font-semibold text-[#1E1E1E] opacity-70 lg:text-sm'>{property.location}</h5>
//         </section>
//       </div>
//     </div>
//   );
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = homeForSaleListings.map((listing) => ({
//     params: { id: listing.id.toString() },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// };

// // export const getStaticProps: GetStaticProps = async (context) => {
// //   const { params } = context;
// //   if (!params || !params.id) {
// //     return { notFound: true };
// //   }

// //   const property = homeForSaleListings.find((listing) => listing.id === Number(params.id));

// //   return {
// //     props: { property: property || null },
// //   };
// // };

// export default PropertyDetails;

