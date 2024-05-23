'use client'
import React from 'react'
import { ImageConverter } from './image-converter'
import Image from 'next/image'

type Props = {
  files: File[]
  setFile: (files: File[]) => void
}

const ImageUpload = ({ files, setFile }: Props) => {
  const { useState } = React

  const [message, setMessage] = useState<string>()

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage('')
    let file = e.target.files
    let validFiles: File[] = []
    if (file) {
      for (let i = 0; i < file.length; i++) {
        const fileType = file[i]['type']
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png']
        if (validImageTypes.includes(fileType)) {
          //const webpData = await ImageConverter.convertToWebPFile(file[i])

          validFiles.push(file[i])
        } else {
          setMessage('only images accepted')
        }
      }

      if (files.length + validFiles.length > 20) {
        setMessage('too many files, max 20 files allowd')
        return
      }

      if (validFiles.length > 0) setFile([...files, ...validFiles])
    }
  }

  const removeImage = (i: string) => {
    setFile(files.filter((x) => x.name !== i))
  }

  return (
    <>
      <div className='card card-normal w-full bg-base-100 shadow-xl'>
        <div className='m-4'>
          <span className='flex justify-center items-center text-[12px] mb-1 text-red-500'>{message}</span>
          <div className='flex items-center justify-center w-full'>
            <label className='flex cursor-pointer flex-col w-full h-32 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300'>
              <div className='flex flex-col items-center justify-center pt-7'>
                <svg xmlns='http://www.w3.org/2000/svg' className='w-12 h-12 text-gray-400 group-hover:text-gray-600' viewBox='0 0 20 20' fill='currentColor'>
                  <path fillRule='evenodd' d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z' clipRule='evenodd' />
                </svg>
                <p className='pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600'>Select a photo</p>
              </div>
              <input type='file' onChange={handleFile} className='opacity-0' multiple={true} name='files[]' />
            </label>
          </div>
          <div className='flex flex-wrap gap-2 mt-2'>
            {files.map((file, key) => {
              return (
                <div key={key} className='overflow-hidden relative'>
                  <div
                    onClick={() => {
                      removeImage(file.name)
                    }}
                    className='absolute right-1 text-neutral-content hover:text-neutral cursor-pointer'
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                  </div>
                  <Image className='h-20 w-20 rounded-md' alt='Uploaded Image' src={URL.createObjectURL(file)} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default ImageUpload
