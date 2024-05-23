import { useUser } from '@clerk/nextjs'
import { serverClient } from '../../../supabase/config'
import ScrapedRow from './scraper-row'

type Props = {
  searchParams?: { page?: string; query?: string }
  params: { page: string }
}

const ScrapedPage = async ({ params }: Props) => {
  const user = await useUser()
  if (user && user.user?.publicMetadata.role != 'ADMIN') return

  const { data, error } = await serverClient.from('scraped_realtor_property').select().order('created_at', { ascending: false })
  if (error) throw error

  return (
    <div className='flex justify-center items-center w-full px-5 py-5'>
      <div className='xl:max-w-7xl bg-base-100 drop-shadow-xl border border-black/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5'>
        <div className='mx-auto w-full md:p-10 py-5 md:py-0 overflow-x-auto'>
          <table className='table table-xs w-full'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Adress</th>
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
