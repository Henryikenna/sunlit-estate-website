import ListingsBoard from '@/components/listing/listings-board'
import SearchBar from '@/components/search-bar/search-bar'

type Props = {
  params: { page: string }
  searchParams?: { 'price-from'?: string; 'price-to'?: string; type?: string; sort?: string; area?: string; bedrooms?: string; bathrooms?: string }
}

const Page = async ({ params, searchParams }: Props) => {
  return (
    <>
      <div className='prose mt-2 pl-2'>
        <h2>Homes for Rent</h2>
      </div>
      <SearchBar>
        <ListingsBoard type='rent' page='/rent' searchParams={{ ...params, ...searchParams }} />
      </SearchBar>
    </>
  )
}

export default Page
