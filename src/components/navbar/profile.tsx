import { SignedIn, SignedOut, UserButton, useAuth, useUser } from '@clerk/nextjs'
import Link from 'next/link'

type Props = {}

const Profile = async (props: Props) => {
  return (
    <>
      <SignedOut>
        <Link className='btn btn-secondary' href='/sign-in'>
          Login
        </Link>
        <Link className='btn btn-neutral ml-4' href='/sign-up'>
          Signup
        </Link>
      </SignedOut>
      <SignedIn>
        <div>
          <UserButton afterSignOutUrl='/' />
        </div>
      </SignedIn>
    </>
  )

  return <></>
}

export default Profile
