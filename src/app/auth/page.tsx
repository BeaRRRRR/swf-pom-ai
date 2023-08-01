'use client'

import { useState, useEffect } from 'react'
import Button from '@/components/atoms/Button'
import { useSignIn } from '@/hooks'

export default function AuthPage() {
  const [mounted, setMounted] = useState(false)
  const {
    isConnected, hasSigned, handleSign, signIn, address
  } = useSignIn()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (mounted && isConnected && !hasSigned) handleSign()
  }, [isConnected, hasSigned, mounted])

  if (!mounted) return <></>

  return (
    <div className="ml-10">
      {isConnected ? <Button onClick={() => console.log('signOut')}>Sign out</Button> : <Button onClick={signIn}>Sign in</Button>}
      <p>
        Connected:
        {`${isConnected}`}
        Address:
        {address}
      </p>
    </div>
  )
}
