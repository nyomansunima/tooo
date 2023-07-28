import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

/**
 * Render the branding and the logo
 * for the entire apps
 * @returns {React.FC}
 */
const Brand: FC = () => {
  return (
    <Link
      href={'/'}
      className="flex justify-center items-center p-2 rounded-full fixed left-10 top-8"
    >
      <Image src={'/images/logo.svg'} height={48} width={48} alt="App Logo" />
      <h1 className="text-xl font-bold">Tooo</h1>
    </Link>
  )
}

export { Brand }
