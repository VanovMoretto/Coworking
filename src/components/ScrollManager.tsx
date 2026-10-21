import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Ao trocar de página, volta para o topo; com #âncora (ex.: "Sobre" → /#about), rola até a seção
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const target = hash && document.getElementById(hash.slice(1))
    if (target) target.scrollIntoView({ behavior: 'smooth' })
    else scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [pathname, hash])

  return null
}
