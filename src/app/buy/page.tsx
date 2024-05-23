import ListingsBoard from '@/components/listing/listings-board'
import SearchBar from '@/components/search-bar/search-bar'

type Props = {
  params: { page: string }
  searchParams?: { 'price-from'?: string; 'price-to'?: string; type?: string; sort?: string; area?: string; bedrooms?: string; bathrooms?: string }
}
const Page = async ({ searchParams }: Props) => {
  return (
    <>
      <div className='prose mt-2 pl-2'>
        <h2>Homes for Sale</h2>
      </div>
      <SearchBar>
        {/* <ListingsBoard type='sale' page='/buy' searchParams={searchParams} /> */}
        <h1>Replaced ListingBoard here, fix when adding backend</h1>
      </SearchBar>
    </>
  )
}

export default Page
