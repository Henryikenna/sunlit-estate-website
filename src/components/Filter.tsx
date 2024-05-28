import { useState } from 'react'
import { IoClose } from 'react-icons/io5'




const filterButtonsTextList = ['Any', '1', '2', '3', '4', '5', '6', '7', '8+']
const areaTextList = ['Hato', 'Nikiboko', 'locate various', 'Noord Saliña', 'Belnem', 'Sabal Palm', 'Santa Barbara', 'Suikerpalm']

interface AppFilterProps {
  isFilterTextVisible: boolean
}

const AppFilter: React.FC<AppFilterProps> = ({ isFilterTextVisible }) => {
    
  const [selectedButton, setSelectedButton] = useState<number | null>(0)

  const openModal = () => {
    const modal = document.getElementById('filter_modal') as HTMLDialogElement | null
    if (modal) {
      modal.showModal()
    } else {
      console.error('Modal not found')
    }
  }

  const buttons = Array.from({ length: filterButtonsTextList.length }, (_, i) => i)
  const areas = Array.from({ length: areaTextList.length }, (_, i) => i);

  return (
    <section className=''>
          <button
            onClick={openModal}
            className={` ${isFilterTextVisible == false && 'btn w-auto rounded-full p-0 gap-0 lg:w-auto'} flex gap-[0.5rem] h-full items-center justify-center no-animation md:bg-transparent text-[#1E1E1E] text-[0.5rem] font-semibold font-openSans md:rounded-3xl md:btn lg:btn-outline lg:border-1 lg:border-[#1E1E1E] lg:border-opacity-25  lg:w-28 lg:text-base hover:text-[#1E1E1E] hover:bg-transparent hover:border-white`}
          >
            <svg
              className=' w-[0.875rem] md:w-4 lg:w-5'
              // width="21"
              // height="20"
              viewBox='0 0 21 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M19.5066 10.2586H7.15159M2.79059 10.2586H1.00659M2.79059 10.2586C2.79059 9.68039 3.02027 9.12589 3.4291 8.71706C3.83793 8.30824 4.39242 8.07856 4.97059 8.07856C5.54876 8.07856 6.10326 8.30824 6.51208 8.71706C6.92091 9.12589 7.15059 9.68039 7.15059 10.2586C7.15059 10.8367 6.92091 11.3912 6.51208 11.8C6.10326 12.2089 5.54876 12.4386 4.97059 12.4386C4.39242 12.4386 3.83793 12.2089 3.4291 11.8C3.02027 11.3912 2.79059 10.8367 2.79059 10.2586ZM19.5066 16.8656H13.7586M13.7586 16.8656C13.7586 17.4439 13.5284 17.999 13.1194 18.4079C12.7105 18.8168 12.1559 19.0466 11.5776 19.0466C10.9994 19.0466 10.4449 18.8159 10.0361 18.4071C9.62727 17.9982 9.39759 17.4437 9.39759 16.8656M13.7586 16.8656C13.7586 16.2873 13.5284 15.7331 13.1194 15.3242C12.7105 14.9153 12.1559 14.6856 11.5776 14.6856C10.9994 14.6856 10.4449 14.9152 10.0361 15.3241C9.62727 15.7329 9.39759 16.2874 9.39759 16.8656M9.39759 16.8656H1.00659M19.5066 3.65156H16.4016M12.0406 3.65156H1.00659M12.0406 3.65156C12.0406 3.07339 12.2703 2.51889 12.6791 2.11006C13.0879 1.70124 13.6424 1.47156 14.2206 1.47156C14.5069 1.47156 14.7904 1.52795 15.0548 1.6375C15.3193 1.74706 15.5597 1.90763 15.7621 2.11006C15.9645 2.3125 16.1251 2.55282 16.2346 2.81731C16.3442 3.0818 16.4006 3.36528 16.4006 3.65156C16.4006 3.93784 16.3442 4.22132 16.2346 4.48581C16.1251 4.7503 15.9645 4.99062 15.7621 5.19305C15.5597 5.39548 15.3193 5.55606 15.0548 5.66562C14.7904 5.77517 14.5069 5.83156 14.2206 5.83156C13.6424 5.83156 13.0879 5.60188 12.6791 5.19305C12.2703 4.78422 12.0406 4.22973 12.0406 3.65156Z'
                stroke='black'
                stroke-width='1.5'
                stroke-miterlimit='10'
                stroke-linecap='round'
              />
            </svg>
            {isFilterTextVisible && "Filter"}
          </button>

          <dialog id='filter_modal' className='modal modal-bottom sm:modal-middle'>
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

                <h3 className=' flex-1 text-center font-openSans font-bold text-base'>Filter</h3>

                <div className=' flex-1'></div>
              </section>
              <hr className=' border-[#1E1E1E40] w-full' />
              <section className=' px-5 pt-4 flex flex-col gap-6'>
                <div className=''>
                  <h1 className=' font-openSans font-bold text-lg pb-2'>Price range</h1>
                  <h3 className=' font-openSans text-sm'>Choose your price range to search in</h3>

                  <section className=' pt-8'>
                    <div className='w-full flex pb-1 justify-between text-xs'>
                      <span className=''>$0</span>
                      <span className=' pl-2'>$20</span>
                      <span className='pl-1'>$40</span>
                      <span className=''>$60</span>
                      <span className=''>$80</span>
                      <span className=''>$100</span>
                    </div>
                    <input type='range' min={0} max='100' value='40' className='range [--range-shdw:transparent]' step='20' />
                    <div className='w-full flex justify-between text-xs px-2'>
                      <span className=''>|</span>
                      <span className=''>|</span>
                      <span className=''>|</span>
                      <span className=''>|</span>
                      <span className=''>|</span>
                      <span className=''>|</span>
                    </div>
                  </section>

                  <section className=' pt-5 flex justify-center items-center w-full'>
                    <button className='btn btn-outline h-14 flex-1 border-[1.5px] border-[#7F7C7C] text-[#1E1E1ECC] text-sm hover:bg-transparent hover:text-[#1E1E1ECC] hover:border-[#1E1E1ECC]'>
                      <span className=' flex flex-col gap-[2px]'>
                        <h4 className=' text-xs text-[#1E1E1E] font-openSans'>Minimum</h4>
                        <h5 className=' text-sm text-[#1E1E1ECC] font-semibold font-openSans'>$0</h5>
                      </span>
                    </button>
                    <h5 className='px-3'>-</h5>
                    <button className='btn btn-outline h-14 flex-1 border-[1.5px] border-[#7F7C7C] text-[#1E1E1ECC] text-sm hover:bg-transparent hover:text-[#1E1E1ECC] hover:border-[#1E1E1ECC]'>
                      <span className=' flex flex-col gap-[2px]'>
                        <h4 className=' text-xs text-[#1E1E1E] font-openSans'>Maximum</h4>
                        <h5 className=' text-sm text-[#1E1E1ECC] font-semibold font-openSans'>$100</h5>
                      </span>
                    </button>
                  </section>
                </div>

                <div className=''>
                  <h1 className=' font-openSans font-bold text-lg pb-2'>Beds and Bathroooms</h1>
                  <h3 className=' font-openSans text-sm'>Beds</h3>

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
                  <h1 className=' font-openSans font-bold text-lg pb-2'>Property Type</h1>
                  <h3 className=' font-openSans text-sm'>Select the kind of property</h3>

                  <section className=' pt-8 flex justify-center items-center gap-5 w-full'>
                    <button className='btn btn-outline h-14 flex-1 border-[1.5px] border-[#7F7C7C] text-[#1E1E1ECC] text-sm hover:bg-transparent hover:text-[#1E1E1ECC] hover:border-[#1E1E1ECC]'>
                      <span className=' flex flex-col gap-[2px]'>
                        <h4 className=' text-xs text-[#1E1E1E] font-openSans'>Minimum</h4>
                        <h5 className=' text-sm text-[#1E1E1ECC] font-semibold font-openSans'>$0</h5>
                      </span>
                    </button>
                    <button className='btn btn-outline h-14 flex-1 border-[1.5px] border-[#7F7C7C] text-[#1E1E1ECC] text-sm hover:bg-transparent hover:text-[#1E1E1ECC] hover:border-[#1E1E1ECC]'>
                      <span className=' flex flex-col gap-[2px]'>
                        <h4 className=' text-xs text-[#1E1E1E] font-openSans'>Minimum</h4>
                        <h5 className=' text-sm text-[#1E1E1ECC] font-semibold font-openSans'>$0</h5>
                      </span>
                    </button>
                    <button className='btn btn-outline h-14 flex-1 border-[1.5px] border-[#7F7C7C] text-[#1E1E1ECC] text-sm hover:bg-transparent hover:text-[#1E1E1ECC] hover:border-[#1E1E1ECC]'>
                      <span className=' flex flex-col gap-[2px]'>
                        <h4 className=' text-xs text-[#1E1E1E] font-openSans'>Minimum</h4>
                        <h5 className=' text-sm text-[#1E1E1ECC] font-semibold font-openSans'>$0</h5>
                      </span>
                    </button>
                  </section>
                </div>

                <hr className='text-[#00000026]' />

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

                <hr className='text-[#00000026]' />

                <div className="">
                <button className="btn h-9 btn-outline rounded-full w-24 border-[1.5px] border-[#7F7C7C4D] text-[#1E1E1ECC] font-openSans font-bold hover:bg-red-500 hover:border-none">Clear</button>
                </div>
              </section>
            </div>
          </dialog>
        </section>
  )
}

export default AppFilter