'use client'
import { useRouter, usePathname } from 'next/navigation'
import ListingsBoard from '@/components/listing/listings-board'
import SearchBar from '@/components/search-bar/search-bar'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { Fragment, useCallback, useEffect, useState } from 'react'
import BodyBackground from '@/components/BodyBackground'
import AppFilter from '@/components/Filter'
// import "@/components/listing/home-for-sale-listing-list.ts";
import Carousel from '@/components/Carousel'

const sortOptions = [
  { name: 'Newest', sort: 'newest', current: false },
  { name: 'Oldest', sort: 'oldest', current: false },
  { name: 'Price: Low to High', sort: 'low', current: false },
  { name: 'Price: High to Low', sort: 'high', current: false },
]

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
  params: { query: string }
}

interface SortOption {
  name: string
  sort: string
  current: boolean
}

interface SearchState {
  sortOptions: SortOption[]
  // subCategories: SubCategory[]
  // filters: Filter[]
}

const homeForSaleListings = [
  {
    id: 1,
    images: [
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG91c2V8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG91c2V8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdXNlfGVufDB8fDB8fHww',
    ],
    type: '3 Bedroom',
    address: 'Kaya Seminole 32, Noord Saliña',
    price: 385000,
    lotSize: 342,
    propertySize: 653,
    location: 'Sunbelt Realty Bonaire',
  },
  {
    id: 2,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdXNlfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdXNlfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8fDA%3D',
    ],
    type: '2 Bedroom',
    address: 'Kaya Amalia 11E',
    price: 126000,
    lotSize: 222,
    propertySize: 69,
    location: 'Sunbelt Realty Bonaire',
  },
  {
    id: 3,
    images: [
      'https://images.unsplash.com/photo-1448630360428-65456885c650?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGhvdXNlfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGhvdXNlfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1584738766473-61c083514bf4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGhvdXNlfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1430285561322-7808604715df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGhvdXNlfGVufDB8fDB8fHww',
    ],
    type: '2 Bedroom',
    address: 'Oud Lagoen 45A',
    price: 364200,
    lotSize: 252,
    propertySize: 564,
    location: 'Sunbelt Realty Bonaire',
  },
  {
    id: 4,
    images: ['https://images.unsplash.com/photo-1574259392081-dbe3c19cd15e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGhvdXNlfGVufDB8fDB8fHww'],
    type: '4 Bedroom',
    address: 'Suikerpalm 28, Suikerpalm',
    price: 980000,
    lotSize: 498,
    propertySize: 87,
    location: 'Sunbelt Realty Bonaire',
  },
  {
    id: 5,
    images: ['https://images.unsplash.com/photo-1574259392081-dbe3c19cd15e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGhvdXNlfGVufDB8fDB8fHww'],
    type: '4 Bedroom',
    address: 'Suikerpalm 28, Suikerpalm',
    price: 980000,
    lotSize: 498,
    propertySize: 87,
    location: 'Sunbelt Realty Bonaire',
  },
]

