import React from 'react'
import DarkModeToggle from './dark-mode/dark-mode.toggle'
import ClearCacheButton from './dev/clear-cache-button'
import Link from 'next/link'
import Image from "next/image";

type Props = {}

const Footer = (props: Props) => {
  var today = new Date();
  var currentYear = today.getFullYear();


  return (
    // <footer className='footer p-10 bg-neutral text-neutral-content'>
    //   <aside>
    //     <p>
    //       2024 - Sunlit Caribbean Estates
    //       <br />
    //       Find your dream home on the ABC Islands!
    //     </p>
    //   </aside>
    //   <nav>
    //     <header className='footer-title'>Social</header>
    //     <div className='grid grid-flow-col gap-4'>
    //       <a>
    //         <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' className='fill-current'>
    //           <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z'></path>
    //         </svg>
    //       </a>
    //       <a>
    //         <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' className='fill-current'>
    //           <path d='M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z'></path>
    //         </svg>
    //       </a>
    //       <a>
    //         <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' className='fill-current'>
    //           <path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z'></path>
    //         </svg>
    //       </a>
    //     </div>
    //   </nav>
    //   <div>
    //     <DarkModeToggle />
    //     <ClearCacheButton />
    //   </div>
    //   <div>
    //     <Link className='link' href={'newsletter'}>
    //       Subscribe to monthly newsletters
    //     </Link>
    //     <Link className='link' href={'disclaimer'}>
    //       Disclaimer
    //     </Link>
    //   </div>
    // </footer>
    <footer className=" mt-11 bg-[#06384A] lg:mt-[4.5rem]">
      <section className=" px-5 pt-10 pb-16 block md:flex md:justify-between md:items-center md:px-10 md:gap-x-14 lg:pt-5 lg:flex lg:justify-between lg:items-center lg:px-40 lg:gap-x-28">
        <div className=" md:w-1/2 lg:w-1/2">
          <div className=" flex items-center gap-3">
            <div className="relative w-[4.625rem] h-[4.625rem] lg:w-[5.25rem] lg:h-[5.25rem]">
              <Image
                src={"/sunbelt-logo-transparent.png"}
                alt="Sunbelt logo"
                layout="fill"
                objectFit="cover"
                className=""
              />
            </div>
            <div className="">
              <h1 className=" font-oswald text-white font-bold pb-[0.375rem] text-[1.1875rem] lg:text-[1.375rem]">
                Sunlit Caribbean Estates
              </h1>
              <h3 className=" font-oswald text-white font-light text-base lg:text-[1.125rem]">
                Find your dream home on the ABC Islands
              </h3>
            </div>
          </div>

          <div className=" pt-5">
            <h4 className=" font-oswald font-normal text-[0.875rem] pb-3 text-white">
              Subscribe to monthly newsletter
            </h4>

            <label className="input input-ghost flex items-center gap-2">
              <input
                type="text"
                className="grow placeholder:font-oswald"
                placeholder="Email Address"
              />
              <svg
                width="15"
                height="13"
                viewBox="0 0 15 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.4246 6.47831L1.22004 6.47831L13.4246 6.47831ZM8.19405 11.7088L13.4246 6.47831L8.19405 11.7088ZM8.19405 1.2478L13.4246 6.47831L8.19405 1.2478Z"
                  fill="#2C2A28"
                  fill-opacity="0.75"
                />
                <path
                  d="M13.4246 6.47831L1.22004 6.47831M13.4246 6.47831L8.19405 11.7088M13.4246 6.47831L8.19405 1.2478"
                  stroke="#F6812D"
                  stroke-width="1.30763"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </label>
          </div>

          <div className=" flex justify-center items-center gap-5 pt-10">
            <svg
              width="20"
              height="15"
              viewBox="0 0 20 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.1075 0.891846H10.2151C11.2083 0.895471 16.2407 0.931719 17.5976 1.29662C18.0078 1.40798 18.3816 1.62505 18.6816 1.92613C18.9816 2.22722 19.1974 2.60177 19.3073 3.01236C19.4293 3.4715 19.5151 4.07926 19.5731 4.70635L19.5852 4.83201L19.6118 5.14616L19.6214 5.27182C19.7 6.37618 19.7096 7.41045 19.7108 7.6364V7.72702C19.7096 7.96142 19.6988 9.06578 19.6118 10.2161L19.6021 10.3429L19.5912 10.4686C19.5308 11.1597 19.4414 11.846 19.3073 12.3511C19.1974 12.7617 18.9816 13.1362 18.6816 13.4373C18.3816 13.7384 18.0078 13.9554 17.5976 14.0668C16.196 14.4438 10.8687 14.4704 10.1305 14.4716H9.95891C9.58556 14.4716 8.04139 14.4643 6.42231 14.4087L6.2169 14.4015L6.11179 14.3967L5.90517 14.3882L5.69856 14.3797C4.35738 14.3205 3.08024 14.2251 2.49181 14.0656C2.08176 13.9543 1.70807 13.7374 1.40806 13.4366C1.10805 13.1357 0.892215 12.7614 0.782114 12.3511C0.647996 11.8472 0.558584 11.1597 0.498171 10.4686L0.488505 10.3417L0.478839 10.2161C0.418864 9.39735 0.385821 8.57689 0.379761 7.75602L0.379761 7.6074C0.382177 7.34762 0.391843 6.44988 0.45709 5.4591L0.465548 5.33465L0.469173 5.27182L0.478839 5.14616L0.505421 4.83201L0.517503 4.70635C0.5755 4.07926 0.661287 3.47029 0.783322 3.01236C0.893239 2.60177 1.10899 2.22722 1.40901 1.92613C1.70904 1.62505 2.08282 1.40798 2.49302 1.29662C3.08145 1.13954 4.35859 1.04288 5.69977 0.982466L5.90517 0.974008L6.11299 0.966759L6.2169 0.963134L6.42352 0.954676C7.57344 0.917707 8.72383 0.897164 9.87433 0.893054L10.1075 0.891846ZM8.11268 4.77039V10.5918L13.1354 7.68231L8.11268 4.77039Z"
                fill="white"
              />
            </svg>

            <svg
              width="24"
              height="21"
              viewBox="0 0 24 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.38386 1.60079C2.60262 1.57536 2.82417 1.61021 3.02456 1.70157C3.22495 1.79293 3.39656 1.93732 3.52084 2.11913C5.30424 4.72779 7.44529 5.81281 9.82196 6.0593C9.93795 5.04314 10.2122 4.03907 10.7282 3.15462C11.4845 1.85694 12.7146 0.902408 14.4714 0.549594C16.9 0.0614533 18.7486 0.941073 19.8204 2.01764L21.9856 1.61287C22.2122 1.57042 22.4462 1.59366 22.66 1.67987C22.8737 1.76607 23.0584 1.91163 23.1922 2.09938C23.3259 2.28712 23.4032 2.50921 23.4148 2.73943C23.4265 2.96966 23.372 3.19841 23.2579 3.39869L21.1797 7.05008C21.3694 12.3193 19.905 15.9973 16.7828 18.531C15.1275 19.8746 12.7568 20.6371 10.1554 20.8727C7.5335 21.1095 4.56961 20.8231 1.62386 19.9628C1.37216 19.8894 1.15118 19.7361 0.994259 19.5261C0.837335 19.3161 0.752986 19.0607 0.753941 18.7985C0.754896 18.5363 0.841103 18.2816 0.999552 18.0727C1.158 17.8638 1.38009 17.7121 1.63231 17.6405C3.11365 17.2189 4.24217 16.8552 5.26074 16.2184C3.81203 15.45 2.74513 14.4447 1.98996 13.2992C0.941185 11.7067 0.552122 9.93059 0.474793 8.32963C0.397464 6.72868 0.628243 5.24492 0.872313 4.17561C1.01126 3.56543 1.17317 2.95405 1.3967 2.36925C1.47555 2.1631 1.60935 1.98249 1.78359 1.84702C1.95783 1.71155 2.16464 1.62639 2.38386 1.60079Z"
                fill="white"
              />
            </svg>

            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.3306 12.7121C24.3306 6.04244 18.9176 0.629395 12.248 0.629395C5.57832 0.629395 0.165283 6.04244 0.165283 12.7121C0.165283 18.5601 4.32173 23.4294 9.83143 24.5531V16.3369H7.41489V12.7121H9.83143V9.69141C9.83143 7.35945 11.7284 5.46247 14.0604 5.46247H17.081V9.08727H14.6645C14 9.08727 13.4562 9.63099 13.4562 10.2955V12.7121H17.081V16.3369H13.4562V24.7343C19.558 24.1302 24.3306 18.983 24.3306 12.7121Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        <div className=" pt-14 flex justify-between md:pt-0 md:w-1/2 lg:pt-0 lg:w-1/2">
          <section className=" flex flex-col gap-y-6">
            <h2 className=" text-white font-oswald opacity-50 text-lg">
              Company
            </h2>

            <ul className=" text-white opacity-85 font-oswald font-normal text-sm flex flex-col gap-y-5">
              <li>
                <Link href="">Buy & Sell</Link>
              </li>
              <li>
                <Link href="">Rent</Link>
              </li>
              <li>
                <Link href="">Realtor</Link>
              </li>
              <li>
                <Link href="">About us</Link>
              </li>
            </ul>
          </section>

          <section className=" flex flex-col gap-y-6">
            <h2 className=" text-white font-oswald opacity-50 text-lg">
              Support
            </h2>

            <ul className=" text-white opacity-85 font-oswald font-normal text-sm flex flex-col gap-y-5">
              <li>
                <Link href="">Contact Us</Link>
              </li>
              <li>
                <Link href="">Home for rent</Link>
              </li>
              <li>
                <Link href="">Home for sale</Link>
              </li>
              <li>
                <Link href="">Land</Link>
              </li>
            </ul>
          </section>

          <section className=" flex flex-col gap-y-6">
            <h2 className=" text-white font-oswald opacity-50 text-lg">
              Quick links
            </h2>

            <ul className=" text-white opacity-85 font-oswald font-normal text-sm flex flex-col gap-y-5">
              <li>
                <Link href="">Connect with us</Link>
              </li>
              <li>
                <Link href="">Visit Caribbean</Link>
              </li>
              <li>
                <Link href="">Visit Sunbelt Bonaire</Link>
              </li>
              <li>
                <Link href="">Visit Re/Max Paradise</Link>
              </li>
            </ul>
          </section>
        </div>
      </section>

      <hr className=" opacity-70" />

      <section className=" py-5 md:py-6 lg:py-6">
        <p className=" text-white font-normal text-[0.829375rem] text-center font-montserrat md:text-[0.9rem] md:opacity-100 lg:text-base lg:opacity-100">
          &copy; {currentYear} - Sunlit Caribbean Estates. All Rights Reserved
        </p>
      </section>
    </footer>
  )
}

export default Footer
