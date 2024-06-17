// // pages/property/[id].js
// import { useRouter } from 'next/router'
// import Carousel from '@/components/Carousel'

// interface PropertyDetailsProps {
//     property: number
//   }

// const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
//   const router = useRouter()
//   const { id } = router.query

//   if (!property) {
//     return (<div>Loading...</div>);
//   }

//   const { images, type, address, price, lotSize, propertySize, location } = property;

//   return (
//     // <div className=' px-3 pt-6 w-full flex flex-col gap-y-5 md:px-5 md:gap-y-8 lg:gap-y-14'>
//     //   <Carousel id={id} images={images} />
//     //   <div className=' w-auto px-[0.625rem] pt-3 lg:pt-6 lg:px-[1.125rem]'>
//     //     <h4 className=' font-openSans text-[0.5625rem] pb-[0.4375rem] font-bold text-[#1E1E1E] opacity-90 lg:pb-3 lg:text-base'>{address}</h4>
//     //     <h4 className=' font-openSans text-sm pb-[0.4375rem] font-extrabold text-[#1E1E1E] opacity-90 lg:pb-3 lg:text-lg'>{`€ ${price.toLocaleString()}`}</h4>
//     //     <section className=' flex items-center justify-between pb-3'>
//     //       <div className=' flex items-center gap-1'>
//     //         <h5 className=' font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>Lot:</h5>
//     //         <h5 className=' font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>
//     //           {`${lotSize} m`}
//     //           <sup>2</sup>
//     //         </h5>
//     //       </div>
//     //       <div className=' flex items-center gap-1'>
//     //         <h5 className=' font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>Property:</h5>
//     //         <h5 className=' font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>
//     //           {`${propertySize} m`}
//     //           <sup>2</sup>
//     //         </h5>
//     //       </div>
//     //     </section>
//     //     <section className=' flex items-center justify-between'>
//     //       <h5 className=' font-openSans text-[0.625rem] font-semibold text-[#1E1E1E] opacity-70 lg:text-sm'>{location}</h5>
//     //     </section>
//     //   </div>
//     // </div>

//     <div className=""></div>
//   )
// }

// export async function getStaticPaths() {
//   const paths = homeForSaleListings.map((property) => ({
//     params: { id: property.id.toString() },
//   }))

//   return { paths, fallback: true }
// }

// export async function getStaticProps({ params }) {
//   const property = homeForSaleListings.find((listing) => listing.id.toString() === params.id)

//   return {
//     props: { property },
//   }
// }

// export default PropertyDetails







// import { useRouter } from 'next/router'
// import { GetStaticProps } from 'next'
// import Carousel from '@/components/Carousel'

// interface PropertyDetailsProps {
//   property: {
//     id: number;
//     images: string[];
//     type: string;
//     address: string;
//     price: number;
//     lotSize: number;
//     propertySize: number;
//     location: string;
//   };
// }

// // const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
// //   const router = useRouter();
// //   const { id } = router.query;

// //   if (!property) {
// //     return <div>Loading...</div>
// //   };

// //   const { id, images, type, address, price, lotSize, propertySize, location } = property;

// //   return (
//     // <div className=' px-3 pt-6 w-full flex flex-col gap-y-5 md:px-5 md:gap-y-8 lg:gap-y-14'>
//     //   <Carousel id={id} images={images} />
//     //   <div className=' w-auto px-[0.625rem] pt-3 lg:pt-6 lg:px-[1.125rem]'>
//     //     <h4 className=' font-openSans text-[0.5625rem] pb-[0.4375rem] font-bold text-[#1E1E1E] opacity-90 lg:pb-3 lg:text-base'>{address}</h4>
//     //     <h4 className=' font-openSans text-sm pb-[0.4375rem] font-extrabold text-[#1E1E1E] opacity-90 lg:pb-3 lg:text-lg'>{`€ ${price.toLocaleString()}`}</h4>
//     //     <section className=' flex items-center justify-between pb-3'>
//     //       <div className=' flex items-center gap-1'>
//     //         <h5 className=' font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>Lot:</h5>
//     //         <h5 className=' font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>
//     //           {`${lotSize} m`}
//     //           <sup>2</sup>
//     //         </h5>
//     //       </div>
//     //       <div className=' flex items-center gap-1'>
//     //         <h5 className=' font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>Property:</h5>
//     //         <h5 className=' font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>
//     //           {`${propertySize} m`}
//     //           <sup>2</sup>
//     //         </h5>
//     //       </div>
//     //     </section>
//     //     <section className=' flex items-center justify-between'>
//     //       <h5 className=' font-openSans text-[0.625rem] font-semibold text-[#1E1E1E] opacity-70 lg:text-sm'>{location}</h5>
//     //     </section>
//     //   </div>
//     // </div>
    
