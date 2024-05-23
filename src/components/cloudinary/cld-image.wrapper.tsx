'use client'
import { CldImage } from 'next-cloudinary'
import React from 'react'

type Props = {
  src: string
  width?: number
  height?: number
}

const CldImageWrapper = (props: Props) => {
  if (props.width && props.height) return <CldImage className='object-cover' alt='image' {...props} />
  return <CldImage fill={true} crop='fill' className='object-cover' alt='image' src={props.src} />
}

export default CldImageWrapper
