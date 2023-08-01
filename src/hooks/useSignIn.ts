import { useState, useEffect } from 'react'
import { SiweMessage } from 'siwe'
import { mainnet } from 'viem/chains'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'
import { useWeb3Modal } from '@web3modal/react'
import { getCsrfToken, signIn } from 'next-auth/react'

export default function useSignIn() {
  const { address, isConnected } = useAccount()
  const { open } = useWeb3Modal()
  const { signMessageAsync } = useSignMessage()
  const [hasSigned, setHasSigned] = useState(false)

  const handleSign = async () => {
    if (!isConnected) open()
    try {
      const message = new SiweMessage({
        domain: window.location.host,
        uri: window.location.origin,
        version: '1',
        address: address as `0x${string}`,
        statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
        nonce: await getCsrfToken(),
        chainId: mainnet.id
      })

      const signedMessage = await signMessageAsync({
        message: message.prepareMessage()
      })

      setHasSigned(true)

      const response = await signIn('web3', {
        message: JSON.stringify(message),
        signedMessage,
        // redirect: true,
        redirect: false,
        callbackUrl: '/questions'
      })
      if (response?.error) {
        console.log('Error occured:', response.error)
      }
    } catch (error) {
      console.log('Error Occured', error)
    }
  }

  return {
    isConnected, hasSigned, handleSign, open, address
  }
}
