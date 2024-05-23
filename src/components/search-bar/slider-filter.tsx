import React from 'react'
import { Filter } from './search-bar'

type Props = {
  section: Filter
  processFilter: (sectionId: string, value: string) => void
}

function makeSliderArray(min: number, max: number, step: number): string[] {
  const result = []
  for (let i = min; i <= max; i += step) {
    result.push(i.toString())
  }
  return result
}

const SliderFilter = ({ section, processFilter }: Props) => {
  if (section.type == 'slider') {
    return (
      <div>
        <input
          onChange={(e) => processFilter(section.id, (e.target as HTMLInputElement).value)}
          type='range'
          min={section.min}
          max={section.max}
          className='range range-primary'
          step={section.step}
          value={section.value}
        />
        <div className='w-full flex justify-between text-xs px-1 pt-1'>
          {makeSliderArray(section.min, section.max, section.step).map((option) => (
            <span key={option}>{option}+</span>
          ))}
        </div>
      </div>
    )
  }
}

export default SliderFilter
