// import { useAuth } from '@clerk/nextjs'
// import React from 'react'

// type Props = {}

// const Admin = (props: Props) => {
//   const authCtx = useAuth()
//   const authCtxStr = JSON.stringify(authCtx)
//   return <div>Admin: {authCtxStr}</div>
// }

// export default Admin


"use client"
import { useAuth } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'

type Props = {}

const Admin = (props: Props) => {
  const [authCtxStr, setAuthCtxStr] = useState('')

  useEffect(() => {
    const authCtx = useAuth()
    setAuthCtxStr(JSON.stringify(authCtx))
  }, [])

  return <div>Admin: {authCtxStr}</div>
}

export default Admin


