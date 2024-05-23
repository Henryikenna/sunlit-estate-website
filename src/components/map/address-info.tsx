'use client'
import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'

type Props = {
  address: string | null
  area: string | null
  latLng: { lat: number | null; lng: number | null }
}

const Map = dynamic(() => import('@/components/map/map'), {
  ssr: false,
  loading: () => <p>Loading Map..</p>,
})

const AddressInfo = (props: Props) => {
  const [dialogOpened, setDialogOpened] = useState(false)
  const hasCoords = props.latLng && props.latLng.lat && props.latLng.lng
  const openModal = () => {
    if (modalRef.current) modalRef.current.showModal()
    setDialogOpened(true)
  }
  const modalRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <h4 className={`m-1 ${hasCoords ? 'hover:underline hover:cursor-pointer' : ''}`} onClick={hasCoords ? openModal : undefined}>
        {props.address} / {props.area}
      </h4>
      {hasCoords && (
        <dialog ref={modalRef} id='address_modal' className='modal modal-bottom sm:modal-middle'>
          <div className='modal-box sm:w-11/12 sm:!max-w-5xl'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
            </form>
            <div className='mt-10'>{dialogOpened && <Map marker={{ lat: props.latLng.lat!, lng: props.latLng.lng! }} />}</div>
          </div>
        </dialog>
      )}
    </>
  )
}

export default AddressInfo
