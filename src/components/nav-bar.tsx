'use client'
import { useUser } from '@clerk/nextjs'
import Profile from './navbar/profile'
import Link from 'next/link'
import LoggedInLinks from './navbar/logged-in-links'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FiPlus } from 'react-icons/fi'
import { useState } from 'react'
import CreateListingDialog from '@/components/CreateListingDialog'

type Props = {}

interface NavBarProps {
  doesNavbarHaveBackgroundColor: boolean
  // isUserSignedIn: boolean
}

const NavBar: React.FC<NavBarProps> = ({ doesNavbarHaveBackgroundColor }) => {
  const route = usePathname()
  const [isToggleChecked, setIsToggleChecked] = useState(false)

  const getLinkClass = (path: string) => (route === path ? 'font-openSans font-extrabold text-white text-base md:text-sm' : 'font-openSans font-semibold text-white opacity-80 text-base md:text-sm')
  const getLinkClassPotrait = (path: string) =>
    route === path ? 'font-openSans font-bold text-white opacity-100 p-2 bg-[#06384A] text-base md:text-sm' : 'font-openSans font-semibold text-black opacity-80 p-2 text-base hover:bg-gray-200 md:text-sm'

  // var isUserSignedIn = false;
  var isUserSignedIn: boolean = isToggleChecked

  const handleToggleChange = () => {
    setIsToggleChecked(!isToggleChecked)
  }

  return (
    // <div className='navbar bg-primary'>
    //   <div className='navbar-start'>
    //     <div className='dropdown'>
    //       <label tabIndex={0} className='btn btn-ghost lg:hidden'>
    //         <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
    //           <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' />
    //         </svg>
    //       </label>
    //       <ul tabIndex={0} className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'>
    //         <li>
    //           <Link href='/buy'>Buy</Link>
    //         </li>
    //         <li>
    //           <Link href='/rent'>Rent</Link>
    //         </li>
    //         <li>
    //           <Link href='/realtors'>Realtors</Link>
    //         </li>
    //         <li>
    //           <Link href='/aboutus'>About us</Link>
    //         </li>
    //       </ul>
    //     </div>
    //     <Image src={'/sunbelt-logo-transparent.png'} alt='Sunbelt logo' width={50} height={50} />
    //     <Link href='/' className='btn btn-ghost hidden md:block'>
    //       Sunlit Caribbean Estates
    //     </Link>
    //   </div>
    //   <div className='navbar-center hidden lg:flex'>
    //     <ul className='menu menu-horizontal menu-md px-1 text-primary-content font-semibold text-lg'>
    //       <li>
    //         <Link href='/buy'>Buy</Link>
    //       </li>
    //       <li>
    //         <Link href='/rent'>Rent</Link>
    //       </li>
    //       <li>
    //         <Link href='/realtors'>Realtors</Link>
    //       </li>
    //       <li>
    //         <Link href='/aboutus'>About us</Link>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className='navbar-end'>
    //     <LoggedInLinks />
    //     <Profile />
    //   </div>
    // </div>

    <header className={` z-20 absolute w-full ${doesNavbarHaveBackgroundColor ? `bg-[#06384A]` : `bg-transparent`} h-[88px] flex justify-between items-center px-6 lg:px-[3.75rem]`}>
      <Link href='/' className='flex items-center gap-2'>
        <div className='relative w-[2.1875rem] h-[2.1875rem] md:w-10 md:h-10 lg:w-[3.4375rem] lg:h-[3.4375rem]'>
          <Image
            src={'/sunbelt-logo-transparent.png'}
            alt='Sunbelt logo'
            // width={55}
            // height={55}
            layout='fill'
            objectFit='cover'
            className=''
          />
        </div>
        <h4 className=' font-oswald font-bold text-white text-[0.545rem] w-[69px] md:text-[0.65rem] md:w-auto lg:text-sm lg:w-[111px]'>Sunlit Carribbean Estates</h4>
      </Link>

      <section className='hidden items-center gap-6 lg:flex'>
        <Link href='/buy' className={getLinkClass('/buy')}>
          {/* <Link href='/'> */}
          Buy
        </Link>
        {/* <Link href='/sell' className={getLinkClass('/sell')}>
          Sell
        </Link> */}
        <Link href='/rent' className={getLinkClass('/rent')}>
          {/* <Link href='/rent'>           */}
          Rent
        </Link>
        <Link href='/realtors' className={getLinkClass('/realtors')}>
          {/* <Link href='/realtors'> */}
          Realtor
        </Link>
        <Link href='/aboutus' className={getLinkClass('/aboutus')}>
          {/* <Link href='/aboutus'> */}
          About Us
        </Link>
      </section>

      <section className='flex items-center'>
        {/* <input type="checkbox" className="toggle toggle-success mr-5" checked /> */}
        <div className='mr-5'>
          <input type='checkbox' className='toggle toggle-success' checked={isToggleChecked} onChange={handleToggleChange} />
          {isUserSignedIn ? <h5 className=' text-xs font-bold text-green-600'>Logged In</h5> : <h5 className=' text-xs font-bold'>Not Logged In</h5>}
        </div>

        {isUserSignedIn ? (
          <section className=' hidden items-center gap-4 lg:flex'>
            {/* <button className='btn bg-white flex text-[#06384A] text-sm font-semibold font-openSans rounded-3xl md:text-base lg:text-base'><FiPlus /> Create Lisiting</button> */}
            {/* <CreateListingDialog /> */}
            <Link href='/create-listing'>
              <button className='btn bg-white flex text-[#06384A] text-sm font-semibold font-openSans rounded-3xl md:text-base lg:text-base'>
                <FiPlus /> Create Lisiting
              </button>
            </Link>
            <img
              className='rounded-full w-7 h-7 object-cover md:w-10 md:h-10 lg:w-14 lg:h-14'
              src='https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8'
              alt=''
            />
            {/* <Image
            src={'https://unsplash.com/photos/a-squirrel-eating-a-nut-in-a-field-of-daisies-igYIeewfnOs'}
            alt='Profile Picture'
            width={55}
            height={55}
            layout='fill'
            objectFit='cover'
            className='rounded-full w-14 h-14'
          /> */}
          </section>
        ) : (
          <section className=' hidden items-center gap-4 lg:flex'>
            <button className='btn bg-white text-[#06384A] w-28 text-base font-semibold font-openSans rounded-3xl md:w-24'>Login</button>
            <button className='btn btn-outline border-2 border-white text-white w-28 text-base font-semibold font-openSans rounded-3xl md:w-24 hover:text-white hover:bg-transparent hover:border-white'>
              Sign up
            </button>
          </section>
        )}
      </section>

      {/* <section className='block md:hidden lg:hidden'>
        <svg width='34' height='20' viewBox='0 0 34 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M1 18.8889H33M1 9.99997H33M1 1.11108H33' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
        </svg>
      </section> */}
      <div className='drawer w-auto block lg:hidden'>
        <input id='my-drawer-4' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content'>
          {/* Page content here */}
          {/* <label htmlFor='my-drawer-4' className='drawer-button btn btn-primary'>
            Open drawer
          </label> */}
          <label htmlFor='my-drawer-4' className='drawer-button'>
            <svg className='w-7 md:w-10' viewBox='0 0 34 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M1 18.8889H33M1 9.99997H33M1 1.11108H33' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
            </svg>
          </label>
        </div>
        <div className='drawer-side'>
          <label htmlFor='my-drawer-4' aria-label='close sidebar' className='drawer-overlay'></label>
          {/* <ul className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
            
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul> */}
          <div className='menu flex flex-col w-[80%] py-4 px-2 min-h-full bg-white'>
            <section className=' flex gap-y-1 flex-col'>
              <Link href='/buy' className={getLinkClassPotrait('/buy')}>
                {/* <Link href='/'> */}
                Buy
              </Link>
              {/* <Link href='/sell' className={getLinkClass('/sell')}>
          Sell
        </Link> */}
              <Link href='/rent' className={getLinkClassPotrait('/rent')}>
                {/* <Link href='/rent'>           */}
                Rent
              </Link>
              <Link href='/realtors' className={getLinkClassPotrait('/realtors')}>
                {/* <Link href='/realtors'> */}
                Realtor
              </Link>
              <Link href='/aboutus' className={getLinkClassPotrait('/aboutus')}>
                {/* <Link href='/aboutus'> */}
                About Us
              </Link>
            </section>

            <section className='mt-10'>
              {isUserSignedIn ? (
                <section className=' items-center justify-between flex'>
                  {/* <button className='btn bg-white flex text-[#06384A] text-sm font-semibold font-openSans rounded-3xl md:text-base lg:text-base'><FiPlus /> Create Lisiting</button> */}
                  {/* <CreateListingDialog /> */}
                  <Link href='/create-listing'>
                    <button className='btn bg-white flex text-[#06384A] text-sm font-semibold font-openSans rounded-3xl md:text-base lg:text-base'>
                      <FiPlus /> Create Lisiting
                    </button>
                  </Link>
                  <img
                    className='rounded-full w-11 h-11 object-cover md:w-10 md:h-10 lg:w-14 lg:h-14'
                    src='https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8'
                    alt=''
                  />
                  {/* <Image
            src={'https://unsplash.com/photos/a-squirrel-eating-a-nut-in-a-field-of-daisies-igYIeewfnOs'}
            alt='Profile Picture'
            width={55}
            height={55}
            layout='fill'
            objectFit='cover'
            className='rounded-full w-14 h-14'
          /> */}
                </section>
              ) : (
                <section className=' items-center flex-col gap-4 flex'>
                  <button className='btn bg-white w-full text-[#06384A] text-base font-semibold font-openSans rounded-3xl'>Login</button>
                  <button className='btn btn-outline w-full border-2 border-[#06384A] text-[#06384A] text-base font-semibold font-openSans rounded-3xl'>
                    Sign up
                  </button>
                </section>
              )}
            </section>
          </div>
        </div>
      </div>
    </header>
  )
}

/*
if you want a submenu 
            <details>
              <summary>Rent</summary>
              <ul className='p-2'>
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>*/

export default NavBar
