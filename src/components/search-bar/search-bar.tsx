'use client'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { supabaseAnonClient } from '../../supabase/client-anon-config'
import MobileFilters from './mobile-filter'
import CheckBoxFilter from './checkbox-filter'
import SliderFilter from './slider-filter'
import FromToFilter from './fromto-filter'
import Link from 'next/link'

const sortOptions = [
  { name: 'Newest', sort: 'newest', current: false },
  { name: 'Oldest', sort: 'oldest', current: false },
  { name: 'Price: Low to High', sort: 'low', current: false },
  { name: 'Price: High to Low', sort: 'high', current: false },
]
const subCategories = [
  { name: 'Any', type: null },
  { name: 'House', type: 'house' },
  { name: 'Apartment', type: 'appartment' },
  { name: 'Land', type: 'land' },
]

interface SearchState {
  sortOptions: SortOption[]
  subCategories: SubCategory[]
  filters: Filter[]
}

interface SubCategory {
  name: string
  type: string | null
}

interface SortOption {
  name: string
  sort: string
  current: boolean
}

interface FilterOption {
  value: string
  label: string
  checked: boolean
}

export type Filter =
  | {
      id: string
      name: string
      type: 'checkbox'
      options: FilterOption[]
    }
  | {
      id: string
      name: string
      type: 'slider'
      min: number
      max: number
      step: number
      value: string | undefined
    }
  | {
      id: string
      name: string
      type: 'fromto'
      fromOptions: FilterOption[]
      toOptions: FilterOption[]
      fromValue: string | undefined
      toValue: string | undefined
    }

