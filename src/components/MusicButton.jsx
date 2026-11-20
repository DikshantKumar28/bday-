import { useAudio } from '../context/AudioContext'
import './MusicButton.css'

const MusicButton = () => {
  const { isPlaying, togglePlay } = useAudio()

  return (
    <button
      type="button"
      className={`music-btn ${isPlaying ? 'is-playing' : 'is-paused'}`}
      onClick={togglePlay}
      aria-label={isPlaying ? 'Pause birthday music' : 'Play birthday music'}
      title={isPlaying ? 'Pause birthday music' : 'Play birthday music'}
    >
      <span className="music-btn__tape" aria-hidden="true" />
      <span className="music-btn__icon" aria-hidden="true">
        {isPlaying ? '🎵' : '🔇'}
      </span>
      <span className="music-btn__waves" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className="music-btn__text">
        {isPlaying ? 'Music On' : 'Play Music'}
      </span>
    </button>
  )
}

export default MusicButton
