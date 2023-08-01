import React from 'react'

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider
} from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'

type WagmiProviderType = {
  children: React.ReactNode;
}

const cronos = {
  id: 25,
  name: 'Cronos',
  network: 'cronos',
  nativeCurrency: {
    decimals: 18,
    name: 'Cronos',
    symbol: 'CRO'
  },
  rpcUrls: {
    public: { http: ['https://evm-t3.cronos.org'] },
    default: { http: ['https://evm-t3.cronos.org'] }
  },
  blockExplorers: {
    etherscan: { name: 'CronoScan', url: 'https://cronos.org/explorer/testnet3/' },
    default: { name: 'CronoScan', url: 'https://cronos.org/explorer/testnet3/' }
  }
}

const chains = [cronos]
const projectId = process.env.NEXT_PUBLIC_W3C_PID

export const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 2, chains }),
  publicClient
})

export const ethereumClient = new EthereumClient(wagmiConfig, chains)

export default function WagmiProvider({ children }: WagmiProviderType) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
      <Web3Modal projectId={projectId as string} ethereumClient={ethereumClient} />
    </>
  )
}
