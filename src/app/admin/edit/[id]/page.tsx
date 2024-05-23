import React from 'react'
import AddEditListingForm from '../../../../components/listing/add-edit-listing-form'

type Props = {
  params: { id: string }
}

const Page = (props: Props) => {
  return <AddEditListingForm editId={props.params.id} />
}

export default Page
