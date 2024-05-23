import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='pt-4 max-w-fit mx-auto flex items-center'>
      <SignIn />
      {/* <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" /> */}
    </div>
  )
}
