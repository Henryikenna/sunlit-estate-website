import BodyBackground from '@/components/BodyBackground'
import ListingsBoard from '../../components/listing/listings-board'
import SearchBar from '../../components/search-bar/search-bar'

type Props = {
  params: { page: string }
  searchParams?: { 'price-from'?: string; 'price-to'?: string; type?: string; sort?: string; area?: string; bedrooms?: string; bathrooms?: string }
}

const Page = async ({ searchParams }: Props) => {
  return (
    <div className=''>
      
      <BodyBackground isSearchInputVisible={false} />
      <div className='prose mt-2 pl-2'>
        <h2>Homes for Rent</h2>
      </div>
      <SearchBar>
        {/* <ListingsBoard type='rent' page='/rent' searchParams={searchParams} /> */}
        <h1>Replaced ListingBoard here, fix when adding backend</h1>
      </SearchBar>
    </div>
  )
}

export default Page
