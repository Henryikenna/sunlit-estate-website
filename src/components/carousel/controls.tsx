// components/CarouselControls.tsx
import classNames from 'classnames'

type Props = {
  canScrollPrev: boolean
  canScrollNext: boolean
  onPrev(): void
  onNext(): void
}
const CarouselControls = (props: Props) => {
  return (
    <>
      <div className='absolute top-1/2 left-10'>
        <button
          onClick={() => {
            if (props.canScrollPrev) {
              props.onPrev()
            }
          }}
          disabled={!props.canScrollPrev}
          className='btn btn-circle'
        >
          ❮
        </button>
      </div>
      <div className='absolute top-1/2 right-10'>
        <button
          onClick={() => {
            if (props.canScrollNext) {
              props.onNext()
            }
          }}
          disabled={!props.canScrollNext}
          className='btn btn-circle'
        >
          ❯
        </button>
      </div>
    </>
  )
}
export default CarouselControls
