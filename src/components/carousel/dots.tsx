type Props = {
  itemsLength: number
  selectedIndex: number
}
const Dots = ({ itemsLength, selectedIndex }: Props) => {
  const arr = new Array(itemsLength).fill(0)
  return (
    <div className='absolute bottom-2 right-10 flex gap-1 my-2 justify-center'>
      <span className='bg-base-100 p-1 rounded-badge'>
        {selectedIndex + 1} / {itemsLength}
      </span>
    </div>
  )
}
export default Dots
