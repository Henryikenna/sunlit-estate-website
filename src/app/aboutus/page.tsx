import React from 'react'

type Props = {}

const Page = (props: Props) => {
  return (
    <div className='hero min-h-screen' style={{ backgroundImage: 'url(/background.png)' }}>
      <div className='hero-overlay bg-opacity-60'></div>
      <div className='hero-content text-center text-neutral-content'>
        <div className='max-w-md prose text-white'>
          <header>
            <h1 className='text-white'>About Us</h1>
            <h2 className='text-white'>Sunlit Caribbean Estates</h2>
          </header>

          <section>
            <p>
              Welcome to Sunlit Caribbean Estates, your premier destination for real estate comparisons in the Caribbean. We specialize in categorizing properties into three main segments: vacant
              lots, entire homes, and rental properties. Our platform is designed to be user-friendly, providing a comprehensive overview of listings available across the Caribbean region.
            </p>
          </section>

          <section>
            <h2 className='text-white'>Our Focus:</h2>
            <p>
              At Sunlit Caribbean Estates, we aim to be the go-to platform for individuals and investors seeking a seamless and efficient way to explore and compare real estate options tailored to
              their specific needs.
            </p>
          </section>

          <section>
            <h2 className='text-white'>Website Development:</h2>
            <p>
              With utmost care and attention to detail, Sunlit Caribbean Estates is meticulously designed to simplify your real estate search. Our well-organized and easily accessible interface
              empowers users with the information they need to make informed decisions about their property investments.
            </p>
          </section>

          <section>
            <h2 className='text-white'>Open to Feedback:</h2>
            <p>
              We value the opinions of our users and the real estate professionals who contribute to our platform. Your feedback is crucial in helping us enhance our services and create a
              collaborative community focused on the growth and success of Sunlit Caribbean Estates.
            </p>
          </section>

          <section>
            <h2 className='text-white'>Connect with Us:</h2>
            <p>Feel free to reach out to us with any suggestions, comments, or inquiries. Thank you for choosing Sunlit Caribbean Estates for your Caribbean real estate needs. Happy exploring!</p>
          </section>

          <button className='btn btn-primary'>Explore our listings!</button>
        </div>
      </div>
    </div>
  )
}

export default Page
