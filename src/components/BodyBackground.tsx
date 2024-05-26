"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

interface BodyBackgroundProps {
  isSearchInputVisible: boolean
}

const BodyBackground: React.FC<BodyBackgroundProps> = ({ isSearchInputVisible }) => {
  const router = useRouter();

  // const handleNavigate = () => {
  //   router.push('/search');
  // };

  // const handleNavigate = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault(); // Prevent the default form submission
  //   const form = event.currentTarget;
  //   const query = (form.elements.namedItem('query') as HTMLInputElement).value; // Capture the input value
  //   router.push(`/search/${query}`); // Navigate to the search page with the query
  // };
  
  const handleNavigate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission
    const form = event.currentTarget;
    const query = (form.elements.namedItem('query') as HTMLInputElement).value; // Capture the input value
    router.push(`/search/${query}`); // Navigate to the search page with the query
  };

  return (
    <div className=' w-full h-[65dvh] lg:h-[80dvh]'>
      <div className=' w-full h-full relative'>
        <Image src='/background.png' alt='Background Image' className='min-w-full min-h-full object-cover absolute brightness-75 -z-10' layout='fill' />

        <section className='relative flex flex-col justify-center items-center h-full text-center px-4 gap-[4.5rem] lg:px-0'>
          <div className=''>
            <h1 className=' font-racingSansOne text-white text-[2rem] md:text-[3rem] lg:text-[4rem]'>Sunlit Caribbean Estates</h1>
            <h3 className=' font-openSans text-white font-semibold text-base md:text-xl lg:text-2xl'>Find your dream home on the ABC Islands</h3>
          </div>

          {isSearchInputVisible === true ? (
            <form onSubmit={handleNavigate} className='input input-bordered flex items-center w-full h-12 rounded-full gap-2 md:w-1/2 md:h-[3.9rem] lg:w-1/3 lg:h-[4.375rem]'>
              <input
                type='search'
                name='query'
                id='default-search'
                className='grow px-3 placeholder:text-[#7A848C] placeholder:text-sm placeholder:lg:text-base lg:px-5'
                placeholder='Search Listing...'
                required
              />
              <button type='submit' className=''>
                <svg
                  className=' w-[1.9375rem] h-[1.9375rem] md:w-[2.1rem] md:h-[2.1rem] lg:w-[2.375rem] lg:h-[2.375rem]'
                  // width="38"
                  // height="38"
                  viewBox='0 0 38 38'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle cx='19.25' cy='18.75' r='18.75' fill='#06384A' />
                  <path
                    d='M24.375 23.875L27.5833 27.0834M26.6573 18.3136C26.6573 22.675 23.1333 26.2104 18.7875 26.2104C14.4406 26.2104 10.9166 22.675 10.9166 18.3146C10.9166 13.9511 14.4406 10.4167 18.7864 10.4167C23.1333 10.4167 26.6573 13.9521 26.6573 18.3136Z'
                    stroke='white'
                    stroke-width='1.5625'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
              </button>
            </form>
          ) : (
            <></>
          )}
        </section>
      </div>
    </div>
  )
}

export default BodyBackground
