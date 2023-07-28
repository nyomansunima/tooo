'use client'

import { Button } from '@components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { FC } from 'react'

const SigninPage: FC = () => {
  const signinUsingGoogle = useMutation(async () => {}, {})

  return (
    <main className="flex h-screen w-screen">
      <div className="flex flex-col w-1/2 h-full justify-center px-20">
        <h2 className="text-5xl font-bold leading-snug">
          Start grow your business from the best demand on market.
        </h2>
        <Button onClick={() => signinUsingGoogle.mutate()}>
          <i className="fi fi-brands-google" />
          Google
        </Button>
      </div>
    </main>
  )
}

export default SigninPage
