// import { useUser } from '@clerk/nextjs'
// import { serverClient } from '../../../supabase/config'
// import ScrapedRow from './scraper-row'

// type Props = {
//   searchParams?: { page?: string; query?: string }
//   params: { page: string }
// }

// const ScrapedPage = async ({ params }: Props) => {
//   const user = await useUser()
//   if (user && user.user?.publicMetadata.role != 'ADMIN') return

//   const { data, error } = await serverClient.from('scraped_realtor_property').select().order('created_at', { ascending: false })
//   if (error) throw error

//   return (
//     <div className='flex justify-center items-center w-full px-5 py-5'>
//       <div className='xl:max-w-7xl bg-base-100 drop-shadow-xl border border-black/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5'>
//         <div className='mx-auto w-full md:p-10 py-5 md:py-0 overflow-x-auto'>
//           <table className='table table-xs w-full'>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Adress</th>
//                 <th>Scraped on</th>
//                 <th>Status</th>
//                 <th>Scraped at</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.length > 0 ? (
//                 data.map((property) => <ScrapedRow key={property.id} listing={property} />)
//               ) : (
//                 <tr>
//                   <td className='col-span-4'>No Properties found. Add one!</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ScrapedPage


"use client"
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { serverClient } from '../../../supabase/config'
import ScrapedRow from './scraper-row'
import { Database } from '@/types/supabase'

type Props = {
  searchParams?: { page?: string; query?: string }
  params: { page: string }
}

type Property = {
  address: string | null
  area: string | null
  created_at: string | null
  description: string | null
  description_ai: string | null
  has_balcony: boolean | null
  has_garden: boolean | null
  has_parking: boolean | null
  has_pool: boolean | null
  id: number
  imageIds: number[] | null
  latitude: number | null
  longitude: number | null
  lot_square_meter: number | null
  name: string | null
  num_bathrooms: number | null
  num_bedrooms: number | null
  owner_id: string | null
  price: number | null
  property_building_type: Database['public']['Enums']['property_building_type'] | null
  property_square_meter: number | null
  property_url: string | null
  realtor_id: number | null
  realtor_url: string | null
  reviewed: boolean | null
  scrape_status: string | null
  seo_description: string | null
  seo_keywords: string | null
  seo_title: string | null
  status: string | null
  type: Database['public']['Enums']['property_type'] | null
  youtube_url: string | null
}


