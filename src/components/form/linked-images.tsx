import React from 'react'
import { EditImage } from '../listing/add-edit-listing-form'
import { CldImage } from 'next-cloudinary'

type Props = {
  images: EditImage[]
  setImages: React.Dispatch<React.SetStateAction<EditImage[]>>
}

export const LinkedImages = (props: Props) => {
  const toggleDelete = (id: number) => {
    props.setImages((prevImages: EditImage[]) => prevImages.map((image) => (image.id === id ? { ...image, delete: !image.delete } : image)))
  }

  if (!props.images || props.images.length == 0) return <div>No images found for this scrape!</div>

  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Exclude?</th>
          </tr>
        </thead>
        <tbody>
          {props.images.map((img) => (
            <tr key={img.id}>
              <td className='h-28 w-36'>
                <CldImage className='hover:scale-[5] transition duration-500 cursor-pointer object-cover' src={img.url} alt='image' width={500} height={500} />
              </td>
              <td>
                <input
                  type='checkbox'
                  className='toggle toggle-error'
                  checked={img.delete}
                  onChange={() => {
                    toggleDelete(img.id)
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
