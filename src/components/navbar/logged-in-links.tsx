import { SignedIn } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'

type Props = {}

const LoggedInLinks = async (props: Props) => {
  const user = await useUser()
  let isAdmin = false
  if (user && user.user?.publicMetadata.role == 'ADMIN') isAdmin = true

  return (
    <SignedIn>
      {isAdmin && (
        <>
          <div className='dropdown dropdown-end'>
            <div tabIndex={0} role='button' className='btn btn-ghost btn-circle'>
              <div className='indicator'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
                  />
                </svg>
              </div>
            </div>
            <div tabIndex={0} className='mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow'>
              <div className='card-body'>
                <div className='card-actions'>
                  <Link
                    className='btn mr-5 btn-outline btn-sm placeholder-primary-content text-primary-content focus:text-primary-content input-bordered focus:bg-transparent w-full'
                    href='/admin/listings'
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                      />
                    </svg>
                    My properties
                  </Link>
                  <Link
                    className='btn mr-5 btn-outline btn-sm placeholder-primary-content text-primary-content focus:text-primary-content input-bordered focus:bg-transparent w-full'
                    href='/admin/add'
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4.5v15m7.5-7.5h-15' />
                    </svg>
                    Add Listing
                  </Link>
                  <Link
                    className='btn mr-5 btn-outline btn-sm placeholder-primary-content text-primary-content focus:text-primary-content input-bordered focus:bg-transparent w-full'
                    href='/admin/scraped'
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m7.848 8.25 1.536.887M7.848 8.25a3 3 0 1 1-5.196-3 3 3 0 0 1 5.196 3Zm1.536.887a2.165 2.165 0 0 1 1.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 1 1-5.196 3 3 3 0 0 1 5.196-3Zm1.536-.887a2.165 2.165 0 0 0 1.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863 2.077-1.199m0-3.328a4.323 4.323 0 0 1 2.068-1.379l5.325-1.628a4.5 4.5 0 0 1 2.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.33 4.33 0 0 0 10.607 12m3.736 0 7.794 4.5-.802.215a4.5 4.5 0 0 1-2.48-.043l-5.326-1.629a4.324 4.324 0 0 1-2.068-1.379M14.343 12l-2.882 1.664'
                      />
                    </svg>
                    Scraped Listings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {!isAdmin && (
        <ul className='menu menu-horizontal px-1 mr-5'>
          <li>
            <Link
              className='btn mr-5 btn-outline btn-link btn-sm placeholder-primary-content text-primary-content focus:text-primary-content input-bordered focus:bg-transparent'
              href='/admin/listings'
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                />
              </svg>
              My properties
            </Link>
          </li>
          <li>
            <Link className='btn btn-neutral btn-sm' href='/admin/add'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4.5v15m7.5-7.5h-15' />
              </svg>
              Add Listing
            </Link>
          </li>
        </ul>
      )}
    </SignedIn>
  )
}

export default LoggedInLinks
