import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { FiPlus } from 'react-icons/fi'

const filterButtonsTextList = ['Any', '1', '2', '3', '4', '5', '6', '7', '8+']
const areaTextList = ['Hato', 'Nikiboko', 'locate various', 'Noord Saliña', 'Belnem', 'Sabal Palm', 'Santa Barbara', 'Suikerpalm']
const houseVarietiesList = ['Pool', 'Parking', 'Garden', 'Balcony']

const CreateListingDialog = () => {
  const [selectedButton, setSelectedButton] = useState<number | null>(0)

  const openModal = () => {
    const modal = document.getElementById('create_listing_modal') as HTMLDialogElement | null
    if (modal) {
      modal.showModal()
    } else {
      console.error('Modal not found')
    }
  }

  const buttons = Array.from({ length: filterButtonsTextList.length }, (_, i) => i)
  const areas = Array.from({ length: areaTextList.length }, (_, i) => i)
  const houseVarieties = Array.from({ length: houseVarietiesList.length }, (_, i) => i)

  return (
    <section className=''>
      <button onClick={openModal} className='btn bg-white flex text-[#06384A] text-sm font-semibold font-openSans rounded-3xl md:text-base lg:text-base'>
        <FiPlus /> Create Lisiting
      </button>

      <dialog id='create_listing_modal' className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box px-0 py-5'>
          <section className='flex items-center px-5 pb-5'>
            <div className='modal-action m-0 flex-1 justify-start'>
              <form method='dialog'>
                {/* if there is a button in form, it will close the modal */}
                <button className='btn btn-outline border-[#7A848C4D] rounded-full text-[#1E1E1ECC] text-sm hover:bg-transparent hover:text-[#1E1E1ECC] hover:border-[#1E1E1ECC]'>
                  <IoClose className='text-base text-[#1E1E1ECC]' /> Close
                </button>
              </form>
            </div>

            <h3 className=' flex-1 text-center font-openSans font-bold text-base'>Create Listing</h3>

            <div className=' flex-1'></div>
          </section>
          <hr className=' border-[#1E1E1E40] w-full' />
          <section className=' px-5 pt-4 flex flex-col gap-6'>
            <div className=''>
              <section className='flex items-center gap-5 pb-5 w-full'>
                <div className='w-1/2'>
                  <h1 className=' font-openSans font-bold text-base pb-2'>Property Type</h1>
                  <label className='input input-bordered flex items-center gap-2'>
                    <input type='text' className='grow' placeholder='Enter Property type' />
                    <svg width='20' height='11' viewBox='0 0 20 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M0.966973 0.0161133C0.77568 0.0162815 0.588726 0.0731349 0.429725 0.179492C0.270723 0.28585 0.146806 0.43694 0.0736239 0.613682C0.000441756 0.790424 -0.0187229 0.984889 0.0185504 1.17252C0.0558238 1.36014 0.147863 1.53252 0.283044 1.66787L9.31607 10.7009C9.49754 10.8821 9.74353 10.9839 10 10.9839C10.2565 10.9839 10.5025 10.8821 10.6839 10.7009L19.717 1.66787C19.8521 1.53252 19.9442 1.36014 19.9814 1.17252C20.0187 0.984889 19.9996 0.790424 19.9264 0.613682C19.8532 0.43694 19.7293 0.28585 19.5703 0.179492C19.4113 0.0731349 19.2243 0.0162815 19.033 0.0161133H0.966973Z'
                        fill='#1E1E1E'
                        fill-opacity='0.8'
                      />
                    </svg>
                  </label>
                </div>

                <div className='w-1/2'>
                  <h1 className=' font-openSans font-bold text-base pb-2'>Property Name</h1>
                  <label className='input input-bordered flex items-center gap-2'>
                    <input type='text' className='grow' placeholder='Enter Property name' />
                  </label>
                </div>
              </section>

              <section className='flex items-center gap-5 w-full'>
                <div className='w-1/2'>
                  <h1 className=' font-openSans font-bold text-base pb-2'>Address</h1>
                  <label className='input input-bordered flex items-center gap-2'>
                    <input type='text' className='grow' placeholder='Enter Property Address' />
                    <svg width='20' height='11' viewBox='0 0 20 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M0.966973 0.0161133C0.77568 0.0162815 0.588726 0.0731349 0.429725 0.179492C0.270723 0.28585 0.146806 0.43694 0.0736239 0.613682C0.000441756 0.790424 -0.0187229 0.984889 0.0185504 1.17252C0.0558238 1.36014 0.147863 1.53252 0.283044 1.66787L9.31607 10.7009C9.49754 10.8821 9.74353 10.9839 10 10.9839C10.2565 10.9839 10.5025 10.8821 10.6839 10.7009L19.717 1.66787C19.8521 1.53252 19.9442 1.36014 19.9814 1.17252C20.0187 0.984889 19.9996 0.790424 19.9264 0.613682C19.8532 0.43694 19.7293 0.28585 19.5703 0.179492C19.4113 0.0731349 19.2243 0.0162815 19.033 0.0161133H0.966973Z'
                        fill='#1E1E1E'
                        fill-opacity='0.8'
                      />
                    </svg>
                  </label>
                </div>

                <div className='w-1/2'>
                  <h1 className=' font-openSans font-bold text-base pb-2'>Property URL</h1>
                  <label className='input input-bordered flex items-center gap-2'>
                    <input type='text' className='grow' placeholder='Enter Property URL' />
                  </label>
                </div>
              </section>
            </div>

            <div className=''>
              <h1 className=' font-openSans font-bold text-lg pb-2'>Area</h1>
              <h3 className=' font-openSans text-sm'>Locate various regions</h3>

              <section className=' pt-8 grid grid-cols-2 gap-2'>
                {areas.map((index) => (
                  <span key={index} className=' flex items-center gap-2'>
                    <input type='checkbox' className='checkbox' />
                    {areaTextList[index]}
                  </span>
                ))}
              </section>
            </div>

            <div className=''>
              <h1 className=' font-openSans font-bold text-lg pb-2'>Beds and Bathroooms</h1>
              <h3 className=' font-openSans text-sm'>Beds</h3>

              <section className='flex flex-wrap w-full gap-2 py-8'>
                {buttons.map((button) => (
                  <button
                    key={`Button${button}`}
                    className={`btn rounded-full min-w-20 font-openSans text-xs font-semibold ${
                      selectedButton === button ? 'btn-primary bg-[#06384A] border-none text-white hover:bg-[#06384A]' : 'btn-outline text-[#1E1E1ECC] hover:bg-transparent hover:text-[#1E1E1ECC]'
                    }`}
                    onClick={() => setSelectedButton(button)}
                  >
                    {filterButtonsTextList[button]}
                  </button>
                ))}
              </section>

              <h3 className=' font-openSans text-sm'>Bathrooms</h3>

              <section className='flex flex-wrap w-full gap-2 pt-8'>
                {buttons.map((button) => (
                  <button
                    key={`Button${button}`}
                    className={`btn rounded-full min-w-20 font-openSans text-xs font-semibold ${
                      selectedButton === button ? 'btn-primary bg-[#06384A] border-none text-white hover:bg-[#06384A]' : 'btn-outline text-[#1E1E1ECC] hover:bg-transparent hover:text-[#1E1E1ECC]'
                    }`}
                    onClick={() => setSelectedButton(button)}
                  >
                    {filterButtonsTextList[button]}
                  </button>
                ))}
              </section>
            </div>

            <div className=''>
              <h1 className=' font-openSans font-bold text-lg pb-2'>House Varieties</h1>
              <h3 className=' font-openSans text-sm'>Select various House Varieties</h3>

              <section className=' pt-8 grid grid-rows-4 gap-2'>
                {houseVarieties.map((index) => (
                  <span key={index} className=' flex items-center gap-2'>
                    <input type='checkbox' className='checkbox' />
                    {houseVarietiesList[index]}
                  </span>
                ))}
              </section>
            </div>

            <div className=''>
              <h1 className=' font-openSans font-bold text-lg pb-2'>Description</h1>
              <h3 className=' font-openSans text-sm'>Description about your house</h3>

              <section className=' pt-8'>
              {/* <input type="text" placeholder="Enter Description" className="input input-bordered w-full max-w-xs" /> */}
              <textarea placeholder="Enter Description" className="input input-bordered w-full py-3" rows={8}></textarea>
              </section>
            </div>

            {/* <div className=''>
              <h1 className=' font-openSans font-bold text-lg pb-2'>Property Type</h1>
              <h3 className=' font-openSans text-sm'>Select the kind of property</h3>

              <section className=' pt-8 flex justify-center items-center gap-5 w-full'>
                <button className='btn btn-outline flex-1 h-auto border-[1.5px] border-[#7F7C7C] text-[#1E1E1ECC] text-sm hover:bg-transparent hover:text-[#1E1E1ECC] hover:border-[#1E1E1ECC]'>
                  <span className=' flex flex-col items-center gap-3 py-3'>
                    <svg className=' w-12 h-12' width='61' height='55' viewBox='0 0 61 55' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        opacity='0.6'
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M48.2684 25.2663H11.7783V48.0726C11.7783 48.6774 12.0186 49.2575 12.4463 49.6852C12.874 50.1129 13.4541 50.3532 14.059 50.3532H45.9878C46.5927 50.3532 47.1727 50.1129 47.6004 49.6852C48.0281 49.2575 48.2684 48.6774 48.2684 48.0726V25.2663ZM52.8297 25.2663V50.3532C52.8297 51.5629 52.3491 52.7231 51.4937 53.5785C50.6383 54.4339 49.4781 54.9145 48.2684 54.9145H11.7783C10.5686 54.9145 9.40843 54.4339 8.55303 53.5785C7.69762 52.7231 7.21706 51.5629 7.21706 50.3532V25.2663H2.78124C2.3004 25.2664 1.83182 25.1145 1.44245 24.8324C1.05308 24.5502 0.762851 24.1523 0.613226 23.6953C0.463601 23.2383 0.462237 22.7458 0.60933 22.288C0.756423 21.8302 1.04445 21.4306 1.43224 21.1463L28.6972 1.152C29.0835 0.868823 29.5491 0.714445 30.028 0.710761C30.507 0.707077 30.9749 0.854274 31.3655 1.13148L45.9878 11.5083V9.30184C45.9878 8.69698 46.2281 8.11689 46.6558 7.68919C47.0835 7.26149 47.6636 7.02121 48.2684 7.02121H50.5491C51.1539 7.02121 51.734 7.26149 52.1617 7.68919C52.5894 8.11689 52.8297 8.69698 52.8297 9.30184V16.365L59.5393 21.1258C59.9339 21.4058 60.2292 21.804 60.3825 22.2629C60.5358 22.7218 60.5392 23.2176 60.3922 23.6786C60.2452 24.1395 59.9554 24.5418 59.5647 24.8272C59.174 25.1126 58.7027 25.2664 58.2188 25.2663H52.8297ZM36.8653 29.8275H45.9878V48.0726H36.8653V29.8275ZM48.2684 20.705V25.2663H11.7783V20.705L28.7405 6.77604C29.1268 6.49286 29.5924 6.33848 30.0714 6.3348C30.5503 6.33111 31.0183 6.47831 31.4089 6.75551L48.2684 20.705Z'
                        fill='black'
                      />
                    </svg>

                    <h5 className=' text-sm text-[#1E1E1E] opacity-60 font-normal font-openSans'>House</h5>
                  </span>
                </button>
                
                <button className='btn btn-outline flex-1 h-auto border-[1.5px] border-[#7F7C7C] text-[#1E1E1ECC] text-sm hover:bg-transparent hover:text-[#1E1E1ECC] hover:border-[#1E1E1ECC]'>
                  <span className=' flex flex-col items-center gap-3 py-3'>
                    <svg className=' w-12 h-12' width='65' height='65' viewBox='0 0 65 65' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <g opacity='0.6'>
                        <path d='M32.4995 20.8239L50.487 11.8302L32.4995 2.83643V32.8156' stroke='black' stroke-width='3.81709' stroke-linecap='round' stroke-linejoin='round' />
                        <path
                          d='M20.5083 32.7859L4.01979 42.1993C3.55842 42.4608 3.17466 42.84 2.90766 43.2982C2.64067 43.7564 2.5 44.2772 2.5 44.8075C2.5 45.3379 2.64067 45.8587 2.90766 46.3169C3.17466 46.7751 3.55842 47.1543 4.01979 47.4157L29.5021 61.9856C30.4136 62.5118 31.4475 62.7889 32.5 62.7889C33.5525 62.7889 34.5864 62.5118 35.4979 61.9856L60.9802 47.4157C61.4416 47.1543 61.8253 46.7751 62.0923 46.3169C62.3593 45.8587 62.5 45.3379 62.5 44.8075C62.5 44.2772 62.3593 43.7564 62.0923 43.2982C61.8253 42.84 61.4416 42.4608 60.9802 42.1993L44.4917 32.8159M15.9815 35.3641L49.0185 54.251M49.0185 35.3641L16.0115 54.251'
                          stroke='black'
                          stroke-width='3.81709'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                      </g>
                    </svg>

                    <h5 className=' text-sm text-[#1E1E1E] opacity-60 font-normal font-openSans'>Land</h5>
                  </span>
                </button>
                
                <button className='btn btn-outline flex-1 h-auto border-[1.5px] border-[#7F7C7C] text-[#1E1E1ECC] text-sm hover:bg-transparent hover:text-[#1E1E1ECC] hover:border-[#1E1E1ECC]'>
                  <span className=' flex flex-col items-center gap-3 py-3'>
                    <svg className=' w-12 h-12' width='61' height='49' viewBox='0 0 61 49' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        opacity='0.6'
                        d='M58.5 44.8125H56.5V10.8125C56.5 10.2821 56.2893 9.77336 55.9142 9.39829C55.5391 9.02321 55.0304 8.8125 54.5 8.8125H44.5V2.8125C44.5 2.28207 44.2893 1.77336 43.9142 1.39829C43.5391 1.02321 43.0304 0.8125 42.5 0.8125H18.5C17.9696 0.8125 17.4609 1.02321 17.0858 1.39829C16.7107 1.77336 16.5 2.28207 16.5 2.8125V16.8125H6.5C5.96957 16.8125 5.46086 17.0232 5.08579 17.3983C4.71071 17.7734 4.5 18.2821 4.5 18.8125V44.8125H2.5C1.96957 44.8125 1.46086 45.0232 1.08579 45.3983C0.710714 45.7734 0.5 46.2821 0.5 46.8125C0.5 47.3429 0.710714 47.8516 1.08579 48.2267C1.46086 48.6018 1.96957 48.8125 2.5 48.8125H58.5C59.0304 48.8125 59.5391 48.6018 59.9142 48.2267C60.2893 47.8516 60.5 47.3429 60.5 46.8125C60.5 46.2821 60.2893 45.7734 59.9142 45.3983C59.5391 45.0232 59.0304 44.8125 58.5 44.8125ZM8.5 20.8125H18.5C19.0304 20.8125 19.5391 20.6018 19.9142 20.2267C20.2893 19.8516 20.5 19.3429 20.5 18.8125V4.8125H40.5V10.8125C40.5 11.3429 40.7107 11.8516 41.0858 12.2267C41.4609 12.6018 41.9696 12.8125 42.5 12.8125H52.5V44.8125H36.5V34.8125C36.5 34.2821 36.2893 33.7734 35.9142 33.3983C35.5391 33.0232 35.0304 32.8125 34.5 32.8125H26.5C25.9696 32.8125 25.4609 33.0232 25.0858 33.3983C24.7107 33.7734 24.5 34.2821 24.5 34.8125V44.8125H8.5V20.8125ZM32.5 44.8125H28.5V36.8125H32.5V44.8125ZM26.5 10.8125C26.5 10.2821 26.7107 9.77336 27.0858 9.39829C27.4609 9.02321 27.9696 8.8125 28.5 8.8125H32.5C33.0304 8.8125 33.5391 9.02321 33.9142 9.39829C34.2893 9.77336 34.5 10.2821 34.5 10.8125C34.5 11.3429 34.2893 11.8516 33.9142 12.2267C33.5391 12.6018 33.0304 12.8125 32.5 12.8125H28.5C27.9696 12.8125 27.4609 12.6018 27.0858 12.2267C26.7107 11.8516 26.5 11.3429 26.5 10.8125ZM26.5 18.8125C26.5 18.2821 26.7107 17.7734 27.0858 17.3983C27.4609 17.0232 27.9696 16.8125 28.5 16.8125H32.5C33.0304 16.8125 33.5391 17.0232 33.9142 17.3983C34.2893 17.7734 34.5 18.2821 34.5 18.8125C34.5 19.3429 34.2893 19.8516 33.9142 20.2267C33.5391 20.6018 33.0304 20.8125 32.5 20.8125H28.5C27.9696 20.8125 27.4609 20.6018 27.0858 20.2267C26.7107 19.8516 26.5 19.3429 26.5 18.8125ZM40.5 18.8125C40.5 18.2821 40.7107 17.7734 41.0858 17.3983C41.4609 17.0232 41.9696 16.8125 42.5 16.8125H46.5C47.0304 16.8125 47.5391 17.0232 47.9142 17.3983C48.2893 17.7734 48.5 18.2821 48.5 18.8125C48.5 19.3429 48.2893 19.8516 47.9142 20.2267C47.5391 20.6018 47.0304 20.8125 46.5 20.8125H42.5C41.9696 20.8125 41.4609 20.6018 41.0858 20.2267C40.7107 19.8516 40.5 19.3429 40.5 18.8125ZM20.5 26.8125C20.5 27.3429 20.2893 27.8516 19.9142 28.2267C19.5391 28.6018 19.0304 28.8125 18.5 28.8125H14.5C13.9696 28.8125 13.4609 28.6018 13.0858 28.2267C12.7107 27.8516 12.5 27.3429 12.5 26.8125C12.5 26.2821 12.7107 25.7734 13.0858 25.3983C13.4609 25.0232 13.9696 24.8125 14.5 24.8125H18.5C19.0304 24.8125 19.5391 25.0232 19.9142 25.3983C20.2893 25.7734 20.5 26.2821 20.5 26.8125ZM20.5 34.8125C20.5 35.3429 20.2893 35.8516 19.9142 36.2267C19.5391 36.6018 19.0304 36.8125 18.5 36.8125H14.5C13.9696 36.8125 13.4609 36.6018 13.0858 36.2267C12.7107 35.8516 12.5 35.3429 12.5 34.8125C12.5 34.2821 12.7107 33.7734 13.0858 33.3983C13.4609 33.0232 13.9696 32.8125 14.5 32.8125H18.5C19.0304 32.8125 19.5391 33.0232 19.9142 33.3983C20.2893 33.7734 20.5 34.2821 20.5 34.8125ZM26.5 26.8125C26.5 26.2821 26.7107 25.7734 27.0858 25.3983C27.4609 25.0232 27.9696 24.8125 28.5 24.8125H32.5C33.0304 24.8125 33.5391 25.0232 33.9142 25.3983C34.2893 25.7734 34.5 26.2821 34.5 26.8125C34.5 27.3429 34.2893 27.8516 33.9142 28.2267C33.5391 28.6018 33.0304 28.8125 32.5 28.8125H28.5C27.9696 28.8125 27.4609 28.6018 27.0858 28.2267C26.7107 27.8516 26.5 27.3429 26.5 26.8125ZM40.5 26.8125C40.5 26.2821 40.7107 25.7734 41.0858 25.3983C41.4609 25.0232 41.9696 24.8125 42.5 24.8125H46.5C47.0304 24.8125 47.5391 25.0232 47.9142 25.3983C48.2893 25.7734 48.5 26.2821 48.5 26.8125C48.5 27.3429 48.2893 27.8516 47.9142 28.2267C47.5391 28.6018 47.0304 28.8125 46.5 28.8125H42.5C41.9696 28.8125 41.4609 28.6018 41.0858 28.2267C40.7107 27.8516 40.5 27.3429 40.5 26.8125ZM40.5 34.8125C40.5 34.2821 40.7107 33.7734 41.0858 33.3983C41.4609 33.0232 41.9696 32.8125 42.5 32.8125H46.5C47.0304 32.8125 47.5391 33.0232 47.9142 33.3983C48.2893 33.7734 48.5 34.2821 48.5 34.8125C48.5 35.3429 48.2893 35.8516 47.9142 36.2267C47.5391 36.6018 47.0304 36.8125 46.5 36.8125H42.5C41.9696 36.8125 41.4609 36.6018 41.0858 36.2267C40.7107 35.8516 40.5 35.3429 40.5 34.8125Z'
                        fill='black'
                      />
                    </svg>

                    <h5 className=' text-sm text-[#1E1E1E] opacity-60 font-normal font-openSans'>Apartment</h5>
                  </span>
                </button>
              </section>
            </div> */}

{/* <button className='btn btn-outline h-14 flex-1 border-[1.5px] border-[#7F7C7C] text-[#1E1E1ECC] text-sm hover:bg-transparent hover:text-[#1E1E1ECC] hover:border-[#1E1E1ECC]'>
                      <span className=' flex flex-col gap-[2px]'>
                        <h4 className=' text-xs text-[#1E1E1E] font-openSans'>Minimum</h4>
                        <h5 className=' text-sm text-[#1E1E1ECC] font-semibold font-openSans'>$0</h5>
                      </span>
                    </button> */}

                    
            {/* <hr className='text-[#00000026]' /> */}

            

            <hr className='text-[#00000026]' />

            <div className=''>
              <button className='btn h-9 btn-outline rounded-full w-24 border-[1.5px] border-[#7F7C7C4D] text-[#1E1E1ECC] font-openSans font-bold hover:bg-red-500 hover:border-none'>Clear</button>
            </div>
          </section>
        </div>
      </dialog>
    </section>
  )
}

export default CreateListingDialog
