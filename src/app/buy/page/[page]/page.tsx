import ListingsBoard from '@/components/listing/listings-board'
import SearchBar from '@/components/search-bar/search-bar'
import { Suspense } from 'react'
import Loading from '../../../loading'

type Props = {
  params: { page: string }
  searchParams?: { 'price-from'?: string; 'price-to'?: string; type?: string; sort?: string; area?: string; bedrooms?: string; bathrooms?: string }
}
const Page = async ({ params, searchParams }: Props) => {
  return (
    <>
      <div className='prose mt-2 pl-2'>
        <h2>Homes for Sale</h2>
      </div>
      <Suspense fallback={<Loading />}>
        <SearchBar>
          <Suspense fallback={<Loading />}>
            <ListingsBoard type='sale' page='/buy' searchParams={{ ...params, ...searchParams }} />
          </Suspense>
        </SearchBar>
      </Suspense>
    </>
  )
}

export default Page