// //   );
// // }

// // export const getStaticPaths = async () => {
// //   const paths = homeForSaleListings.map((property) => ({
// //     params: { id: property.id.toString() },
// //   }))

// //   return { paths, fallback: true }
// // }

// // export const getStaticProps: GetStaticProps = async ({ params }) => {
// //   const property = homeForSaleListings.find((listing) => listing.id.toString() === params.id)

// //   return {
// //     props: { property },
// //   }
// // }


// const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
//   const router = useRouter();
//   // Rename the destructured id from router.query to avoid conflict
//   const { id: queryId } = router.query;

//   if (!property) {
//     return <div>Loading...</div>
//   };

//   // Use the property id directly from the property prop, no need to destructure again
//   return (
//     // ... rest of your component
//     // <Carousel id={property.id} images={property.images} />
//     // ... rest of your component

//     <div className=' px-3 pt-6 w-full flex flex-col gap-y-5 md:px-5 md:gap-y-8 lg:gap-y-14'>
//     <Carousel id={property.id} images={property.images} />
//     <div className=' w-auto px-[0.625rem] pt-3 lg:pt-6 lg:px-[1.125rem]'>
//       <h4 className=' font-openSans text-[0.5625rem] pb-[0.4375rem] font-bold text-[#1E1E1E] opacity-90 lg:pb-3 lg:text-base'>{property.address}</h4>
//       <h4 className=' font-openSans text-sm pb-[0.4375rem] font-extrabold text-[#1E1E1E] opacity-90 lg:pb-3 lg:text-lg'>{`€ ${property.price.toLocaleString()}`}</h4>
//       <section className=' flex items-center justify-between pb-3'>
//         <div className=' flex items-center gap-1'>
//           <h5 className=' font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>Lot:</h5>
//           <h5 className=' font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>
//             {`${property.lotSize} m`}
//             <sup>2</sup>
//           </h5>
//         </div>
//         <div className=' flex items-center gap-1'>
//           <h5 className=' font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>Property:</h5>
//           <h5 className=' font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>
//             {`${property.propertySize} m`}
//             <sup>2</sup>
//           </h5>
//         </div>
//       </section>
//       <section className=' flex items-center justify-between'>
//         <h5 className=' font-openSans text-[0.625rem] font-semibold text-[#1E1E1E] opacity-70 lg:text-sm'>{property.location}</h5>
//       </section>
//     </div>
//   </div>
//   );
// }

// // ... rest of your code

// export const getStaticProps: GetStaticProps = async (context) => {
//   // Ensure params is defined before accessing its properties
//   const { params } = context;
//   if (!params || !params.id) {
//     return { notFound: true };
//   }
  
//   // Convert id from string to number before finding the property
//   const property = homeForSaleListings.find((listing) => listing.id === Number(params.id));

//   return {
//     props: { property },
//   }
// }




// export default PropertyDetails













// src/pages/details/[id].tsx

// import Carousel from '@/components/Carousel';
// import { GetStaticProps, GetStaticPaths } from 'next';
// import { useRouter } from 'next/router';

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

//   if (router.isFallback) {
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

// export const getStaticProps: GetStaticProps = async (context) => {
//   const { params } = context;
//   if (!params || !params.id) {
//     return { notFound: true };
//   }

//   const property = homeForSaleListings.find((listing) => listing.id === Number(params.id));

//   return {
//     props: { property: property || null },
//   };
// };

// export default PropertyDetails;

