'use client'

import { useSession } from 'next-auth/react'
import { FC } from 'react'

const LandingPage: FC = () => {
  const session = useSession()
  return <main>{JSON.stringify(session.data)}</main>
}

export default LandingPage
