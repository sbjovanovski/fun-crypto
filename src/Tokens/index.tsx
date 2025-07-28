import type { ChangeEvent } from 'react'
import { type Token, tokens } from '../constants'

interface TokensProps {
  onSelect: (token: Token) => void
  selectedToken: string
  placeholder?: string
}

const Tokens = ({ onSelect, selectedToken, placeholder }: TokensProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const tokenName = event.target.value
    const token = tokens.find((t) => t.name === tokenName)
    if (token) {
      onSelect(token)
    }
  }
  return (
    <select
      onChange={handleChange}
      value={selectedToken}
      defaultValue=''
      className='cursor-pointer border-1 rounded-md p-2 w-full border-[#6da6a1] text-gray-400 focus:outline-none'
    >
      <option disabled selected value=''>
        {placeholder ?? 'Select token'}
      </option>
      {tokens.map((token) => (
        <option key={token.name} value={token.name}>
          {token.name}
        </option>
      ))}
    </select>
  )
}

export { Tokens }
