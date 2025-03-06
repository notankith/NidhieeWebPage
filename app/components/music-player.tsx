"use client"

import { Music, Volume2, VolumeX } from "lucide-react"
import { useMusic } from "../context/music-context"

export default function MusicPlayer() {
  const { selectedMusic, isPlaying, togglePlay, volume, setVolume } = useMusic()

  if (!selectedMusic) return null

  return (
    <div className="fixed bottom-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg z-50 flex items-center space-x-2">
      <button
        onClick={togglePlay}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <Music size={20} className={isPlaying ? "text-pink-600" : "text-gray-600"} />
      </button>

      <button
        onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        aria-label={volume === 0 ? "Unmute" : "Mute"}
      >
        {volume === 0 ? (
          <VolumeX size={20} className="text-gray-600" />
        ) : (
          <Volume2 size={20} className="text-gray-600" />
        )}
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
        className="w-20 accent-pink-600"
        aria-label="Volume control"
      />
    </div>
  )
}

