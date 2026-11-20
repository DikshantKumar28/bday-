import { useLocation } from 'react-router'
import { useEffect, useRef, useState } from 'react'
import '../HeartTransition.css'

const HeartTransition = ({ children }) => {
  const location = useLocation()
  const previousPathname = useRef(location.pathname)
  const [showTransition, setShowTransition] = useState(false)

  useEffect(() => {
    // Skip initial page load and ignore hash changes within the same page
    if (previousPathname.current === location.pathname) return

    previousPathname.current = location.pathname
    setShowTransition(true)

    // Fastened animation: 1.8s (down from 5.0s) for a smoother, faster transition
    const timer = setTimeout(() => {
      setShowTransition(false)
    }, 1800)

    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <>
      {showTransition && (
        <div className="route-loader" aria-hidden="true">
          <div className="loader-stage">
            <span className="loader-heart loader-heart--one" />
            <span className="loader-heart loader-heart--two" />

            <svg
              className="heart-loader"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-30 0 120 120"
              version="1.1"
            >
              <g className="heart-loader__group">
                <path
                  className="heart-loader__square"
                  strokeWidth="1"
                  fill="none"
                  d="M0,30 0,90 60,90 60,30z"
                />

                <path
                  className="heart-loader__circle m--left"
                  strokeWidth="1"
                  fill="none"
                  d="M60,60 a30,30 0 0,1 -60,0 a30,30 0 0,1 60,0"
                />

                <path
                  className="heart-loader__circle m--right"
                  strokeWidth="1"
                  fill="none"
                  d="M60,60 a30,30 0 0,1 -60,0 a30,30 0 0,1 60,0"
                />

                <path
                  className="heart-loader__heartPath"
                  strokeWidth="2"
                  d="M60,30 a30,30 0 0,1 0,60 L0,90 0,30 a30,30 0 0,1 60,0"
                />
              </g>
            </svg>
          </div>
        </div>
      )}

      {children}
    </>
  )
}

export default HeartTransition