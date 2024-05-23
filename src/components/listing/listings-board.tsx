import { unstable_cache } from 'next/cache'
import { PROPERTY_CACHE } from '../../cache/keys'
import ListingCard from '../../components/listing/listing-card'
import Pagination from '../../components/pagination/pagination'
import { PropertyQueryOptions, countProperties, getPropertiesWithImages, propertiesWithImages, toValidAreas, toValidPriceRange, toValidSort, toValidType } from '../../types/queries'

export type ListingType = 'sale' | 'rent' | 'all'

type Props = {
  searchParams?: { page?: string; query?: string; 'price-from'?: string; 'price-to'?: string; type?: string; sort?: string; area?: string; bedrooms?: string; bathrooms?: string }
  type: ListingType
  page: string
}

const isNumber = (val: string | number) => !!(val || val === 0) && !isNaN(Number(val.toString()))

const cachedProperties = unstable_cache(
  async (type: ListingType, page: number, searchQuery?: string, options?: PropertyQueryOptions) => {
    return await getPropertiesWithImages(page, type, searchQuery, options)
  },
  ['properties'],
  { tags: [PROPERTY_CACHE] }
)

const cachedPropertiesCount = unstable_cache(
  async (type: ListingType, searchQuery?: string, options?: PropertyQueryOptions) => {
    return await countProperties(type, searchQuery, options)
  },
  ['properties-count'],
  { tags: [PROPERTY_CACHE] }
)

const ListingsBoard = async ({ searchParams, type, page }: Props) => {
  const pageNumber = searchParams && typeof searchParams.page === 'string' ? +searchParams.page : 1

  const queryOptions: PropertyQueryOptions = {
    hideNotApproved: true,
    sort: toValidSort(searchParams?.sort),
    type: toValidType(searchParams?.type),
    price: toValidPriceRange(searchParams?.['price-from'], searchParams?.['price-to']),
    areas: toValidAreas(searchParams?.area),
    bedrooms: searchParams?.bedrooms && isNumber(searchParams?.bedrooms) ? +searchParams?.bedrooms : undefined,
    bathrooms: searchParams?.bathrooms && isNumber(searchParams?.bathrooms) ? +searchParams?.bathrooms : undefined,
  }

  const { data, error } = await cachedProperties(type, pageNumber, searchParams?.query, queryOptions)
  if (error) throw error
  const properties: propertiesWithImages = data

  const { count, error: countError } = await cachedPropertiesCount(type, searchParams?.query, queryOptions)
  if (countError) throw countError

  const pageLink = `/${page}`

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3'>
        {properties && properties.length > 0 ? properties.map((property) => <ListingCard key={property.id} listing={property} />) : <div className='text-lg'>No listings found.</div>}
      </div>
      <div className='w-full flex items-center justify-center mt-4'>
        <Pagination pageLink={page} currentPage={pageNumber} totalPages={count ? Math.ceil(count / 15) : 0} />
      </div>
    </>
  )
}

export default ListingsBoard
