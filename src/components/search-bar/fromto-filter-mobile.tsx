import React from 'react'
import { Filter } from './search-bar'

type Props = {
  section: Filter
  processFilter: (sectionId: string, fromOrTo: 'from' | 'to', value: string) => void
}

const FromToFilterMobile = ({ section, processFilter }: Props) => {
  if (section.type == 'fromto') {
    return (
      <div>
        <select value={section.fromValue} onChange={(e) => processFilter(section.id, 'from', (e.target as HTMLSelectElement).value)} className='select select-bordered select-sm mr-2'>
          <option disabled value={-1}>
            From
          </option>
          {section.fromOptions.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        -
        <select value={section.toValue} onChange={(e) => processFilter(section.id, 'to', (e.target as HTMLSelectElement).value)} className='select select-bordered select-sm ml-2'>
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

export default FromToFilterMobile
