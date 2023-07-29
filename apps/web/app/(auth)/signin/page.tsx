'use client'

import { Button } from '@components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { FC } from 'react'

const SigninPage: FC = () => {
  const signinUsingGoogle = useMutation(async () => {
    await signIn('google', {
      redirect: false,
    })
  }, {})
  const signinUsingGithub = useMutation(async () => {
    await signIn('github', {
      redirect: false,
    })
  }, {})

  return (
    <main className="flex h-screen w-screen">
      <div className="flex flex-col w-1/2 h-full justify-center px-20">
        <h2 className="text-5xl font-bold leading-snug">
          Start grow your business from the best demand on market.
        </h2>

        <div className="flex items-center gap-4 mt-16">
          <Button
            variant={'outline'}
            size={'madium'}
            className="hover:-translate-y-1"
            onClick={() => signinUsingGoogle.mutate()}
          >
            <i className="fi fi-brands-google" />
            Google
          </Button>
          <Button
            variant={'outline'}
            size={'madium'}
            className="hover:-translate-y-1"
            onClick={() => signinUsingGithub.mutate()}
          >
            <i className="fi fi-brands-github" />
            Github
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-center w-1/2 h-full bg-[#F2F3FE] dark:bg-[#1F2022]">
        <Image
          src={'/images/phonies_shopping_call.svg'}
          height={460}
          width={460}
          alt="Signin"
        />
      </div>
    </main>
  )
}

export default SigninPage
