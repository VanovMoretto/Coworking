import { useEffect } from 'react'

// Trava a rolagem da página enquanto um modal, menu ou painel está aberto.
// Usa um contador: antes, cada componente mexia em body.style.overflow por conta própria,
// e um fechava a trava do outro.
let locks = 0

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    locks++
    document.body.style.overflow = 'hidden'
    return () => {
      locks--
      if (locks === 0) document.body.style.overflow = ''
    }
  }, [locked])
}