const SearchPage = ({ params, searchParams }: Props) => {
  // const router = useRouter();
  // const { query } = router;

  const query = params.query || searchParams.query || ''
  const pathname = usePathname()

  const [searchState, setSearchState] = useState<SearchState>({ sortOptions })
  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value == null) {
        params.delete(name)
      } else {
        params.set(name, value)
      }

      return params.toString().replace(/%2C/g, ',')
    },
    [searchParams]
  )

  function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      <BodyBackground isSearchInputVisible={false} />
      <div className=''>
        <div className='my-5 px-6 lg:px-12 pl-5 text-center text-[#1E1E1EE5] font-openSans text-lg lg:text-xl'>
          <h2>
            Search result for <span className=' font-semibold'>"{query}"</span>
          </h2>
        </div>

        <hr className=' bg-[#7A848C80]' />

        <div className='flex items-center gap-10 justify-end pb-6 pt-8 px-6 lg:px-12'>
          <div>
            <AppFilter isFilterTextVisible={false} />
          </div>

          <div className='flex items-center'>
            <Menu as='div' className='relative inline-block text-left'>
              <div>
                <Menu.Button className='group inline-flex justify-center text-sm font-medium link-neutral-content'>
                  Sort
                  <ChevronDownIcon className='-mr-1 ml-1 h-5 w-5 flex-shrink-0' aria-hidden='true' />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <div className='py-1'>
                    {searchState.sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <Link
                            href={pathname + '?' + createQueryString('sort', option.sort)}
                            className={classNames(option.current ? 'font-medium text-gray-900 bg-base-200' : 'text-gray-500', active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm')}
                          >
                            {option.name}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/*
            <button type='button' className='-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7'>
              <span className='sr-only'>View grid</span>
              <Squares2X2Icon className='h-5 w-5' aria-hidden='true' />
                        </button> */}
            {/* <button type='button' className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden' onClick={() => setMobileFiltersOpen(true)}>
                <span className='sr-only'>Filters</span>
                <FunnelIcon className='h-5 w-5' aria-hidden='true' />
              </button> */}
          </div>
        </div>

        <div className=' pt-5 px-6 lg:pt-10 lg:px-12'>
          <h3 className='text-[#1E1E1EE5] font-openSans text-lg lg:text-xl'>House listing for {query}:</h3>

          <div className=' pt-6 w-full flex flex-wrap gap-y-5 md:gap-y-8 lg:gap-y-14'>
            {homeForSaleListings.map(({ id, images, type, address, price, lotSize, propertySize, location }) => (
              <div key={id} className=' flex flex-col w-1/2 md:w-1/3 lg:w-1/4 p-2'>
               
                <Carousel id={id} images={images} />

                <div key={id} className=' w-auto px-[0.625rem] pt-3 lg:pt-6 lg:px-[1.125rem]'>
                  {/* <h4 className=' font-openSans text-[0.625rem] pb-3 font-semibold text-[#1E1E1E] opacity-80 lg:pb-6 lg:text-base'>{type}</h4> */}
                  <h4 className=' font-openSans text-[0.5625rem] pb-[0.4375rem] font-bold text-[#1E1E1E] opacity-90 lg:pb-3 lg:text-base'>{address}</h4>
                  <h4 className=' font-openSans text-sm pb-[0.4375rem] font-extrabold text-[#1E1E1E] opacity-90 lg:pb-3 lg:text-lg'>{`€ ${price.toLocaleString()}`}</h4>

                  {/* <section className=' flex items-center justify-between pb-[0.4375rem]'> */}
                  <section className=' flex items-center justify-between pb-3'>
                    <div className=' flex items-center gap-1'>
                      <h5 className=' font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>Lot:</h5>
                      <h5 className=' font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>
                        {`${lotSize} m`}
                        <sup>2</sup>
                      </h5>
                    </div>
                    <div className=' flex items-center gap-1'>
                      <h5 className=' font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>Property:</h5>
                      <h5 className=' font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm'>
                        {`${propertySize} m`}
                        <sup>2</sup>
                      </h5>
                    </div>
                  </section>
                  {/* <section className=" flex items-center justify-between pb-3 lg:pb-6">
                <h5 className=" font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm">
                  Property:
                </h5>
                <h5 className=" font-openSans text-[0.625rem] font-normal text-[#1E1E1E] opacity-70 lg:text-sm">
                  {`${propertySize} m`}
                  <sup>2</sup>
                </h5>
              </section> */}
                  <section className=' flex items-center justify-between'>
                    <h5 className=' font-openSans text-[0.625rem] font-semibold text-[#1E1E1E] opacity-70 lg:text-sm'>{location}</h5>
                    <svg
                      className=' w-[0.5625rem] h-[0.5625rem] lg:w-[1.0625rem] lg:h-[1.0625rem]'
                      // width="17"
                      // height="17"
                      viewBox='0 0 17 17'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M0.945098 0.582275C1.10594 0.582275 1.2602 0.646172 1.37394 0.759908C1.48768 0.873644 1.55157 1.0279 1.55157 1.18875V1.62541L3.03784 1.25344C4.86365 0.796934 6.79254 1.00861 8.47589 1.85021L8.56323 1.89388C9.95905 2.59189 11.5554 2.77846 13.0746 2.42111L15.5894 1.82919C15.6838 1.80707 15.782 1.80786 15.876 1.83151C15.9699 1.85515 16.0568 1.90096 16.1294 1.9651C16.202 2.02923 16.2582 2.10983 16.2933 2.20014C16.3283 2.29045 16.3413 2.38785 16.331 2.48418C16.0301 5.26241 16.0315 8.06508 16.335 10.843C16.3512 10.9903 16.3129 11.1383 16.2274 11.2593C16.1419 11.3803 16.015 11.4658 15.8708 11.4996L13.3528 12.0924C11.5573 12.5149 9.67045 12.2946 8.02063 11.4697L7.9333 11.426C6.50907 10.7138 4.87705 10.5346 3.33218 10.9206L1.55157 11.3654V15.7441C1.55157 15.905 1.48768 16.0592 1.37394 16.173C1.2602 16.2867 1.10594 16.3506 0.945098 16.3506C0.784251 16.3506 0.629991 16.2867 0.516255 16.173C0.402519 16.0592 0.338623 15.905 0.338623 15.7441V1.18875C0.338623 1.10911 0.35431 1.03024 0.384788 0.956662C0.415266 0.883081 0.459939 0.816224 0.516255 0.759908C0.572572 0.703591 0.639429 0.658919 0.71301 0.62844C0.786591 0.597962 0.865454 0.582275 0.945098 0.582275Z'
                        fill='#06384A'
                      />
                    </svg>
                  </section>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <SearchBar> */}
      {/* <ListingsBoard type='all' page={`/search/${query}`} searchParams={{ ...searchParams, ...params }} /> */}
      {/* <h1>Searched for: {query}</h1>
        <h3>Replaced ListingBoard here, fix when adding backend</h3>
      </SearchBar> */}
    </>
  )
}

export default SearchPage
