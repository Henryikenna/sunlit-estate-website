import Link from 'next/link'

export type Realtor = {
  id: number
  name: string
  website: string
  description: string
  // Add more properties as needed
}

type Props = {
  realtors: Realtor[]
}

type RealtorDetailsProps = {
  realtor: Realtor
}

const Realtors = ({ realtors }: Props) => {
  return (
    <div className='pt-4'>
      <h1 className='text-3xl font-bold mb-8 ml-5'>Realtors We Work With</h1>
      <ul>
        {realtors.map((realtor) => (
          <li key={realtor.id}>
            <RealtorDetails realtor={realtor} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export const RealtorDetails = ({ realtor }: RealtorDetailsProps) => {
  return (
    <div className='mockup-browser border bg-base-300 m-4'>
      <div className='mockup-browser-toolbar'>
        <Link href={realtor.website} className='input link'>
          {realtor.website}
        </Link>
      </div>
      <div className='justify-center px-4 py-16 bg-base-200'>
        <h2 className='text-xl font-semibold mb-4'>{realtor.name}</h2>
        <div className='prose lg:prose-xl w-full max-w-none' dangerouslySetInnerHTML={{ __html: realtor.description }} />
      </div>
    </div>
  )
}

export default Realtors
