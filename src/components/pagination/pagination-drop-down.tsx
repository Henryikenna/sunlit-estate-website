'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  pageLink: string
  currentPage: number
  totalPages: number
}

const PaginationDropDown = (props: Props) => {
  const router = useRouter()

  if (props.totalPages == 0) return

  const onSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const number = e.currentTarget.value
    router.push(props.pageLink + '/page/' + number)
  }

  const generatePageOptions = () => {
    const options = []
    for (let i = 1; i <= props.totalPages; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      )
    }
    return options
  }
  return (
    <div>
      Page:
      <select onChange={onSelectChange} value={props.currentPage} className='select select-bordered mx-2'>
        {generatePageOptions()}
      </select>
      of {props.totalPages}
    </div>
  )
}

export default PaginationDropDown
