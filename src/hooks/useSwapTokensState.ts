import { useState } from 'react'
import type { Token } from '../constants'

interface PriceData {
  total: number
  unitPrice: number
  amount: number
}

const useSwapTokensState = () => {
  const [source, setSource] = useState<Token | null>(null)
  const [target, setTarget] = useState<Token | null>(null)
  const [amount, setAmount] = useState<string>('')
  const [sourcePriceData, setSourcePriceData] = useState<PriceData>()
  const [targetPriceData, setTargetPriceData] = useState<PriceData>()
  const [isLoadingPriceData, setIsLoadingPriceData] = useState<boolean>(false)

  return {
    source,
    setSource,
    target,
    setTarget,
    amount,
    setAmount,
    sourcePriceData,
    setSourcePriceData,
    targetPriceData,
    setTargetPriceData,
    isLoadingPriceData,
    setIsLoadingPriceData,
  }
}

export { useSwapTokensState }
