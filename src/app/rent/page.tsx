'use client'
import BodyBackground from '@/components/BodyBackground'
import ListingsBoard from '../../components/listing/listings-board'
import SearchBar from '../../components/search-bar/search-bar'
import { SetStateAction, Suspense, useEffect } from 'react'
import { useState } from 'react'
import AppFilter from '@/components/Filter'
import HomeForSalePage from '../home-for-sale/page'
import HomeForRentPage from '../home-for-rent/page'
import Loading from '../loading'
import { FiPlus } from "react-icons/fi";


type Props = {
  params: { page: string }
  searchParams?: { 'price-from'?: string; 'price-to'?: string; type?: string; sort?: string; area?: string; bedrooms?: string; bathrooms?: string }
}

const Page = async ({ searchParams }: Props) => {

  const [selectedPage, setSelectedPage] = useState('sale') // Default selected page is 'sale'

  const handlePageChange = (page: SetStateAction<string>) => {
    setSelectedPage(page)
  }


  return (
    <div className='pt-[88px] '>
      <div className=' flex px-3 pt-6 md:pt-10 md:px-10 lg:px-[3.75rem]'>
        <div className=' flex flex-1 items-end gap-4 md:gap-6'>
          <button onClick={() => handlePageChange('sale')}>
            <section className={` flex flex-col items-center ${selectedPage === 'sale' ? 'opacity-100' : 'opacity-50'}`}>
              <svg
                className=' w-5 h-7 md:w-6 md:h-8 lg:w-7 lg:h-10'
                // width="29"
                // height="40"
                viewBox='0 0 29 40'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <mask id='path-1-inside-1_37_802' fill='white'>
                  <path d='M4.74341 18.7585C3.09841 18.7585 1.74341 20.1135 1.74341 21.7585V28.5385C1.13341 29.0905 0.743408 29.8805 0.743408 30.7585V39.7585H5.74341V37.7585H23.7434V39.7585H28.7434V30.7585C28.7434 29.8805 28.3534 29.0905 27.7434 28.5385V21.7585C27.7434 20.1135 26.3884 18.7585 24.7434 18.7585H4.74341ZM4.74341 20.7585H24.7434C25.2984 20.7585 25.7434 21.2035 25.7434 21.7585V27.7585H23.7434V26.7585C23.7434 25.1135 22.3884 23.7585 20.7434 23.7585H16.7434C15.9764 23.7585 15.2764 24.0585 14.7434 24.5385C14.1965 24.0395 13.4837 23.7615 12.7434 23.7585H8.74341C7.09841 23.7585 5.74341 25.1135 5.74341 26.7585V27.7585H3.74341V21.7585C3.74341 21.2035 4.18841 20.7585 4.74341 20.7585ZM8.74341 25.7585H12.7434C13.2984 25.7585 13.7434 26.2035 13.7434 26.7585V27.7585H7.74341V26.7585C7.74341 26.2035 8.18841 25.7585 8.74341 25.7585ZM16.7434 25.7585H20.7434C21.2984 25.7585 21.7434 26.2035 21.7434 26.7585V27.7585H15.7434V26.7585C15.7434 26.2035 16.1884 25.7585 16.7434 25.7585ZM3.74341 29.7585H25.7434C26.2984 29.7585 26.7434 30.2035 26.7434 30.7585V37.7585H25.7434V35.7585H3.74341V37.7585H2.74341V30.7585C2.74341 30.2035 3.18841 29.7585 3.74341 29.7585Z' />
                </mask>
                <path
                  d='M4.74341 18.7585C3.09841 18.7585 1.74341 20.1135 1.74341 21.7585V28.5385C1.13341 29.0905 0.743408 29.8805 0.743408 30.7585V39.7585H5.74341V37.7585H23.7434V39.7585H28.7434V30.7585C28.7434 29.8805 28.3534 29.0905 27.7434 28.5385V21.7585C27.7434 20.1135 26.3884 18.7585 24.7434 18.7585H4.74341ZM4.74341 20.7585H24.7434C25.2984 20.7585 25.7434 21.2035 25.7434 21.7585V27.7585H23.7434V26.7585C23.7434 25.1135 22.3884 23.7585 20.7434 23.7585H16.7434C15.9764 23.7585 15.2764 24.0585 14.7434 24.5385C14.1965 24.0395 13.4837 23.7615 12.7434 23.7585H8.74341C7.09841 23.7585 5.74341 25.1135 5.74341 26.7585V27.7585H3.74341V21.7585C3.74341 21.2035 4.18841 20.7585 4.74341 20.7585ZM8.74341 25.7585H12.7434C13.2984 25.7585 13.7434 26.2035 13.7434 26.7585V27.7585H7.74341V26.7585C7.74341 26.2035 8.18841 25.7585 8.74341 25.7585ZM16.7434 25.7585H20.7434C21.2984 25.7585 21.7434 26.2035 21.7434 26.7585V27.7585H15.7434V26.7585C15.7434 26.2035 16.1884 25.7585 16.7434 25.7585ZM3.74341 29.7585H25.7434C26.2984 29.7585 26.7434 30.2035 26.7434 30.7585V37.7585H25.7434V35.7585H3.74341V37.7585H2.74341V30.7585C2.74341 30.2035 3.18841 29.7585 3.74341 29.7585Z'
                  fill='#1E1E1E'
                />
                <path
                  d='M1.74341 28.5385L7.11122 34.4704L9.74341 32.0885V28.5385H1.74341ZM0.743408 39.7585H-7.25659V47.7585H0.743408V39.7585ZM5.74341 39.7585V47.7585H13.7434V39.7585H5.74341ZM5.74341 37.7585V29.7585H-2.25659V37.7585H5.74341ZM23.7434 37.7585H31.7434V29.7585H23.7434V37.7585ZM23.7434 39.7585H15.7434V47.7585H23.7434V39.7585ZM28.7434 39.7585V47.7585H36.7434V39.7585H28.7434ZM27.7434 28.5385H19.7434V32.0885L22.3756 34.4704L27.7434 28.5385ZM25.7434 27.7585V35.7585H33.7434V27.7585H25.7434ZM23.7434 27.7585H15.7434V35.7585H23.7434V27.7585ZM14.7434 24.5385L9.351 30.448L14.708 35.3363L20.097 30.4832L14.7434 24.5385ZM12.7434 23.7585L12.7757 15.7586L12.7595 15.7585H12.7434V23.7585ZM5.74341 27.7585V35.7585H13.7434V27.7585H5.74341ZM3.74341 27.7585H-4.25659V35.7585H3.74341V27.7585ZM13.7434 27.7585V35.7585H21.7434V27.7585H13.7434ZM7.74341 27.7585H-0.256592V35.7585H7.74341V27.7585ZM21.7434 27.7585V35.7585H29.7434V27.7585H21.7434ZM15.7434 27.7585H7.74341V35.7585H15.7434V27.7585ZM26.7434 37.7585V45.7585H34.7434V37.7585H26.7434ZM25.7434 37.7585H17.7434V45.7585H25.7434V37.7585ZM25.7434 35.7585H33.7434V27.7585H25.7434V35.7585ZM3.74341 35.7585V27.7585H-4.25659V35.7585H3.74341ZM3.74341 37.7585V45.7585H11.7434V37.7585H3.74341ZM2.74341 37.7585H-5.25659V45.7585H2.74341V37.7585ZM4.74341 10.7585C-1.31987 10.7585 -6.25659 15.6953 -6.25659 21.7585H9.74341C9.74341 24.5318 7.51669 26.7585 4.74341 26.7585V10.7585ZM-6.25659 21.7585V28.5385H9.74341V21.7585H-6.25659ZM-3.62441 22.6067C-5.77857 24.5561 -7.25659 27.4483 -7.25659 30.7585H8.74341C8.74341 32.3128 8.04539 33.625 7.11122 34.4704L-3.62441 22.6067ZM-7.25659 30.7585V39.7585H8.74341V30.7585H-7.25659ZM0.743408 47.7585H5.74341V31.7585H0.743408V47.7585ZM13.7434 39.7585V37.7585H-2.25659V39.7585H13.7434ZM5.74341 45.7585H23.7434V29.7585H5.74341V45.7585ZM15.7434 37.7585V39.7585H31.7434V37.7585H15.7434ZM23.7434 47.7585H28.7434V31.7585H23.7434V47.7585ZM36.7434 39.7585V30.7585H20.7434V39.7585H36.7434ZM36.7434 30.7585C36.7434 27.4483 35.2654 24.5561 33.1112 22.6067L22.3756 34.4704C21.4414 33.625 20.7434 32.3128 20.7434 30.7585H36.7434ZM35.7434 28.5385V21.7585H19.7434V28.5385H35.7434ZM35.7434 21.7585C35.7434 15.6953 30.8067 10.7585 24.7434 10.7585V26.7585C21.9701 26.7585 19.7434 24.5318 19.7434 21.7585H35.7434ZM24.7434 10.7585H4.74341V26.7585H24.7434V10.7585ZM4.74341 28.7585H24.7434V12.7585H4.74341V28.7585ZM24.7434 28.7585C20.8801 28.7585 17.7434 25.6218 17.7434 21.7585H33.7434C33.7434 16.7853 29.7167 12.7585 24.7434 12.7585V28.7585ZM17.7434 21.7585V27.7585H33.7434V21.7585H17.7434ZM25.7434 19.7585H23.7434V35.7585H25.7434V19.7585ZM31.7434 27.7585V26.7585H15.7434V27.7585H31.7434ZM31.7434 26.7585C31.7434 20.6953 26.8067 15.7585 20.7434 15.7585V31.7585C17.9701 31.7585 15.7434 29.5318 15.7434 26.7585H31.7434ZM20.7434 15.7585H16.7434V31.7585H20.7434V15.7585ZM16.7434 15.7585C13.8428 15.7585 11.2715 16.8993 9.38984 18.5939L20.097 30.4832C19.2813 31.2178 18.11 31.7585 16.7434 31.7585V15.7585ZM20.1358 18.6291C18.1233 16.7926 15.5001 15.7696 12.7757 15.7586L12.7111 31.7585C11.4673 31.7535 10.2698 31.2864 9.351 30.448L20.1358 18.6291ZM12.7434 15.7585H8.74341V31.7585H12.7434V15.7585ZM8.74341 15.7585C2.68013 15.7585 -2.25659 20.6953 -2.25659 26.7585H13.7434C13.7434 29.5318 11.5167 31.7585 8.74341 31.7585V15.7585ZM-2.25659 26.7585V27.7585H13.7434V26.7585H-2.25659ZM5.74341 19.7585H3.74341V35.7585H5.74341V19.7585ZM11.7434 27.7585V21.7585H-4.25659V27.7585H11.7434ZM11.7434 21.7585C11.7434 25.6218 8.60669 28.7585 4.74341 28.7585V12.7585C-0.22987 12.7585 -4.25659 16.7853 -4.25659 21.7585H11.7434ZM8.74341 33.7585H12.7434V17.7585H8.74341V33.7585ZM12.7434 33.7585C8.88013 33.7585 5.74341 30.6218 5.74341 26.7585H21.7434C21.7434 21.7853 17.7167 17.7585 12.7434 17.7585V33.7585ZM5.74341 26.7585V27.7585H21.7434V26.7585H5.74341ZM13.7434 19.7585H7.74341V35.7585H13.7434V19.7585ZM15.7434 27.7585V26.7585H-0.256592V27.7585H15.7434ZM15.7434 26.7585C15.7434 30.6218 12.6067 33.7585 8.74341 33.7585V17.7585C3.77013 17.7585 -0.256592 21.7853 -0.256592 26.7585H15.7434ZM16.7434 33.7585H20.7434V17.7585H16.7434V33.7585ZM20.7434 33.7585C16.8801 33.7585 13.7434 30.6218 13.7434 26.7585H29.7434C29.7434 21.7853 25.7167 17.7585 20.7434 17.7585V33.7585ZM13.7434 26.7585V27.7585H29.7434V26.7585H13.7434ZM21.7434 19.7585H15.7434V35.7585H21.7434V19.7585ZM23.7434 27.7585V26.7585H7.74341V27.7585H23.7434ZM23.7434 26.7585C23.7434 30.6218 20.6067 33.7585 16.7434 33.7585V17.7585C11.7701 17.7585 7.74341 21.7853 7.74341 26.7585H23.7434ZM3.74341 37.7585H25.7434V21.7585H3.74341V37.7585ZM25.7434 37.7585C21.8801 37.7585 18.7434 34.6218 18.7434 30.7585H34.7434C34.7434 25.7853 30.7167 21.7585 25.7434 21.7585V37.7585ZM18.7434 30.7585V37.7585H34.7434V30.7585H18.7434ZM26.7434 29.7585H25.7434V45.7585H26.7434V29.7585ZM33.7434 37.7585V35.7585H17.7434V37.7585H33.7434ZM25.7434 27.7585H3.74341V43.7585H25.7434V27.7585ZM-4.25659 35.7585V37.7585H11.7434V35.7585H-4.25659ZM3.74341 29.7585H2.74341V45.7585H3.74341V29.7585ZM10.7434 37.7585V30.7585H-5.25659V37.7585H10.7434ZM10.7434 30.7585C10.7434 34.6218 7.60669 37.7585 3.74341 37.7585V21.7585C-1.22987 21.7585 -5.25659 25.7853 -5.25659 30.7585H10.7434Z'
                  fill='#1E1E1E'
                  mask='url(#path-1-inside-1_37_802)'
                />
                <mask id='path-3-inside-2_37_802' fill='white'>
                  <path d='M16.7691 0.758545L13.3136 2.97655L13.6639 3.16835L16.7382 1.19497L21.9527 4.14867L18.9617 6.06848L19.1074 6.14823V6.39159L21.4501 4.8878L21.9418 5.16634L19.1074 6.98566V7.40226L21.4043 5.92794L21.9418 6.23249L19.1074 8.05181V8.46841L21.4043 6.99408L21.9418 7.29864L19.1074 9.11795V9.53455L22.6623 7.25272L21.78 6.753L22.6622 6.18665L21.7799 5.68685L22.6622 5.1205L21.8258 4.64669L22.673 4.10279L16.7691 0.758545ZM17.8732 2.34847C17.1255 2.7236 16.1297 2.78707 15.4286 2.50423L14.0579 3.38402L18.5677 5.85278L19.8677 5.01837C19.3556 4.6141 19.3982 4.01089 19.9722 3.53754L17.8732 2.34847ZM13.2324 3.66135L10.7203 5.29939L15.5395 8.07363L15.5868 8.04342C15.6756 7.9862 15.8011 7.90518 15.9508 7.80841C16.25 7.61498 16.646 7.35851 17.0408 7.10265C17.6095 6.73413 17.9025 6.54401 18.175 6.36724L13.2324 3.66135ZM17.3357 3.70293H17.3358C17.4495 3.70362 17.5537 3.72798 17.6315 3.77205C17.6768 3.79769 17.7119 3.82933 17.7349 3.86514C17.7578 3.90096 17.7682 3.94025 17.7653 3.98078C17.7624 4.02131 17.7464 4.06229 17.7181 4.10136C17.6899 4.14044 17.6499 4.17685 17.6006 4.20851C17.5513 4.24018 17.4935 4.26649 17.4306 4.28593C17.3677 4.30537 17.3009 4.31757 17.234 4.32183C17.1671 4.32608 17.1014 4.32231 17.0407 4.31074C16.98 4.29916 16.9254 4.28 16.8801 4.25436C16.7887 4.20257 16.7406 4.12749 16.7464 4.04565C16.7522 3.96381 16.8114 3.88191 16.9111 3.81796C16.9676 3.78164 17.0352 3.75242 17.1088 3.7325C17.1823 3.71259 17.2599 3.70248 17.3357 3.70293ZM9.57363 5.37725L5.82786 7.78151L6.66429 8.25533L5.81702 8.79922L6.69933 9.29898L5.81702 9.86537L6.69933 10.3651L5.81702 10.9315L11.721 14.2758L15.2855 11.9877V11.5712L11.7519 13.8393L6.53742 10.8856L7.044 10.5604L11.721 13.2096L15.2855 10.9216V10.5051L11.7519 12.7732L6.53742 9.81945L7.044 9.49429L11.721 12.1435L15.2855 9.85545V9.43896L11.7519 11.7071L6.53742 8.75334L7.009 8.45057L11.7319 11.1258L15.2855 8.84474V8.66528L15.0907 8.5532L11.7627 10.6893L6.54833 7.73563L9.91582 5.57413L9.5736 5.37715L9.57363 5.37725ZM10.3007 5.79588L8.63332 6.86608C9.14541 7.27028 9.10277 7.87348 8.52878 8.34691L10.6279 9.53597C11.3755 9.16081 12.3712 9.09737 13.0724 9.38018L14.7058 8.3317L10.3007 5.79584L10.3007 5.79588ZM18.4677 6.93982C18.1819 7.12521 17.9298 7.28886 17.3887 7.63947C17.0253 7.87506 16.6618 8.11047 16.2981 8.3457C16.1482 8.44254 16.0225 8.52374 15.9328 8.58138C15.9296 8.58351 15.9283 8.58422 15.9252 8.58625V11.6397L18.4678 9.93082L18.4677 6.93982ZM11.3251 7.561C11.4388 7.56172 11.543 7.5861 11.6208 7.63019C11.7122 7.68199 11.7604 7.75706 11.7546 7.8389C11.7488 7.92074 11.6895 8.00264 11.5899 8.06659C11.4903 8.13052 11.3584 8.17127 11.2233 8.17987C11.0882 8.18846 10.961 8.16421 10.8696 8.11243C10.7781 8.06064 10.73 7.98557 10.7358 7.90373C10.7416 7.82189 10.8009 7.73999 10.9005 7.67604C10.9571 7.63972 11.0246 7.61051 11.0982 7.5906C11.1717 7.57069 11.2493 7.56058 11.3251 7.56104V7.561Z' />
                </mask>
                <path
                  d='M16.7691 0.758545L13.3136 2.97655L13.6639 3.16835L16.7382 1.19497L21.9527 4.14867L18.9617 6.06848L19.1074 6.14823V6.39159L21.4501 4.8878L21.9418 5.16634L19.1074 6.98566V7.40226L21.4043 5.92794L21.9418 6.23249L19.1074 8.05181V8.46841L21.4043 6.99408L21.9418 7.29864L19.1074 9.11795V9.53455L22.6623 7.25272L21.78 6.753L22.6622 6.18665L21.7799 5.68685L22.6622 5.1205L21.8258 4.64669L22.673 4.10279L16.7691 0.758545ZM17.8732 2.34847C17.1255 2.7236 16.1297 2.78707 15.4286 2.50423L14.0579 3.38402L18.5677 5.85278L19.8677 5.01837C19.3556 4.6141 19.3982 4.01089 19.9722 3.53754L17.8732 2.34847ZM13.2324 3.66135L10.7203 5.29939L15.5395 8.07363L15.5868 8.04342C15.6756 7.9862 15.8011 7.90518 15.9508 7.80841C16.25 7.61498 16.646 7.35851 17.0408 7.10265C17.6095 6.73413 17.9025 6.54401 18.175 6.36724L13.2324 3.66135ZM17.3357 3.70293H17.3358C17.4495 3.70362 17.5537 3.72798 17.6315 3.77205C17.6768 3.79769 17.7119 3.82933 17.7349 3.86514C17.7578 3.90096 17.7682 3.94025 17.7653 3.98078C17.7624 4.02131 17.7464 4.06229 17.7181 4.10136C17.6899 4.14044 17.6499 4.17685 17.6006 4.20851C17.5513 4.24018 17.4935 4.26649 17.4306 4.28593C17.3677 4.30537 17.3009 4.31757 17.234 4.32183C17.1671 4.32608 17.1014 4.32231 17.0407 4.31074C16.98 4.29916 16.9254 4.28 16.8801 4.25436C16.7887 4.20257 16.7406 4.12749 16.7464 4.04565C16.7522 3.96381 16.8114 3.88191 16.9111 3.81796C16.9676 3.78164 17.0352 3.75242 17.1088 3.7325C17.1823 3.71259 17.2599 3.70248 17.3357 3.70293ZM9.57363 5.37725L5.82786 7.78151L6.66429 8.25533L5.81702 8.79922L6.69933 9.29898L5.81702 9.86537L6.69933 10.3651L5.81702 10.9315L11.721 14.2758L15.2855 11.9877V11.5712L11.7519 13.8393L6.53742 10.8856L7.044 10.5604L11.721 13.2096L15.2855 10.9216V10.5051L11.7519 12.7732L6.53742 9.81945L7.044 9.49429L11.721 12.1435L15.2855 9.85545V9.43896L11.7519 11.7071L6.53742 8.75334L7.009 8.45057L11.7319 11.1258L15.2855 8.84474V8.66528L15.0907 8.5532L11.7627 10.6893L6.54833 7.73563L9.91582 5.57413L9.5736 5.37715L9.57363 5.37725ZM10.3007 5.79588L8.63332 6.86608C9.14541 7.27028 9.10277 7.87348 8.52878 8.34691L10.6279 9.53597C11.3755 9.16081 12.3712 9.09737 13.0724 9.38018L14.7058 8.3317L10.3007 5.79584L10.3007 5.79588ZM18.4677 6.93982C18.1819 7.12521 17.9298 7.28886 17.3887 7.63947C17.0253 7.87506 16.6618 8.11047 16.2981 8.3457C16.1482 8.44254 16.0225 8.52374 15.9328 8.58138C15.9296 8.58351 15.9283 8.58422 15.9252 8.58625V11.6397L18.4678 9.93082L18.4677 6.93982ZM11.3251 7.561C11.4388 7.56172 11.543 7.5861 11.6208 7.63019C11.7122 7.68199 11.7604 7.75706 11.7546 7.8389C11.7488 7.92074 11.6895 8.00264 11.5899 8.06659C11.4903 8.13052 11.3584 8.17127 11.2233 8.17987C11.0882 8.18846 10.961 8.16421 10.8696 8.11243C10.7781 8.06064 10.73 7.98557 10.7358 7.90373C10.7416 7.82189 10.8009 7.73999 10.9005 7.67604C10.9571 7.63972 11.0246 7.61051 11.0982 7.5906C11.1717 7.57069 11.2493 7.56058 11.3251 7.56104V7.561Z'
                  stroke='#1E1E1E'
                  stroke-width='6.74241'
                  mask='url(#path-3-inside-2_37_802)'
                />
              </svg>

              <h3 className={` font-openSans font-bold text-[0.5rem] pt-1 border-b-2 ${selectedPage === 'sale' ? 'border-black' : 'border-transparent'} md:text-[0.6rem] lg:text-xs`}>Home for sale</h3>
            </section>
          </button>
          <button onClick={() => handlePageChange('rent')}>
            <section className={`flex flex-col items-center ${selectedPage === 'rent' ? 'opacity-100' : 'opacity-50'}`}>
              <svg
                className=' w-5 h-7 lg:w-7 lg:h-10'
                // width="29"
                // height="38"
                viewBox='0 0 29 38'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M4.24341 16.5172C2.59841 16.5172 1.24341 17.8722 1.24341 19.5172V26.2972C0.633408 26.8492 0.243408 27.6392 0.243408 28.5172V37.5172H5.24341V35.5172H23.2434V37.5172H28.2434V28.5172C28.2434 27.6392 27.8534 26.8492 27.2434 26.2972V19.5172C27.2434 17.8722 25.8884 16.5172 24.2434 16.5172H4.24341ZM4.24341 18.5172H24.2434C24.7984 18.5172 25.2434 18.9622 25.2434 19.5172V25.5172H23.2434V24.5172C23.2434 22.8722 21.8884 21.5172 20.2434 21.5172H16.2434C15.4764 21.5172 14.7764 21.8172 14.2434 22.2972C13.6965 21.7982 12.9837 21.5202 12.2434 21.5172H8.24341C6.59841 21.5172 5.24341 22.8722 5.24341 24.5172V25.5172H3.24341V19.5172C3.24341 18.9622 3.68841 18.5172 4.24341 18.5172ZM8.24341 23.5172H12.2434C12.7984 23.5172 13.2434 23.9622 13.2434 24.5172V25.5172H7.24341V24.5172C7.24341 23.9622 7.68841 23.5172 8.24341 23.5172ZM16.2434 23.5172H20.2434C20.7984 23.5172 21.2434 23.9622 21.2434 24.5172V25.5172H15.2434V24.5172C15.2434 23.9622 15.6884 23.5172 16.2434 23.5172ZM3.24341 27.5172H25.2434C25.7984 27.5172 26.2434 27.9622 26.2434 28.5172V35.5172H25.2434V33.5172H3.24341V35.5172H2.24341V28.5172C2.24341 27.9622 2.68841 27.5172 3.24341 27.5172Z'
                  fill='#1E1E1E'
                />
                <path
                  d='M8.34217 6.05681H10.0278M19.2986 8.58521V6.05681M15.9274 8.58521V6.05681M13.5675 8.58521C13.0109 9.54925 12.1518 10.3027 11.1234 10.7287C10.0949 11.1547 8.95466 11.2294 7.87942 10.9413C6.80417 10.6532 5.85404 10.0183 5.17638 9.1352C4.49872 8.25206 4.13141 7.16998 4.13141 6.05681C4.13141 4.94363 4.49872 3.86156 5.17638 2.97842C5.85404 2.09528 6.80417 1.46042 7.87942 1.17231C8.95466 0.884197 10.0949 0.958934 11.1234 1.38493C12.1518 1.81092 13.0109 2.56437 13.5675 3.52841H21.6803C22.2652 4.35772 23.0541 5.02016 23.9728 5.45336L24.3554 5.63541V6.47821L23.9694 6.66025C23.0519 7.09324 22.2621 7.75642 21.677 8.58521H13.5675Z'
                  stroke='#1E1E1E'
                  stroke-width='1.6856'
                />
              </svg>

              <h3 className={` font-openSans font-bold text-[0.5rem] pt-1 border-b-2 ${selectedPage === 'rent' ? 'border-black' : 'border-transparent'} md:text-[0.6rem] lg:text-xs`}>Home for rent</h3>
            </section>
          </button>
        </div>

        <AppFilter isFilterTextVisible={true} />
      </div>


      <Suspense fallback={<Loading />}>
        {selectedPage === 'sale' && <HomeForSalePage />}
        {selectedPage === 'rent' && <HomeForRentPage />}
      </Suspense>



      <section className='pb-8 pt-8 px-3 md:px-8 lg:px-14 md:pb-12 md:pt-12 lg:pb-[4.625rem] lg:pt-[4.625rem] lg:flex lg:justify-center lg:items-center'>
          {/* <img src='/sunbeltBonaireImage.png' alt='' className=' w-full lg:w-1/2 lg:rounded-2xl lg:shadow-md' /> */}
          
          <div className='px-4 py-8 lg:px-16 lg:w-1/2 lg:h-[526px] lg:rounded-r-2xl lg:flex lg:flex-col lg:justify-center lg:text-start'>
            <h3 className=' font-openSans font-extrabold pb-[2px] text-base px-1 text-[#263238] lg:text-[2rem] lg:pb-[4px]'>Sunlit Caribbean Estates</h3>
            <h3 className=' font-openSans font-semibold pb-3 text-xs px-1 text-[#1E1E1EE5] lg:text-base lg:pb-6'>Let Sunlit Estates Market Your Dream Home ...</h3>
            <h4 className=' font-openSans font-normal text-sm px-1 pb-3 text-[#263238] lg:text-lg lg:pb-6'>
            <b>Thinking of selling your Caribbean paradise?</b> Sunlit  Estates can help! We take the stress out of selling your dream home,  connecting you with qualified buyers and maximizing exposure through targeted marketing.
            </h4>
            <button className='btn bg-[#F6812D] rounded-none border-none text-white font-openSans font-semibold shadow-none w-full hover:bg-[#06384A] lg:text-[1.125rem] lg:w-[254px] lg:h-[58px] lg:rounded-lg'>
            <FiPlus /> Add Listing
            </button>
          </div>
          <div className='relative lg:w-1/2'>
            <img src='/sunbeltBonaireImage.png' alt='' className='w-full lg:rounded-r-2xl lg:h-[526px]' />
          </div>
        </section>
    </div>
  )
}

export default Page
