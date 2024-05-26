// import ListingsBoard from '@/components/listing/listings-board'
// import SearchBar from '@/components/search-bar/search-bar'

// type Props = {
//   searchParams: { [key: string]: string | string[] | undefined }
//   params: { query: string }
// }
// const Page = async ({ params, searchParams }: Props) => {
//   return (
//     <div className="">
//       <div className='prose mt-2 pl-2'>
//         <h2>Search result for &apos;{params.query ? params.query : searchParams.query ? searchParams.query : ''}&apos;</h2>
//       </div>
//       <SearchBar>
//         {/* <ListingsBoard type='all' page={`/search/${params.query}`} searchParams={{ ...searchParams, ...params }} /> */}
//         <h1>Replaced ListingBoard here, fix when adding backend</h1>
//       </SearchBar>
//     </div>
//   )
// }

// export default Page


import ListingsBoard from '@/components/listing/listings-board'
import SearchBar from '@/components/search-bar/search-bar'
import SearchPage from './[query]/page'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
  params: { query: string }
}

const Page = async ({ params, searchParams }: Props) => {
  // const query = params.query || searchParams.query || '';

  return (
    // <div className="">
    //   <div className='prose mt-2 pl-2'>
    //     <h2>Search result for &apos;{query}&apos;</h2>
    //   </div>
    //   <SearchBar>
    //     {/* <ListingsBoard type='all' page={`/search/${query}`} searchParams={{ ...searchParams, ...params }} /> */}
    //     <h1>Replaced ListingBoard here, fix when adding backend</h1>
    //   </SearchBar>
    // </div>
    <SearchPage params={params} searchParams={searchParams} />
  )
}

export default Page;
