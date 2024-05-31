'use client'
import { useUser } from '@clerk/nextjs'
import Profile from './navbar/profile'
import Link from 'next/link'
import LoggedInLinks from './navbar/logged-in-links'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

type Props = {}

interface NavBarProps {
  doesNavbarHaveBackgroundColor: boolean
}

const NavBar: React.FC<NavBarProps> = ({ doesNavbarHaveBackgroundColor }) => {
  const route = usePathname()

  const getLinkClass = (path: string) => (route === path ? 'font-openSans font-extrabold text-white text-base md:text-sm' : 'font-openSans font-semibold text-white opacity-80 text-base md:text-sm')

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

      <section className='hidden items-center gap-6 md:flex lg:flex'>
        <Link href='/buy' className={getLinkClass('/buy')}>
          {/* <Link href='/'> */}
          Buy
        </Link>
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

      <section className=' hidden items-center gap-4 md:flex lg:flex'>
        <button className='btn bg-white text-[#06384A] w-28 text-base font-semibold font-openSans rounded-3xl md:w-24'>Login</button>
        <button className='btn btn-outline border-2 border-white text-white w-28 text-base font-semibold font-openSans rounded-3xl md:w-24 hover:text-white hover:bg-transparent hover:border-white'>
          Sign up
        </button>
      </section>

      <section className='block md:hidden lg:hidden'>
        <svg width='34' height='20' viewBox='0 0 34 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M1 18.8889H33M1 9.99997H33M1 1.11108H33' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
        </svg>
      </section>
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
