import { Children, useEffect, useState, type ReactNode } from 'react'
import { useSwipeable } from 'react-swipeable'
import './HomePage.css'

const INTERVAL_MS = 5000

// Carrossel da home: troca de slide a cada 5 segundos, por arrasto (celular) ou pelos pontos
export default function Slider({ children }: { children: ReactNode }) {
  const slides = Children.toArray(children)
  const [current, setCurrent] = useState(0)
  const go = (index: number) => setCurrent((index + slides.length) % slides.length)

  // reinicia a contagem sempre que o slide muda (inclusive quando a pessoa troca na mão)
  useEffect(() => {
    const timer = setTimeout(() => setCurrent((c) => (c + 1) % slides.length), INTERVAL_MS)
    return () => clearTimeout(timer)
  }, [current, slides.length])

  const handlers = useSwipeable({
    onSwipedLeft: () => go(current + 1),
    onSwipedRight: () => go(current - 1),
  })

  return (
    <div className="slider-parent">
      <div className="slider-container" {...handlers}>
        {slides[current]}
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === current ? 'active' : ''}`}
              onClick={() => go(index)}
              aria-label={`Ir para o slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
