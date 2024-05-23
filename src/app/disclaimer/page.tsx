import React from 'react'

type Props = {}

const Page = (props: Props) => {
  return (
    <div className='hero min-h-screen' style={{ backgroundImage: 'url(/background.png)' }}>
      <div className='hero-overlay bg-opacity-60'></div>
      <div className='hero-content text-center text-neutral-content'>
        <div className='max-w-md prose text-white'>
          <h1 className='text-white'>Disclaimer:</h1>

          <p>
            The property listings featured on this website have been obtained from various real estate platforms in the Caribbean region. We present this information with the intention of providing a
            comprehensive overview of available properties.
          </p>

          <p>
            We strive to offer accurate and up-to-date information; however, we do not guarantee the completeness or accuracy of the listings. Property details, prices, and availability may change
            without prior notice.
          </p>

          <p>
            It is important to note that we do not own or control the content provided by the individual real estate agents or agencies. The listings are displayed for informational purposes only.
          </p>

          <p>
            If you have any concerns or find discrepancies in the information presented, please&nbsp;
            <a className='text-white' href='mailto:info@sunlitcaribbeanestates.com'>
              contact us
            </a>
            . We appreciate your feedback and will make every effort to address any issues promptly.
          </p>

          <p>
            We are not responsible for any transactions, negotiations, or agreements between users and real estate agents or agencies. Users are encouraged to verify property details directly with the
            respective agents or agencies.
          </p>

          <p>Thank you for using our platform. Your satisfaction is important to us, and we are here to assist you.</p>
        </div>
      </div>
    </div>
  )
}

export default Page
