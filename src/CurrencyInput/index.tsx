import type { ChangeEvent } from 'react'

type Currency = 'USD' | 'SGD'

const currencySymbols: Record<Currency, string> = {
  USD: '$',
  SGD: 'S$',
}

interface CurrencyInputProps {
  onChange: (value: string) => void
  value: string
  defaultValue?: string
  placeholder?: string
  currency: Currency
}

const CurrencyInput = ({
  onChange,
  defaultValue,
  placeholder,
  value,
  currency,
}: CurrencyInputProps) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }
  return (
    <div className='border-1 rounded-md flex items-center'>
      <div className='text-sm pl-4 text-gray-400'>
        {currency}({currencySymbols[currency]})
      </div>
      <input
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        type='number'
        onChange={handleInputChange}
        className='p-2 w-full rounded-md bg-white text-lg focus:outline-none'
      />
    </div>
  )
}

export { CurrencyInput }
