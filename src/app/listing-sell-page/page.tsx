'use client'
import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { FiPlus } from 'react-icons/fi'
import { FaLocationDot, FaArrowRightLong } from 'react-icons/fa6'
import { FaGlobeAmericas, FaRegFileAlt } from 'react-icons/fa'

import axios from 'axios'

const filterButtonsTextList = ['Any', '1', '2', '3', '4', '5', '6', '7', '8+']
const areaTextList = ['Hato', 'Nikiboko', 'locate various', 'Noord Saliña', 'Belnem', 'Sabal Palm', 'Santa Barbara', 'Suikerpalm']
const houseVarietiesList = ['Pool', 'Parking', 'Garden', 'Balcony']

const ListingSellPage = () => {
  const [selectedBedButton, setSelectedBedButton] = useState<number | null>(0)
  const [selectedBathroomButton, setSelectedBathroomButton] = useState<number | null>(0)

  const bedsButtons = Array.from({ length: filterButtonsTextList.length }, (_, i) => i)
  const bathroomsButtons = Array.from({ length: filterButtonsTextList.length }, (_, i) => i)
  const areas = Array.from({ length: areaTextList.length }, (_, i) => i)
  const houseVarieties = Array.from({ length: houseVarietiesList.length }, (_, i) => i)

  const [file, setFile] = useState<File | null>(null)
  const [fileURL, setFileURL] = useState<string | null>(null)
  const [uploadStatus, setUploadStatus] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0]
      setFile(selectedFile)
      setFileURL(URL.createObjectURL(selectedFile))
    }
  }

  // const handleUpload = () => {
  //   if (file) {
  //     console.log('Uploading file:', file);
  //     // Handle file upload logic here
  //   }
  // };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        setUploadStatus('File uploaded successfully')
        console.log(response.data)
      } catch (error) {
        setUploadStatus('File upload failed')
        console.error(error)
      }
    }
  }

  return (
    <div className='mt-4 md:mt-5 lg:mt-7'>
      <div className='px-0 py-5'>
        {/* <section className='flex items-center px-5 pb-5'>
            <div className='modal-action m-0 flex-1 justify-start'>
              <form method='dialog'>
                <button className='btn btn-outline border-[#7A848C4D] rounded-full text-[#1E1E1ECC] text-sm hover:bg-transparent hover:text-[#1E1E1ECC] hover:border-[#1E1E1ECC]'>
                  <IoClose className='text-base text-[#1E1E1ECC]' /> Close
                </button>
              </form>
            </div>

            <h3 className=' flex-1 text-center font-openSans font-bold text-base'>Create Listing</h3>

            <div className=' flex-1'></div>
          </section> */}
        {/* <hr className=' border-[#1E1E1E40] w-full' /> */}

        <section className=' px-5 pt-4 flex flex-col gap-8'>
          <div className=''>
            <section className='block lg:flex items-center gap-5 pb-5 w-full'>
              <div className='w-full pb-5 lg:pb-0 lg:w-1/2'>
                <h1 className=' font-openSans font-bold text-base pb-2'>Property Type</h1>
                {/* <label className='input input-bordered flex items-center gap-2'>
                    <input type='text' className='grow' placeholder='Enter Property type' />
                    <svg width='20' height='11' viewBox='0 0 20 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M0.966973 0.0161133C0.77568 0.0162815 0.588726 0.0731349 0.429725 0.179492C0.270723 0.28585 0.146806 0.43694 0.0736239 0.613682C0.000441756 0.790424 -0.0187229 0.984889 0.0185504 1.17252C0.0558238 1.36014 0.147863 1.53252 0.283044 1.66787L9.31607 10.7009C9.49754 10.8821 9.74353 10.9839 10 10.9839C10.2565 10.9839 10.5025 10.8821 10.6839 10.7009L19.717 1.66787C19.8521 1.53252 19.9442 1.36014 19.9814 1.17252C20.0187 0.984889 19.9996 0.790424 19.9264 0.613682C19.8532 0.43694 19.7293 0.28585 19.5703 0.179492C19.4113 0.0731349 19.2243 0.0162815 19.033 0.0161133H0.966973Z'
                        fill='#1E1E1E'
                        fill-opacity='0.8'
                      />
                    </svg>
                  </label> */}
                <select className='select select-bordered w-full text-base'>
                  {/* <option className='text-[#7F7C7C80]' disabled selected>
                  Enter Property type
                  </option> */}
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Land</option>
                  <option>Other</option>
                </select>
              </div>

              <div className='w-full lg:w-1/2'>
                <h1 className=' font-openSans font-bold text-base pb-2'>Property Name</h1>
                <label className='input input-bordered font-openSans flex items-center gap-2'>
                  <input type='text' className='grow' placeholder='Enter Property name' />
                </label>
              </div>
            </section>

            <section className='block lg:flex items-center gap-5 w-full'>
              <div className='w-full pb-5 lg:pb-0 lg:w-1/2'>
                <h1 className=' font-openSans font-bold text-base pb-2'>Address</h1>
                <label className='input input-bordered font-openSans flex items-center pr-0'>
                  <input type='text' className='grow' placeholder='Enter Property Address' />
                  <div className='bg-[#F6812D] flex items-center justify-center text-xl rounded-[8px] h-[3rem] w-[3rem] text-white'>
                    <FaLocationDot />
                  </div>
                </label>
              </div>

              <div className='w-full lg:w-1/2'>
                <h1 className=' font-openSans font-bold text-base pb-2'>Property URL</h1>
                <label className='input input-bordered font-openSans flex items-center pr-0'>
                  <input type='text' className='grow' placeholder='Enter Property URL' />
                  <div className='bg-[#F6812D] flex items-center justify-center text-xl rounded-[8px] h-[3rem] w-[3rem] text-white'>
                    <FaGlobeAmericas />
                  </div>
                </label>
              </div>
            </section>
          </div>

          <div className=''>
            <h1 className=' font-openSans font-bold text-lg pb-2'>Area</h1>
            <h3 className=' font-openSans text-sm'>Locate various regions</h3>

            <section className=' pt-8 grid grid-cols-2 gap-y-2 md:gap-y-3'>
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
              {bedsButtons.map((button) => (
                <button
                  key={`Button${button}`}
                  className={`btn rounded-full min-w-20 font-openSans text-xs font-semibold ${
                    selectedBedButton === button ? 'btn-primary bg-[#06384A] border-none text-white hover:bg-[#06384A]' : 'btn-outline text-[#1E1E1ECC] hover:bg-transparent hover:text-[#1E1E1ECC]'
                  }`}
                  onClick={() => setSelectedBedButton(button)}
                >
                  {filterButtonsTextList[button]}
                </button>
              ))}
            </section>

            <h3 className=' font-openSans text-sm'>Bathrooms</h3>

            <section className='flex flex-wrap w-full gap-2 pt-8'>
              {bathroomsButtons.map((button) => (
                <button
                  key={`Button${button}`}
                  className={`btn rounded-full min-w-20 font-openSans text-xs font-semibold ${
                    selectedBathroomButton === button
                      ? 'btn-primary bg-[#06384A] border-none text-white hover:bg-[#06384A]'
                      : 'btn-outline text-[#1E1E1ECC] hover:bg-transparent hover:text-[#1E1E1ECC]'
                  }`}
                  onClick={() => setSelectedBathroomButton(button)}
                >
                  {filterButtonsTextList[button]}
                </button>
              ))}
            </section>
          </div>

          {/* <div className=''>
            <h1 className=' font-openSans font-bold text-lg pb-2'>Area</h1>
            <h3 className=' font-openSans text-sm'>Locate various regions</h3>

            <section className=' pt-8 grid grid-cols-2 gap-y-2 md:gap-y-3'>
              {areas.map((index) => (
                <span key={index} className=' flex items-center gap-2'>
                  <input type='checkbox' className='checkbox' />
                  {areaTextList[index]}
                </span>
              ))}
            </section>
          </div>
 */}
          <div className='flex w-full gap-5'>
            <div className='w-1/3'>
              <h1 className=' font-openSans font-semibold text-base pb-2'>Price</h1>
              <label className='input input-bordered font-openSans flex items-center gap-2 pr-0'>
                <input type='number' className='grow' placeholder='Enter Price' />
                <div className='flex items-center justify-center text-base font-openSans font-semibold rounded-[8px] h-[3rem] w-[3rem] text-[#06384A]'>$</div>
              </label>
            </div>

            <div className='w-1/3'>
              <h1 className=' font-openSans font-semibold text-base pb-2'>Lot Size</h1>
              <label className='input input-bordered font-openSans flex items-center gap-2 pr-0'>
                <input type='number' className='grow' placeholder='200' />
                <div className='flex items-center justify-center text-base font-openSans font-semibold rounded-[8px] h-[3rem] w-[3rem] text-[#06384A]'>
                  m<sup>2</sup>
                </div>
              </label>
            </div>

            <div className='w-1/3'>
              <h1 className=' font-openSans font-semibold text-base pb-2'>Property Size</h1>
              <label className='input input-bordered font-openSans flex items-center gap-2 pr-0'>
                <input type='number' className='grow' placeholder='500' />
                <div className='flex items-center justify-center text-base font-openSans font-semibold rounded-[8px] h-[3rem] w-[3rem] text-[#06384A]'>
                  m<sup>2</sup>
                </div>
              </label>
            </div>
          </div>

          <div className=''>
            <h1 className=' font-openSans font-bold text-lg pb-2'>Description</h1>
            <h3 className=' font-openSans text-sm'>Description about your house</h3>

            <section className=' pt-8'>
              {/* <input type="text" placeholder="Enter Description" className="input input-bordered w-full max-w-xs" /> */}
              <textarea placeholder='Enter Description' className='input input-bordered font-openSans w-full py-3 h-48' rows={8}></textarea>
            </section>
          </div>

          <div className='w-full'>
            <h1 className=' font-openSans font-bold text-lg pb-2'>Listed on:</h1>
            <h3 className=' font-openSans text-sm'>Select your listed housing</h3>

            <select className='select select-bordered w-full text-base mt-5'>
              <option>Caribbean Homes</option>
              <option>Sunbelt realty Bonaire</option>
              <option>RE/MAX paradise Homes</option>
            </select>
          </div>

          <div className='w-full'>
            <h1 className=' font-openSans font-bold text-base pb-2'>YouTube URL:</h1>
            <label className='input input-bordered font-openSans flex items-center pr-0'>
              <input type='text' className='grow' placeholder='https://' />
              <div className='bg-[#F6812D] flex items-center justify-center text-xl rounded-[8px] h-[3rem] w-[3rem] text-white'>
                <FaLocationDot />
              </div>
            </label>
          </div>

          <div className='w-full'>
            <h1 className=' font-openSans font-bold text-lg pb-2'>Upload photo</h1>
            <h3 className=' font-openSans text-sm'>Upload photo or documents</h3>

            {/* <select className='select select-bordered w-full text-base mt-5'>
              <option>Caribbean Homes</option>
              <option>Sunbelt realty Bonaire</option>
              <option>RE/MAX paradise Homes</option>
            </select> */}
            <div className='flex flex-col items-center mt-8 justify-center h-screen border border-[#4295F280] rounded-[8px] bg-gray-100'>
              <div className='w-full max-w-xs p-8 bg-white rounded-lg shadow-md'>
                <div className='flex flex-col items-center mb-4'>
                  <label htmlFor='file-upload' className='cursor-pointer'>
                    <div className='flex flex-col items-center'>
                      {/* <div className="w-16 h-16 mb-4 bg-gray-200 rounded-full flex items-center justify-center">
               
              </div> */}
                      {file ? (
                        <div className='flex flex-col items-center'>
                          {/* <img src={fileURL!} alt="file-icon" className="w-16 h-16 mb-4" /> */}
                          <FaRegFileAlt className='w-16 h-16 mb-4' />
                          <span className='text-sm text-gray-600'>{file.name}</span>
                        </div>
                      ) : (
                        <svg className='w-24' viewBox='0 0 177 176' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <circle opacity='0.5' cx='88.5004' cy='87.8178' r='87.1814' stroke='#BAC9D5' stroke-width='1.27272' />
                          <circle cx='88.1871' cy='88.6759' r='50.7301' stroke='#BAC9D5' stroke-width='5.63668' />
                          <path d='M95.4891 104.42H82.5478V87.1644H72.1084L89.0184 70.2544L105.928 87.1644H95.4891V104.42Z' fill='#F6812D' />
                        </svg>
                      )}

                      <span className='text-sm text-gray-600 pt-5'>Drag files to upload, or</span>
                      {/* <span className="text-sm text-blue-500">Choose File</span> */}
                    </div>
                  </label>
                  <input id='file-upload' type='file' className='hidden' onChange={handleFileChange} />
                  <section className='pt-4 justify-center flex items-center '>
                    <button
                      className='w-32 rounded-full font-semibold text-base text-center font-openSans px-4 py-2 text-white bg-[#F6812D] hover:bg-[#F6812D] focus:outline-none'
                      // onClick={handleUpload}
                      // onClick={handleFileChange}
                    >
                      Choose file
                    </button>
                  </section>
                </div>
              </div>
            </div>
          </div>

          <section className='pt-5'>
            <button className='btn btn-primary font-openSans rounded-full border-none text-white w-52 flex justify-center items-center float-right bg-[#F6812D] hover:bg-[#ed7b29]'>
              Post item for Rent
              <FaArrowRightLong />
            </button>
          </section>

          {/* <hr className='text-[#00000026]' />

          <div className=''>
            <button className='btn h-9 btn-outline rounded-full w-24 border-[1.5px] border-[#7F7C7C4D] text-[#1E1E1ECC] font-openSans font-bold hover:bg-red-500 hover:border-none'>Clear</button>
          </div> */}
        </section>
      </div>
    </div>
  )
}

export default ListingSellPage
