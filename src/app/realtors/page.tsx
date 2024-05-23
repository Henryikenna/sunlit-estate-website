import React from 'react'
import Realtors from './realtors'
import { realtors } from './realtor.data'

const Page = () => {
  return (
    <div>
      <Realtors realtors={realtors} />
    </div>
  )
}

export default Page
