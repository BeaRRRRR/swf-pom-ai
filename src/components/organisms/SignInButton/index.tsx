import Link from 'next/link'
import { useSession } from 'next-auth/react'
import Button from '@/components/atoms/Button'
import { useSignIn } from '@/hooks'

export default function SignInButton() {
  const { data: session } = useSession()
  const {
    isConnected, handleSign, open
  } = useSignIn()

  return (
    <>
      {isConnected && !session && <Button onClick={() => handleSign()}>Sign in</Button>}
      {!isConnected && <Button onClick={() => open()}>Connect the wallet</Button>}
    </>
  )
}
