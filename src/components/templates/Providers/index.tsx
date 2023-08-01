'use client'

import React from 'react'
import AuthContext from '../AuthContext'
import WagmiProvider from '../WagmiProvider'

type ProviderType = {
  children: React.ReactNode;
}

const Providers = ({ children }: ProviderType) => (
  <WagmiProvider>
    <AuthContext>{children}</AuthContext>
  </WagmiProvider>
)

export default Providers
