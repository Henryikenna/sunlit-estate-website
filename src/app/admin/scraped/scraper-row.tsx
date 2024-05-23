import Link from 'next/link'
import { DbResultOk, Tables } from '../../../types/shorthands'
import { DateTime } from 'luxon'
import { ReactNode } from 'react'

type Props = {
  listing: Tables<'scraped_realtor_property'>
}

const ScrapedRow = (props: Props) => {
  function convertIdToRealto(realtor_id: number | null): ReactNode {
    if (!realtor_id) return '-'

    switch (realtor_id) {
      case 1:
        return 'Carribean Homes'

      case 2:
        return 'Sunbelt Realty Bonaire'

      case 4:
        return 'RE/MAX Paradise Homes'

      default:
        return 'Unkown realtor id: ' + realtor_id
    }
  }

  return (
    <tr>
      <td>{props.listing.name}</td>
      <td>{props.listing.address}</td>
      <td>{convertIdToRealto(props.listing.realtor_id)}</td>
      <td>{props.listing.scrape_status}</td>
      <td>{DateTime.fromISO(props.listing.created_at!).toRelative()}</td>
      <td className='flex'>
        <Link href={`/admin/scraped/edit/${props.listing.id}`} legacyBehavior passHref>
          <button className='btn btn-square btn-sm ml-2 hover:bg-info'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
            </svg>
          </button>
        </Link>
      </td>
    </tr>
  )
}

export default ScrapedRow
