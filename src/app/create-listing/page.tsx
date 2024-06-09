'use client'
import { SetStateAction, Suspense, useEffect } from 'react'
import { useState } from 'react'
import Loading from '../loading'
import ListingSellPage from '../listing-sell-page/page'
import ListingRentPage from '../listing-rent-page/page'

const CreateListingPage = () => {
  const [selectedPage, setSelectedPage] = useState('sell') 

  const handlePageChange = (page: SetStateAction<string>) => {
    setSelectedPage(page)
  }


  return (
    <div className=' pt-28 px-10 md:px-12 lg:px-16'>
      <h4 className="text-[#1E1E1E] pb-5 text-2xl font-openSans font-bold text-center">Create Listing</h4>

      <hr className=' border-[#1E1E1E40] w-full' />

      <div className=' flex justify-center items-end gap-4 pt-12 md:gap-6'>
          <button onClick={() => handlePageChange('sell')}>
              <h3 className={` font-openSans font-semibold text-base pt-1 border-b-4 ${selectedPage === 'sell' ? 'border-[#F6812D]' : 'border-transparent'} md:text-xl`}>Sell</h3>
          </button>
          <button onClick={() => handlePageChange('rent')}>
            <h3 className={` font-openSans font-semibold text-base pt-1 border-b-4 ${selectedPage === 'rent' ? 'border-[#F6812D]' : 'border-transparent'} md:text-xl`}>Rent</h3>
          
          </button>
        </div>
        

        <Suspense fallback={<Loading />}>
        {selectedPage === 'sell' && <ListingSellPage />}
        {selectedPage === 'rent' && <ListingRentPage />}
      </Suspense>
    </div>
  )
}

export default CreateListingPage