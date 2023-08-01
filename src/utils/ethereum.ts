import { createWalletClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })

const client = createWalletClient({ 
  account, 
  chain: mainnet,
  transport: http()
})
