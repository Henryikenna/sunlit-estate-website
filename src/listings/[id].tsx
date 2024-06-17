import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Carousel from '@/components/Carousel';
// import homeForSaleListings from '@/data/homeForSaleListings'; // Assuming you move the listings data to a separate file

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


// const ListingDetail = () => {
// //   const router = useRouter();
// //   const { id } = router.query;
// //   const listing = homeForSaleListings.find(listing => listing.id === parseInt(id));

// //   if (!listing) {
// //     return <p>Listing not found</p>;
// //   }

// //   const { images, type, address, price, lotSize, propertySize, location } = listing;

// const router = useRouter();
//   const { id } = router.query;

//   if (!id) {
//     return <p>Loading...</p>; // Handle case where id is undefined
//   }

//   // Convert id to a number if it's a string
//   const listingId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10);

//   const listing = homeForSaleListings.find(listing => listing.id === listingId);

//   if (!listing) {
//     return <p>Listing not found</p>;
//   }

//   const { images, type, address, price, lotSize, propertySize, location } = listing;

//   return (
//     <div className='px-3 pt-6 w-full flex flex-col items-center'>
//       <Carousel id={listingId} images={images} />
//       <div className='w-auto px-[0.625rem] pt-3 lg:pt-6 lg:px-[1.125rem]'>
//         <h4 className='font-openSans text-base pb-3 font-bold text-[#1E1E1E] opacity-90'>{address}</h4>
//         <h4 className='font-openSans text-lg pb-3 font-extrabold text-[#1E1E1E] opacity-90'>{`€ ${price.toLocaleString()}`}</h4>
//         <section className='flex items-center justify-between pb-3'>
//           <div className='flex items-center gap-1'>
//             <h5 className='font-openSans text-sm font-normal text-[#1E1E1E] opacity-70'>Lot:</h5>
//             <h5 className='font-openSans text-sm font-normal text-[#1E1E1E] opacity-70'>
//               {`${lotSize} m`}
//               <sup>2</sup>
//             </h5>
//           </div>
//           <div className='flex items-center gap-1'>
//             <h5 className='font-openSans text-sm font-normal text-[#1E1E1E] opacity-70'>Property:</h5>
//             <h5 className='font-openSans text-sm font-normal text-[#1E1E1E] opacity-70'>
//               {`${propertySize} m`}
//               <sup>2</sup>
//             </h5>
//           </div>
//         </section>
//         <section className='flex items-center justify-between'>
//           <h5 className='font-openSans text-sm font-semibold text-[#1E1E1E] opacity-70'>{location}</h5>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default ListingDetail;






// const ListingDetail = ({ listing }) => {
//     if (!listing) {
//       return <p>Listing not found</p>;
//     }
  
//     const { id, images, type, address, price, lotSize, propertySize, location } = listing;
  
//     return (
//       <div className='px-3 pt-6 w-full flex flex-col items-center'>
//         <Carousel id={id} images={images} />
//         <div className='w-auto px-[0.625rem] pt-3 lg:pt-6 lg:px-[1.125rem]'>
//           <h4 className='font-openSans text-base pb-3 font-bold text-[#1E1E1E] opacity-90'>{address}</h4>
//           <h4 className='font-openSans text-lg pb-3 font-extrabold text-[#1E1E1E] opacity-90'>{`€ ${price.toLocaleString()}`}</h4>
//           <section className='flex items-center justify-between pb-3'>
//             <div className='flex items-center gap-1'>
//               <h5 className='font-openSans text-sm font-normal text-[#1E1E1E] opacity-70'>Lot:</h5>
//               <h5 className='font-openSans text-sm font-normal text-[#1E1E1E] opacity-70'>
//                 {`${lotSize} m`}
//                 <sup>2</sup>
//               </h5>
//             </div>
//             <div className='flex items-center gap-1'>
//               <h5 className='font-openSans text-sm font-normal text-[#1E1E1E] opacity-70'>Property:</h5>
//               <h5 className='font-openSans text-sm font-normal text-[#1E1E1E] opacity-70'>
//                 {`${propertySize} m`}
//                 <sup>2</sup>
//               </h5>
//             </div>
//           </section>
//           <section className='flex items-center justify-between'>
//             <h5 className='font-openSans text-sm font-semibold text-[#1E1E1E] opacity-70'>{location}</h5>
//           </section>
//         </div>
//       </div>
//     );
//   };
  
//   export const getServerSideProps: GetServerSideProps = async (context) => {
//     const { id } = context.params;
//     const listingId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10);
  
//     const listing = homeForSaleListings.find(listing => listing.id === listingId);
  
//     if (!listing) {
//       return {
//         notFound: true,
//       };
//     }
  
//     return {
//       props: { listing }, // will be passed to the page component as props
//     };
//   };
  
//   export default ListingDetail;




// import { GetServerSideProps } from 'next';

interface Listing {
  id: number;
  images: string[];
  type: string;
  address: string;
  price: number;
  lotSize: number;
  propertySize: number;
  location: string;
}

interface ListingDetailProps {
  listing?: Listing; // Make listing optional since it could be undefined
}

const ListingDetail: React.FC<ListingDetailProps> = ({ listing }) => {
  if (!listing) {
    return <p>Listing not found</p>;
  }

  const { id, images, type, address, price, lotSize, propertySize, location } = listing;

  return (
    <div className='px-3 pt-6 w-full flex flex-col items-center'>
      {/* Your existing JSX */}
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id } = context.params;
//   const listingId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10);

//   const listing = homeForSaleListings.find(listing => listing.id === listingId);

//   if (!listing) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: { listing }, // will be passed to the page component as props
//   };
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string | string[] }; // Define the type explicitly

  const listingId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10);

  const listing = homeForSaleListings.find(listing => listing.id === listingId);

  if (!listing) {
    return {
      notFound: true,
    };
  }

  return {
    props: { listing },
  };
};



export default ListingDetail;
