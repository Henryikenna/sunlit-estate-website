'use client'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import Dots from './dots'
import CarouselControls from './controls'
import { Zoom } from './zoom'

// Define the props
type Props = PropsWithChildren & EmblaOptionsType

const Carousel = ({ children, ...options }: Props) => {
  // 1. useEmblaCarousel returns a emblaRef and we must attach the ref to a container.
  // EmblaCarousel will use that ref as basis for swipe and other functionality.
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false) // New state for zoomed mode

  useEffect(() => {
    function selectHandler() {
      // selectedScrollSnap gives us the current selected index.
      const index = emblaApi?.selectedScrollSnap()
      setSelectedIndex(index || 0)
    }

    emblaApi?.on('select', selectHandler)
    // cleanup
    return () => {
      emblaApi?.off('select', selectHandler)
    }
  }, [emblaApi])

  const length = React.Children.count(children)
  const canScrollNext = !!emblaApi?.canScrollNext()
  const canScrollPrev = !!emblaApi?.canScrollPrev()

  return (
    // Attach ref to a div
    // 2. The wrapper div must have overflow:hidden
    <div className={`${isZoomed ? 'fixed p-5 bg-base-300 bg-opacity-90 h-screen w-screen top-0 left-0 z-50' : 'relative'}`}>
      <div className='overflow-hidden h-full rounded-lg shadow-xl' ref={emblaRef}>
        {/* 3. The inner div must have a display:flex property */}
        {/* 4. We pass the children as-is so that the outside component can style it accordingly */}
        <div className={`flex ${isZoomed ? 'h-full' : 'h-96 xl:h-[512px]'}`}>{children}</div>

        <Dots itemsLength={length} selectedIndex={selectedIndex} />
        <CarouselControls canScrollNext={canScrollNext} canScrollPrev={canScrollPrev} onNext={() => emblaApi?.scrollNext()} onPrev={() => emblaApi?.scrollPrev()} />
        {/* Button to toggle zoom */}
        <button onClick={() => setIsZoomed(!isZoomed)} className={`btn btn-circle absolute ${isZoomed ? 'top-14 right-14' : 'top-4 right-4'}`}>
          {isZoomed ? (
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-8 h-8 text-accent-content'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6' />
            </svg>
          ) : (
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-8 h-8 text-accent-content'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6' />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
export default Carousel