const filters: Filter[] = [
  {
    id: 'price',
    type: 'fromto',
    name: 'Price',
    fromOptions: [
      { value: '1', label: '$0', checked: false },
      { value: '2', label: '$100k', checked: false },
      { value: '3', label: '$150k', checked: false },
      { value: '4', label: '$300k', checked: false },
      { value: '5', label: '$500k', checked: false },
    ],
    toOptions: [
      { value: '2', label: '$100k', checked: false },
      { value: '3', label: '$150k', checked: false },
      { value: '4', label: '$300k', checked: false },
      { value: '5', label: '$500k', checked: false },
      { value: '6', label: '$1M >', checked: false },
    ],
    fromValue: '-1',
    toValue: '-1',
  },
  {
    id: 'area',
    type: 'checkbox',
    name: 'Area',
    options: [],
  },
  {
    id: 'bedrooms',
    type: 'slider',
    name: 'Bedrooms',
    min: 1,
    max: 5,
    step: 1,
    value: undefined,
  },
  {
    id: 'bathrooms',
    type: 'slider',
    name: 'Bathrooms',
    min: 1,
    max: 5,
    step: 1,
    value: undefined,
  },
]

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  children: React.ReactNode
}
const SearchBar = (props: Props) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [searchState, setSearchState] = useState<SearchState>({ filters, sortOptions, subCategories })
  const [updateBasedOnSearchParams, setUpdateBasedOnSearchParams] = useState<boolean>(false)

  const processFilter = (sectionId: string, value: string, checked: boolean) => {
    // Update the state based on the filter being clicked
    setSearchState((prevState) => ({
      ...prevState,
      filters: prevState.filters.map((filter) =>
        filter.id === sectionId && filter.type === 'checkbox'
          ? {
              ...filter,
              options: filter.options.map((option) =>
                option.value == value
                  ? {
                      ...option,
                      checked,
                    }
                  : option
              ),
            }
          : filter
      ),
    }))
    setUpdateBasedOnSearchParams(true)
  }

  const processSliderFilter = (sectionId: string, value: string) => {
    // Update the state based on the filter being clicked
    setSearchState((prevState) => ({
      ...prevState,
      filters: prevState.filters.map((filter) =>
        filter.id === sectionId && filter.type === 'slider'
          ? {
              ...filter,
              value,
            }
          : filter
      ),
    }))
    setUpdateBasedOnSearchParams(true)
  }

  const processFromToFilter = (sectionId: string, fromOrTo: 'from' | 'to', value: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      filters: prevState.filters.map((filter) =>
        filter.id === sectionId && filter.type === 'fromto'
          ? {
              ...filter,
              fromValue: fromOrTo === 'from' ? value : filter.fromValue,
              toValue: fromOrTo === 'to' ? value : filter.toValue,
            }
          : filter
      ),
    }))
    setUpdateBasedOnSearchParams(true)
  }

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

  const applyFilters = useCallback(
    (filterId: string) => {
      setSearchState((prevState) => ({
        ...prevState,
        filters: prevState.filters.map((filter) =>
          filter.id === filterId && filter.type === 'checkbox'
            ? {
                ...filter,
                options: filter.options.map((option) => ({
                  ...option,
                  checked: searchParams.get(filterId)?.split(',')?.includes(option.value) ?? false,
                })),
              }
            : filter
        ),
      }))

      setSearchState((prevState) => ({
        ...prevState,
        filters: prevState.filters.map((filter) =>
          filter.id === filterId && filter.type === 'slider'
            ? {
                ...filter,
                value: searchParams.get(filterId) ? searchParams.get(filterId)! : undefined,
              }
            : filter
        ),
      }))

      setSearchState((prevState) => ({
        ...prevState,
        filters: prevState.filters.map((filter) =>
          filter.id === filterId && filter.type === 'fromto'
            ? {
                ...filter,
                fromValue: searchParams.get(filterId + '-from') ? searchParams.get(filterId + '-from')! : undefined,
                toValue: searchParams.get(filterId + '-to') ? searchParams.get(filterId + '-to')! : undefined,
              }
            : filter
        ),
      }))
    },
    [setSearchState, searchParams]
  )

  const applySort = useCallback(() => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOptions: prevState.sortOptions.map((sort) => (sort.sort === searchParams.get('sort') ? { ...sort, current: true } : { ...sort, current: false })),
    }))
  }, [setSearchState, searchParams])

  useEffect(() => {
    if (!updateBasedOnSearchParams) return

    const params = new URLSearchParams(searchParams.toString())
    searchState.filters.forEach((filter) => {
      if (filter.type === 'checkbox') {
        let filterOn = ''
        filter.options.forEach((option) => {
          if (option.checked) filterOn += option.value + ','
        })
        if (filterOn.length > 0) params.set(filter.id, filterOn.slice(0, -1)) // remove last comma
        else params.delete(filter.id)
      } else if (filter.type === 'slider') {
        if (filter.value) params.set(filter.id, filter.value)
        else params.delete(filter.id)
      } else if (filter.type === 'fromto') {
        if (filter.fromValue && filter.fromValue != '-1') params.set(filter.id + '-from', filter.fromValue)
        else params.delete(filter.id + '-from')

        if (filter.toValue && filter.toValue != '-1') params.set(filter.id + '-to', filter.toValue)
        else params.delete(filter.id + '-to')
      }
    })
    if (params.toString() != searchParams.toString()) {
      router.push(pathname + '?' + params.toString().replace(/%2C/g, ','), { scroll: false })
    }
    setUpdateBasedOnSearchParams(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateBasedOnSearchParams])

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabaseAnonClient.from('distinct_areas').select('area').not('area', 'is', null)
      if (error) throw error

      // Update the 'options' array of the 'area' filter
      const areas = data.map((item) => ({ value: item.area, label: item.area, checked: false }))
      setSearchState((prevState) => ({
        ...prevState,
        filters: prevState.filters.map((filter) =>
          filter.id === 'area'
            ? {
                ...filter,
                options: areas,
              }
            : filter
        ),
      }))
      applyFilters('area')
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    applyFilters('price')
    applyFilters('bedrooms')
    applyFilters('bathrooms')
    applySort()
  }, [applyFilters, applySort])

  return (
    <>
      <div>
        <MobileFilters
          subCategories={searchState.subCategories}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          filters={searchState.filters}
          processFilter={processFilter}
          processSliderFilter={processSliderFilter}
          processFromToFilter={processFromToFilter}
        />
        <main className='mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-baseline justify-between border-b border-primary pb-6 pt-2'>
            <div></div>

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
              <button type='button' className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden' onClick={() => setMobileFiltersOpen(true)}>
                <span className='sr-only'>Filters</span>
                <FunnelIcon className='h-5 w-5' aria-hidden='true' />
              </button>
            </div>
          </div>

          <section aria-labelledby='products-heading' className='pb-24 pt-6'>
            <h2 id='products-heading' className='sr-only'>
              Listings
            </h2>

            <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-7'>
              {/* Filters */}
              <form className='hidden lg:block'>
                <h3 className='sr-only'>Categories</h3>
                <ul role='list' className='space-y-4 border-b border-gray-200 pb-6 text-sm font-medium neutral-content'>
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <Link className='hover:text-accent' href={pathname + '?' + createQueryString('type', category.type)}>
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                {searchState.filters.map((section) => (
                  <Disclosure as='div' key={section.id} className='border-b border-gray-200 py-6'>
                    {({ open }) => (
                      <>
                        <h3 className='-my-3 flow-root'>
                          <Disclosure.Button className='flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500'>
                            <span className='font-medium neutral-content'>{section.name}</span>
                            <span className='ml-6 flex items-center'>{open ? <MinusIcon className='h-5 w-5' aria-hidden='true' /> : <PlusIcon className='h-5 w-5' aria-hidden='true' />}</span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className='pt-6'>
                          {section.type == 'checkbox' ? <CheckBoxFilter section={section} processFilter={processFilter} /> : ''}
                          {section.type == 'slider' ? <SliderFilter section={section} processFilter={processSliderFilter} /> : ''}
                          {section.type == 'fromto' ? <FromToFilter section={section} processFilter={processFromToFilter} /> : ''}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className='lg:col-span-6'>{props.children}</div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default SearchBar
