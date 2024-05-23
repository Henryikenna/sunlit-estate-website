import { Suspense } from 'react'
import ListingsBoardPreview from '../components/listing/listings-preview'
import Loading from './loading'

export default function Home() {
  return (
    <>
      <div className='hero h-96' style={{ backgroundImage: 'url(/background.webp)' }}>
        <div className='hero-overlay bg-opacity-60'></div>
        <div className='hero-content text-center text-neutral-content'>
          <div className='max-w-md'>
            <h1 className='mb-5 text-5xl font-bold'>Sunlit Caribbean Estates</h1>
            <p className='mb-5 text-3xl'>Find your dream home on the ABC Islands!</p>
            <form action={'/search'}>
              <label className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>Search</label>
              <div className='relative'>
                <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                  <svg className='w-4 h-4 text-gray-500 dark:text-gray-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'>
                    <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z' />
                  </svg>
                </div>
                <input type='search' name='query' id='default-search' className='block w-full p-4 ps-10 text-sm input input-bordered text-base-content' placeholder='Search Listings...' required />
                <button type='submit' className='btn btn-primary btn-sm absolute end-2.5 bottom-2.5'>
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <Suspense fallback={<Loading />}>
        <ListingsBoardPreview more='Check more homes for sale' title='Homes for Sale' type='sale' page='buy' />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <ListingsBoardPreview more='Check more homes for rent' title='Homes for Rent' type='rent' page='rent' />
      </Suspense> */}
    </>
  )
}
