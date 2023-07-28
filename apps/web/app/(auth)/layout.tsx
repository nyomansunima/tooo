import { Brand } from '@components/common/brand'
import { FC, ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}
const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <Brand />
      {children}
    </>
  )
}

export default AuthLayout
