import { unstable_cache } from 'next/cache'
import { PROPERTY_CACHE } from '../../cache/keys'
import ListingCard from '../../components/listing/listing-card'
import { countProperties, getPropertiesWithImages, propertiesWithImages } from '../../types/queries'
import Link from 'next/link'

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined }
  type: 'sale' | 'rent'
  page: string
  title: string
  more: string
}

const cachedProperties = unstable_cache(
  async (type: 'sale' | 'rent', page: number) => {
    return await getPropertiesWithImages(page, type, undefined, undefined, 5)
  },
  ['properties'],
  { tags: [PROPERTY_CACHE] }
)

const cachedPropertiesCount = unstable_cache(
  async (type: 'sale' | 'rent') => {
    return await countProperties(type)
  },
  ['properties-count'],
  { tags: [PROPERTY_CACHE] }
)

const ListingsBoardPreview = async ({ searchParams, type, page, title, more }: Props) => {
  const pageNumber = searchParams && typeof searchParams.page === 'string' ? +searchParams.page : 1

  const { data, error } = await cachedProperties(type, pageNumber)
  if (error) throw error
  const properties: propertiesWithImages = data

  const { count, error: countError } = await cachedPropertiesCount(type)
  if (countError) throw countError

  const pageLink = `/${page}`

  return (
    <>
      <div className='text-xl font-semibold pl-2'>{title}</div>
      <div>
        <Link className='link link-hover pl-2' href={page}>
          {more}
        </Link>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>{properties?.map((property) => <ListingCard key={property.id} listing={property} />)}</div>
    </>
  )
}

export default ListingsBoardPreview