const ScrapedPage = ({ params }: Props) => {
  const { user } = useUser()
  const [data, setData] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!user) return
    if (user?.publicMetadata?.role !== 'ADMIN') return

    const fetchData = async () => {
      try {
        const { data, error } = await serverClient
          .from('scraped_realtor_property')
          .select()
          .order('created_at', { ascending: false })

        if (error) throw error

        setData(data as unknown as Property[]) // First cast to unknown, then to Property[]
      } catch (error) {
        setError(error as Error) // Cast error to Error
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  if (!user) return <p>Loading user...</p>
  if (user?.publicMetadata?.role !== 'ADMIN') return <p>Access Denied</p>
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className='flex justify-center items-center w-full px-5 py-5'>
      <div className='xl:max-w-7xl bg-base-100 drop-shadow-xl border border-black/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5'>
        <div className='mx-auto w-full md:p-10 py-5 md:py-0 overflow-x-auto'>
          <table className='table table-xs w-full'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Scraped on</th>
                <th>Status</th>
                <th>Scraped at</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((property) => <ScrapedRow key={property.id} listing={property} />)
              ) : (
                <tr>
                  <td className='col-span-4'>No Properties found. Add one!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ScrapedPage










// import { useUser } from '@clerk/nextjs'
// import { serverClient } from '../../../supabase/config'
// import ScrapedRow from './scraper-row'

// type Props = {
//   SearchParams?: { page?: string; query?: string }
//   params: { page: string }
// }

// const ScrapedPage = async ({ params }: Props) => {
//   const user = await useUser()

//   // Enhanced Authentication Check with Error Handling
//   if (!user || user.user?.publicMetadata.role !== 'ADMIN') {
//     throw new Error('Unauthorized access. Please log in as an admin.')
//   }

//   // Data Fetching with Error Handling and Loading State
//   // const { data, error } = await serverClient
//   //   .from('scraped_realtor_property')
//   //   .select('*')
//   //   .order('created_at', { ascending: false })
//   //   .catch((error) => {
//   //     console.error('Error fetching data:', error);
//   //     return { data: [], error }; // Return empty data and error flag
//   //   });
//   const { data, error } = await serverClient.from('scraped_realtor_property').select('*').order('created_at', { ascending: false })

//   try {
//     // ... (rest of your code using data)
//   } catch (error) {
//     console.error('Error fetching data:', error)
//     // Handle the error here (e.g., display an error message)
//   }

//   if (error) {
//     // Display user-friendly error message
//     return (
//       <div className='error-container'>
//         <p>Error loading scraped properties. Please try again later.</p>
//       </div>
//     )
//   }

//   return (
//     <div className='flex justify-center items-center w-full px-5 py-5'>
//       <div className='xl:max-w-7xl bg-base-100 drop-shadow-xl border border-black/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5'>
//         <div className='mx-auto w-full md:p-10 py-5 md:py-0 overflow-x-auto'>
//           <table className='table table-xs w-full'>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Address</th>
//                 <th>Scraped on</th>
//                 <th>Status</th>
//                 <th>Scraped at</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.length > 0 ? (
//                 data.map((property) => <ScrapedRow key={property.id} listing={property} />)
//               ) : (
//                 <tr>
//                   <td className='col-span-4'>No Properties found. Add one!</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ScrapedPage

// import { serverClient } from '../../../supabase/config'
// import ScrapedRow from './scraper-row'
// import { GetServerSidePropsContext } from 'next';
// import { getSession } from 'next-auth/react';

// type Props = {
//   searchParams?: { page?: string; query?: string }
//   params: { page: string }
// }

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const { req, params } = context;
//   const session = await getSession({ req });

//   if (!session || session.user.publicMetadata.role != 'ADMIN') {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   const { data, error } = await serverClient.from('scraped_realtor_property').select().order('created_at', { ascending: false })
//   if (error) throw error

//   return {
//     props: { data }, // will be passed to the page component as props
//   };
// }

// const ScrapedPage = ({ data }: { data: any }) => {
//   return (
//     <div className='flex justify-center items-center w-full px-5 py-5'>
//       <div className='xl:max-w-7xl bg-base-100 drop-shadow-xl border border-black/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5'>
//         <div className='mx-auto w-full md:p-10 py-5 md:py-0 overflow-x-auto'>
//           <table className='table table-xs w-full'>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Adress</th>
//                 <th>Scraped on</th>
//                 <th>Status</th>
//                 <th>Scraped at</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.length > 0 ? (
//                 data.map((property: any) => <ScrapedRow key={property.id} listing={property} />)
//               ) : (
//                 <tr>
//                   <td className='col-span-4'>No Properties found. Add one!</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ScrapedPage

// import { GetServerSidePropsContext } from 'next';
// import { User } from 'next-auth';
// import { getSession } from 'next-auth/react';
// import { serverClient } from '../../../supabase/config';
// import ScrapedRow from './scraper-row';

// interface MyUser extends User {
//   publicMetadata: {
//     role: string;
//   };
// }

// type Props = {
//   searchParams?: { page?: string; query?: string };
//   params: { page: string };
//   data: any;
// };

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const { req, params } = context;
//   const session = await getSession({ req });

//   if (!session || !session.user || !('publicMetadata' in session.user) || (session.user.publicMetadata as { role: string }).role != 'ADMIN') {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   const user = session.user as MyUser; // Now it's safe to cast

//   const { data, error } = await serverClient.from('scraped_realtor_property').select().order('created_at', { ascending: false });
//   if (error) throw error;

//   return {
//     props: { data }, // will be passed to the page component as props
//   };
// }

// const ScrapedPage = ({ data }: Props) => {
//   return (
//     <div className='flex justify-center items-center w-full px-5 py-5'>
//       <div className='xl:max-w-7xl bg-base-100 drop-shadow-xl border border-black/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5'>
//         <div className='mx-auto w-full md:p-10 py-5 md:py-0 overflow-x-auto'>
//           <table className='table table-xs w-full'>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Adress</th>
//                 <th>Scraped on</th>
//                 <th>Status</th>
//                 <th>Scraped at</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.length > 0 ? (
//                 data.map((property: any) => <ScrapedRow key={property.id} listing={property} />)
//               ) : (
//                 <tr>
//                   <td className='col-span-4'>No Properties found. Add one!</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ScrapedPage;
