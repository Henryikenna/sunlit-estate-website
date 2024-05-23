import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='py-4 max-w-fit mx-auto flex items-center'>
      <SignUp />
      {/* <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" /> */}
    </div>
  )
}
