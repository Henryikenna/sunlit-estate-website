// pages/search/[query].tsx

import { useRouter } from 'next/navigation';
import ListingsBoard from '@/components/listing/listings-board';
import SearchBar from '@/components/search-bar/search-bar';
import BodyBackground from '@/components/BodyBackground';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
  params: { query: string }
}

const SearchPage = ({ params, searchParams }: Props) => {
  // const router = useRouter();
  // const { query } = router;

  const query = params.query || searchParams.query || '';

  return (
    <>
    <BodyBackground isSearchInputVisible={false} />
      <div className="prose mt-5 pl-5">
        <h2>Search result for &apos;{query}&apos;</h2>
      </div>
      <SearchBar>
        {/* <ListingsBoard type='all' page={`/search/${query}`} searchParams={{ ...searchParams, ...params }} /> */}
        <h1>Searched for: {query}</h1>
        <h3>Replaced ListingBoard here, fix when adding backend</h3>
      </SearchBar>
    </>
  );
};

export default SearchPage;
