import { Outlet, useLocation } from 'react-router'
import { useEffect } from 'react'
import HeartTransition from '../components/HeartTransition'
import { useAudio } from '../context/AudioContext'

const Layout = () => {
  const location = useLocation()
  const { resume, pause } = useAudio()

  useEffect(() => {
    if (location.pathname === '/') {
      resume()
    } else {
      pause(false)
    }
  }, [location.pathname, resume, pause])

  return (
    <HeartTransition>
      <Outlet />
    </HeartTransition>
  )
}

export default Layout
