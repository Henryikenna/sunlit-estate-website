import React from 'react'
import { Filter } from './search-bar'

type Props = {
  section: Filter
  processFilter: (sectionId: string, fromOrTo: 'from' | 'to', value: string) => void
}

const FromToFilter = ({ section, processFilter }: Props) => {
  if (section.type == 'fromto') {
    return (
      <div className='2xl:flex'>
        <select value={section.fromValue} onChange={(e) => processFilter(section.id, 'from', (e.target as HTMLSelectElement).value)} className='select select-bordered select-sm  2xl:mr-2'>
          <option disabled value={-1}>
            From
          </option>
          {section.fromOptions.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className='hidden 2xl:block'> - </div>
        <select value={section.toValue} onChange={(e) => processFilter(section.id, 'to', (e.target as HTMLSelectElement).value)} className='select select-bordered select-sm mt-2 2xl:mt-0 2xl:ml-2'>
          <option disabled value={-1}>
            To
          </option>
          {section.toOptions.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }
}

export default FromToFilter
