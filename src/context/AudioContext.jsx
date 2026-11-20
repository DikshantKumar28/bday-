import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import bdaySong from '../assets/bdaysong.mp3'

const AudioContext = createContext(null)

const LOOP_START = 5.0
const LOOP_END = 30.0

// Persistent audio singleton so it begins preloading and playing right as the page starts loading
let sharedAudio = null

const getAudioInstance = () => {
  if (!sharedAudio && typeof Audio !== 'undefined') {
    sharedAudio = new Audio(bdaySong)
    sharedAudio.preload = 'auto'
    sharedAudio.volume = 1.0
    try {
      sharedAudio.currentTime = LOOP_START
    } catch (e) { }
  }
  return sharedAudio
}

// Trigger early playback immediately on script load
if (typeof window !== 'undefined' && typeof Audio !== 'undefined') {
  const earlyAudio = getAudioInstance()
  try {
    earlyAudio.currentTime = LOOP_START
  } catch (e) { }
  earlyAudio.play().catch(() => { })
}

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)
  const userManuallyPaused = useRef(false)

  const checkLoopBounds = useCallback((audio) => {
    if (!audio) return
    try {
      if (audio.currentTime >= LOOP_END || audio.currentTime < LOOP_START) {
        audio.currentTime = LOOP_START
      }
    } catch (e) { }
  }, [])

  const play = useCallback(() => {
    userManuallyPaused.current = false
    const audio = audioRef.current || getAudioInstance()
    if (!audio) return
    checkLoopBounds(audio)
    audio.play()
      .then(() => {
        setIsPlaying(true)
        setAutoplayBlocked(false)
      })
      .catch(() => {
        setIsPlaying(false)
        setAutoplayBlocked(true)
      })
  }, [checkLoopBounds])

  const pause = useCallback((manual = true) => {
    if (manual) {
      userManuallyPaused.current = true
    }
    const audio = audioRef.current || getAudioInstance()
    if (!audio) return
    audio.pause()
    setIsPlaying(false)
  }, [])

  const resume = useCallback(() => {
    if (userManuallyPaused.current) return
    const audio = audioRef.current || getAudioInstance()
    if (!audio) return
    checkLoopBounds(audio)
    if (audio.paused) {
      audio.play()
        .then(() => {
          setIsPlaying(true)
          setAutoplayBlocked(false)
        })
        .catch(() => {
          setIsPlaying(false)
          setAutoplayBlocked(true)
        })
    }
  }, [checkLoopBounds])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current || getAudioInstance()
    if (!audio) return
    if (!audio.paused) {
      pause(true)
    } else {
      play()
    }
  }, [play, pause])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current || getAudioInstance()
    if (!audio) return
    audio.muted = !audio.muted
    setIsMuted(audio.muted)
  }, [])

  useEffect(() => {
    const audio = getAudioInstance()
    audioRef.current = audio

    const handleLoadedMetadata = () => {
      checkLoopBounds(audio)
      if (!userManuallyPaused.current && audio.paused) {
        audio.play()
          .then(() => {
            setIsPlaying(true)
            setAutoplayBlocked(false)
          })
          .catch(() => {
            setIsPlaying(false)
            setAutoplayBlocked(true)
          })
      }
    }

    const handleCanPlay = () => {
      checkLoopBounds(audio)
      if (!userManuallyPaused.current && audio.paused) {
        audio.play()
          .then(() => {
            setIsPlaying(true)
            setAutoplayBlocked(false)
          })
          .catch(() => {
            setIsPlaying(false)
            setAutoplayBlocked(true)
          })
      }
    }

    const handleTimeUpdate = () => {
      // Loop seamlessly between starting 0:00 and 0:20 on repeat mode
      if (audio.currentTime >= LOOP_END) {
        audio.currentTime = LOOP_START
        if (!audio.paused && !userManuallyPaused.current) {
          audio.play().catch(() => { })
        }
      }
    }

    const handleEnded = () => {
      audio.currentTime = LOOP_START
      if (!userManuallyPaused.current) {
        audio.play().catch(() => { })
      }
    }

    const handlePlay = () => {
      setIsPlaying(true)
      setAutoplayBlocked(false)
    }

    const handlePause = () => {
      if (userManuallyPaused.current || audio.paused) {
        setIsPlaying(false)
      }
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    // Unlock listeners for browser autoplay policy — capture phase so it catches first gesture anywhere
    const unlockEvents = ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown']

    const handleFirstGesture = () => {
      if (!userManuallyPaused.current) {
        checkLoopBounds(audio)
        audio.play()
          .then(() => {
            setIsPlaying(true)
            setAutoplayBlocked(false)
          })
          .catch(() => { })
      }
      cleanupGestureListeners()
    }

    const cleanupGestureListeners = () => {
      unlockEvents.forEach((evt) => {
        window.removeEventListener(evt, handleFirstGesture, { capture: true })
      })
    }

    const attachGestureListeners = () => {
      unlockEvents.forEach((evt) => {
        window.addEventListener(evt, handleFirstGesture, { once: true, capture: true, passive: true })
      })
    }

    attachGestureListeners()

    // Trigger playback immediately when AudioProvider mounts
    if (!userManuallyPaused.current) {
      checkLoopBounds(audio)
      audio.play()
        .then(() => {
          setIsPlaying(true)
          setAutoplayBlocked(false)
        })
        .catch(() => {
          setIsPlaying(false)
          setAutoplayBlocked(true)
        })
    }

    return () => {
      cleanupGestureListeners()
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [checkLoopBounds])

  return (
    <AudioContext.Provider value={{ isPlaying, isMuted, autoplayBlocked, play, pause, resume, togglePlay, toggleMute }}>
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
  const context = useContext(AudioContext)
  return context ?? {
    isPlaying: false,
    isMuted: false,
    autoplayBlocked: false,
    play: () => { },
    pause: () => { },
    resume: () => { },
    togglePlay: () => { },
    toggleMute: () => { },
  }
}
