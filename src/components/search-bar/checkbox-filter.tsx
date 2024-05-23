import React from 'react'
import { Filter } from './search-bar'

type Props = {
  section: Filter
  processFilter: (sectionId: string, value: string, checked: boolean) => void
}

const CheckBoxFilter = ({ section, processFilter }: Props) => {
  if (section.type === 'checkbox') {
    return (
      <div className='space-y-4'>
        {section.options.map((option, optionIdx) => (
          <div key={option.value} className='flex items-center'>
            <input
              onClick={(e) => processFilter(section.id, option.value, (e.target as HTMLInputElement).checked)}
              id={`filter-${section.id}-${optionIdx}`}
              name={`${section.id}[]`}
              defaultValue={option.value}
              type='checkbox'
              value={option.value}
              defaultChecked={option.checked}
              className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
            />
            <label htmlFor={`filter-${section.id}-${optionIdx}`} className='ml-3 text-sm text-gray-600'>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    )
  }
}

export default CheckBoxFilter
