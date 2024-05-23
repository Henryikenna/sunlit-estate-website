import Link from 'next/link'
import PaginationDropDown from './pagination-drop-down'

type Props = {
  pageLink: string
  currentPage: number
  totalPages: number
}

const Pagination = (props: Props) => {
  return (
    <>
      {props.totalPages != 1 && (
        <div className='flex items-center'>
          {props.currentPage > 1 && (
            <Link href={`${props.pageLink}/page/${props.currentPage - 1}`} className='link link-hover font-semibold hover:bg-base-200 text-lg mr-10 p-4'>
              Previous
            </Link>
          )}
          <PaginationDropDown currentPage={props.currentPage} totalPages={props.totalPages} pageLink={props.pageLink} />
          {props.currentPage < props.totalPages && (
            <Link href={`${props.pageLink}/page/${props.currentPage + 1}`} className='link link-hover font-semibold hover:bg-base-200 text-lg ml-10 p-4'>
              Next
            </Link>
          )}
        </div>
      )}
    </>
  )
}

export default Pagination
