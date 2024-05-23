import { auth } from '@clerk/nextjs'
import React from 'react'

type Props = {}

const Admin = (props: Props) => {
  const authCtx = auth()
  const authCtxStr = JSON.stringify(authCtx)
  return <div>Admin: {authCtxStr}</div>
}

export default Admin
