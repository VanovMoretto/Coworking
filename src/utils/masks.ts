// Máscaras de digitação: "9" aceita um dígito, qualquer outro caractere é fixo.
// Substituem o react-text-mask, que não funciona no React 19.
export const masks = {
  phone: '(99) 99999-9999',
  cpf: '999.999.999-99',
}

export function applyMask(value: string, mask: string) {
  const digits = value.replace(/\D/g, '')
  let out = ''
  let d = 0
  for (const ch of mask) {
    if (d >= digits.length) break
    if (ch === '9') out += digits[d++]
    else out += ch
  }
  return out
}
