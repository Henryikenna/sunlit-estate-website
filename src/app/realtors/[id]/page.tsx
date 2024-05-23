import { realtors } from '../realtor.data'
import { RealtorDetails } from '../realtors'

type Props = {
  params: { id: number }
}

const Page = ({ params }: Props) => {
  const realtor = realtors.find((r) => r.id === params.id)
  if (!realtor) return
  return (
    <div>
      <RealtorDetails realtor={realtor} />
    </div>
  )
}

export default Page
