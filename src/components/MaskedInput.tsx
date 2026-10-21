import type { ChangeEvent, ComponentProps } from 'react'
import { applyMask } from '../utils/masks'

type Props = Omit<ComponentProps<'input'>, 'value' | 'onChange'> & {
  mask: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

// Input que formata o texto enquanto a pessoa digita (telefone, CPF)
export default function MaskedInput({ mask, value, onChange, ...props }: Props) {
  return (
    <input
      {...props}
      inputMode="numeric"
      value={value}
      onChange={(e) => {
        e.target.value = applyMask(e.target.value, mask)
        onChange(e)
      }}
    />
  )
}
