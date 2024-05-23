'use client'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { usePathname, useSearchParams } from 'next/navigation'
import { Fragment, useCallback, useState } from 'react'
import { Filter } from './search-bar'
import SliderFilterMobile from './slider-filter-mobile'
import CheckBoxFilterMobile from './checkbox-filter-mobile'
import FromToFilterMobile from './fromto-filter-mobile'
import Link from 'next/link'

type Props = {
  subCategories: { name: string; type: string | null }[]
  filters: Filter[]
  mobileFiltersOpen: boolean
  setMobileFiltersOpen: (b: boolean) => void
  processFilter: (sectionId: string, value: string, checked: boolean) => void
  processSliderFilter: (sectionId: string, value: string) => void
  processFromToFilter: (sectionId: string, fromOrTo: 'from' | 'to', value: string) => void
}

const MobileFilters = (props: Props) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

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

  return (
    <Transition.Root show={props.mobileFiltersOpen} as={Fragment}>
      <Dialog as='div' className='relative z-40 lg:hidden' onClose={props.setMobileFiltersOpen}>
        <Transition.Child
          as={Fragment}
          enter='transition-opacity ease-linear duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity ease-linear duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 z-40 flex'>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='translate-x-full'
          >
            <Dialog.Panel className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl'>
              <div className='flex items-center justify-between px-4'>
                <h2 className='text-lg font-medium text-gray-900'>Filters</h2>
                <button type='button' className='-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400' onClick={() => props.setMobileFiltersOpen(false)}>
                  <span className='sr-only'>Close menu</span>
                  <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                </button>
              </div>

              {/* Filters */}
              <form className='mt-4 border-t border-gray-200'>
                <h3 className='sr-only'>Categories</h3>
                <ul role='list' className='px-2 py-3 font-medium text-gray-900'>
                  {props.subCategories.map((category) => (
                    <li key={category.name}>
                      <Link href={pathname + '?' + createQueryString('type', category.type)} className='block px-2 py-3'>
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                {props.filters.map((section) => (
                  <Disclosure as='div' key={section.id} className='border-t border-gray-200 px-4 py-6'>
                    {({ open }) => (
                      <>
                        <h3 className='-mx-2 -my-3 flow-root'>
                          <Disclosure.Button className='flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500'>
                            <span className='font-medium text-gray-900'>{section.name}</span>
                            <span className='ml-6 flex items-center'>{open ? <MinusIcon className='h-5 w-5' aria-hidden='true' /> : <PlusIcon className='h-5 w-5' aria-hidden='true' />}</span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className='pt-6'>
                          {section.type == 'checkbox' ? <CheckBoxFilterMobile section={section} processFilter={props.processFilter} /> : ''}
                          {section.type == 'slider' ? <SliderFilterMobile section={section} processFilter={props.processSliderFilter} /> : ''}
                          {section.type == 'fromto' ? <FromToFilterMobile section={section} processFilter={props.processFromToFilter} /> : ''}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default MobileFilters
