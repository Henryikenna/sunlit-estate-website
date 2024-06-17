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
//     <div className="">{property.price}</div>
    
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

// // export const getStaticProps: GetStaticProps = async (context) => {
// //     // const { id } = context.params;
// //     const { params } = context;
// //     if (!params || !params.id) {
// //         return { notFound: true };
// //       }
    
// //     // Fetch your property data based on the id
// //     // const property = await fetchPropertyData(id);
// //     const property = await homeForSaleListings.find((listing) => listing.id === Number(params.id));
  
// //     if (!property) {
// //       // Return a not found status if the property doesn't exist
// //       return {
// //         notFound: true,
// //       };
// //     }
  
// //     // Return the fetched property as props
// //     return {
// //       props: { property: property || null },
// //     };
// //   };
  



// export default PropertyDetails;



// // <div className='px-3 pt-6 w-full flex flex-col gap-y-5 md:px-5 md:gap-y-8 lg:gap-y-14'>
//     //   <Carousel id={property.id} images={property.images} />
//     //   <div className='w-auto px-[0.625rem] pt-3 lg:pt-6 lg:px-[1.125rem]'>
//     //     <h4 className='font-openSans text-[0.5625rem] pb-[0.4375rem] font-bold text-[#1E1E1E] opacity-90 lg:pb-3 lg:text-base'>{property.address}</h4>
//     //     <h4 className='font-openSans text-sm pb-[0.4375rem] font-extrabold text-[#1E1E1E] opacity-90 lg:pb-3 lg:text-lg'>{`€ ${property.price.toLocaleString()}`}</h4>
//     //     <section className='flex items-center justify-between pb-3'>
//     //       <div className='flex items-center gap-1'>
//     //         <h5 className='font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>Lot:</h5>
//     //         <h5 className='font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>
//     //           {`${property.lotSize} m`}
//     //           <sup>2</sup>
//     //         </h5>
//     //       </div>
//     //       <div className='flex items-center gap-1'>
//     //         <h5 className='font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>Property:</h5>
//     //         <h5 className='font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>
//     //           {`${property.propertySize} m`}
//     //           <sup>2</sup>
//     //         </h5>
//     //       </div>
//     //     </section>
//     //     <section className='flex items-center justify-between'>
//     //       <h5 className='font-openSans text-[0.625rem] font-semibold text-[#1E1E1E] opacity-70 lg:text-sm'>{property.location}</h5>
//     //     </section>
//     //   </div>
//     // </div>





// 'use client';

// import Carousel from '@/components/Carousel';
// import { useRouter } from 'next/navigation';

// const PropertyDetails = () => {
//   const router = useRouter();
// //   const { id } = router.query;

// //   // Find the property details based on the `id` from the route
// //   const propertyDetails = homeForSaleListings.find((listing) => listing.id === id);

// //   if (!propertyDetails) {
// //     return <div>Loading...</div>;
// //   }

// //   const { images, type, address, price, lotSize, propertySize, location } = propertyDetails;

// const { id } = router.query;

//   // Convert the `id` parameter to a number
//   const numericId = typeof id === 'string' ? parseInt(id, 10) : undefined;

//   // Find the property details based on the `numericId`
//   const propertyDetails = homeForSaleListings.find((listing) => listing.id === numericId);

//   if (!propertyDetails) {
//     return <div>Loading...</div>;
//   }

//   const { images, type, address, price, lotSize, propertySize, location } = propertyDetails;


//   return (
//     <div>
//       <h1>{address}</h1>
//       <Carousel id={Number(id)} images={images} />
//       <p>Type: {type}</p>
//       <p>Price: €{price.toLocaleString()}</p>
//       <p>Lot Size: {lotSize} m²</p>
//       <p>Property Size: {propertySize} m²</p>
//       <p>Location: {location}</p>
//       {/* Add any additional details you want to display */}
//     </div>
//   );
// };

// export default PropertyDetails;





'use client';
import Carousel from '@/components/Carousel';
import { useSearchParams } from 'next/navigation';

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

const PropertyDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  // Convert the `id` parameter to a number
  const numericId = id ? parseInt(id, 10) : undefined;

  // Find the property details based on the `numericId`
  const propertyDetails = homeForSaleListings.find((listing) => listing.id === numericId);

  if (!propertyDetails) {
    return <div>Loading...</div>;
  }

  const { images, type, address, price, lotSize, propertySize, location } = propertyDetails;

  return (
    <div>
      <h1>{address}</h1>
      {/* <Carousel id={numericId} images={images} /> */}
      {numericId && <Carousel id={numericId} images={images} />}
      <p>Type: {type}</p>
      <p>Price: €{price.toLocaleString()}</p>
      <p>Lot Size: {lotSize} m²</p>
      <p>Property Size: {propertySize} m²</p>
      <p>Location: {location}</p>
      {/* Add any additional details you want to display */}
    </div>
  );
};

export default PropertyDetails;