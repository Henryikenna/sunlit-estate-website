import { useAuth, useUser } from '@clerk/nextjs'
import { unstable_cache } from 'next/cache'
import { PROPERTY_CACHE } from '../../../cache/keys'
import { ListingType } from '../../../components/listing/listings-board'
import { countProperties, getPropertiesWithImages, propertiesWithImages } from '../../../types/queries'
import MyListingRow from './my-listing-row'
import Pagination from '../../../components/pagination/pagination'

const myProperties = unstable_cache(
  async (type: ListingType, page: number, userId: string | undefined) => {
    return await getPropertiesWithImages(page, type, undefined, { userId }, 20)
  },
  ['properties'],
  { tags: [PROPERTY_CACHE] }
)

const myPropertiesCount = unstable_cache(
  async (type: ListingType, userId: string | undefined) => {
    return await countProperties(type, undefined, { userId })
  },
  ['properties-count'],
  { tags: [PROPERTY_CACHE] }
)

type Props = {
  searchParams?: { page?: string; query?: string }
  params: { page: string }
}

const MyListingsPage = async ({ params }: Props) => {
  const pageNumber = params.page && typeof params.page === 'string' ? +params.page : 1

  const user = await useUser()
  let userId
  if (user && user.user?.publicMetadata.role != 'ADMIN') userId = user.user?.id

  const { data, error } = await myProperties('all', pageNumber, userId)
  if (error) throw error

  const { count, error: countError } = await myPropertiesCount('all', userId)
  if (countError) throw countError

  const properties: propertiesWithImages = data

  return (
    <div className='flex justify-center items-center w-full px-5 py-5'>
      <div className='xl:max-w-7xl bg-base-100 drop-shadow-xl border border-black/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5'>
        <div className='mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0 overflow-x-auto'>
          <table className='table table-xs w-full'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Adress</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.length > 0 ? (
                properties?.map((property) => <MyListingRow key={property.id} listing={property} />)
              ) : (
                <tr>
                  <td className='col-span-4'>No Properties found. Add one!</td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination pageLink='/admin/listings' currentPage={pageNumber} totalPages={count ? Math.ceil(count / 20) : 0} />
        </div>
      </div>
    </div>
  )
}

export default MyListingsPage
