import MyListingsPage from '../../page'

type Props = {
  searchParams?: { page?: string; query?: string }
  params: { page: string }
}

const Page = (props: Props) => {
  return <MyListingsPage {...props} />
}

export default Page
