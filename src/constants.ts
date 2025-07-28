type Token = {
  chainId: string
  name: string
}
const tokens: Token[] = [
  {
    chainId: '1',
    name: 'USDC',
  },
  {
    chainId: '137',
    name: 'USDT',
  },
  {
    chainId: '8453',
    name: 'ETH',
  },
  {
    chainId: '1',
    name: 'WBTC',
  },
]

export { tokens }
export type { Token }
