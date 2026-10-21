import { useSyncExternalStore } from 'react'

// Substitui o useMediaQuery do Material UI (era a única coisa usada da biblioteca)
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => matchMedia(query).matches,
  )
}
