import {
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo,
} from '@funkit/api-base'
import { useMemo, useState } from 'react'
import { CurrencyInput } from '../CurrencyInput'
import type { Token } from '../constants'
import { useSwapTokensState } from '../hooks/useSwapTokensState'
import { LoadingSpinner } from '../LoadingSpinner'
import { Tokens } from '../Tokens'

const App = () => {
  const [error, setError] = useState<string | null>(null)

  const {
    source,
    setSource,
    target,
    setTarget,
    sourcePriceData,
    setSourcePriceData,
    targetPriceData,
    setTargetPriceData,
    isLoadingPriceData,
    setIsLoadingPriceData,
    amount,
    setAmount,
  } = useSwapTokensState()

  const handleTokenSelect = async (token: Token, type: 'source' | 'target') => {
    if (error) {
      setError(null)
    }
    if (type === 'source') {
      setSource(token)
    } else {
      setTarget(token)
    }

    if (type === 'source' && token.name === target?.name) {
      setError('Please choose different tokens.')
      return
    } else if (type === 'target' && token.name === source?.name) {
      setError('Please choose different tokens.')
      return
    }

    if (!process.env.API_KEY) {
      setError('API key is missing')
      return
    }

    setIsLoadingPriceData(true)

    try {
      const erc20AssetInfo = await getAssetErc20ByChainAndSymbol({
        apiKey: process.env.API_KEY,
        chainId: token.chainId,
        symbol: token.name,
      })
      const assetPriceInfo = await getAssetPriceInfo({
        apiKey: process.env.API_KEY,
        chainId: token.chainId,
        assetTokenAddress: erc20AssetInfo.address,
      })
      if (type === 'source') {
        setSourcePriceData(assetPriceInfo)
      } else {
        setTargetPriceData(assetPriceInfo)
      }
      setIsLoadingPriceData(false)
    } catch (ex) {
      const error = ex as unknown as Error
      if (error.message) {
        setError(error.message as string)
      }
    }
  }

  const sourceAmount = useMemo((): number => {
    if (amount && sourcePriceData) {
      return Number(amount) / sourcePriceData.unitPrice
    }
    return 0
  }, [amount, sourcePriceData])

  const targetAmount = useMemo((): number => {
    if (amount && targetPriceData) {
      return Number(amount) / targetPriceData.unitPrice
    }
    return 0
  }, [amount, targetPriceData])

  return (
    <div className='flex items-center h-full w-full justify-center'>
      <div className='md:max-w-1/2 w-full rounded-md p-8 bg-white grid gap-4'>
        <div className='text-3xl text-center text-gray-500'>Swap tokens</div>
        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
          <div className='w-full'>
            <span>Source</span>
            <Tokens
              placeholder='Select source'
              selectedToken={source ? source.name : ''}
              onSelect={(token) => handleTokenSelect(token, 'source')}
            />
          </div>
          <div className='w-full'>
            <span>Target</span>
            <Tokens
              placeholder='Select target'
              selectedToken={target ? target.name : ''}
              onSelect={(token) => handleTokenSelect(token, 'target')}
            />
          </div>
        </div>
        {error && <div className='text-red-900 text-sm'>{error}</div>}
        <div className='w-full'>
          <span>Amount</span>
          <CurrencyInput currency='USD' value={amount} onChange={setAmount} />
        </div>
        {!!sourceAmount && !!targetAmount && (
          <div>
            {isLoadingPriceData ? (
              <LoadingSpinner />
            ) : (
              <div className='bg-[#6da6a1] text-white p-4 rounded-md'>
                <div className='text-lg border-b-1 mb-2'>
                  USD($){amount} is approximately:
                </div>
                <ul className='list-disc ml-8'>
                  <li>
                    {sourceAmount.toFixed(6)} {source?.name}
                  </li>
                  <li>
                    {targetAmount.toFixed(6)} {target?.name}
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export { App }
