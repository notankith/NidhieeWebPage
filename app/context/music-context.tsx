"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"
import { audioService } from "../services/audio-service"

type MusicContextType = {
  selectedMusic: string | null
  setSelectedMusic: (music: string | null) => void
  isPlaying: boolean
  togglePlay: () => void
  volume: number
  setVolume: (volume: number) => void
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export function MusicProvider({ children }: { children: ReactNode }) {
  const [selectedMusic, setSelectedMusic] = useState<string | null>(audioService.src)
  const [isPlaying, setIsPlaying] = useState(audioService.isPlaying)
  const [volume, setVolume] = useState(audioService.volume)

  // Update the audio service when state changes
  useEffect(() => {
    if (selectedMusic !== audioService.src) {
      audioService.setSource(selectedMusic)
      setIsPlaying(audioService.isPlaying)
    }
  }, [selectedMusic])

  useEffect(() => {
    if (volume !== audioService.volume) {
      audioService.setVolume(volume)
    }
  }, [volume])

  // Toggle play/pause
  const togglePlay = () => {
    audioService.toggle()
    setIsPlaying(audioService.isPlaying)
  }

  // Set up event listeners to sync state with audio service
  useEffect(() => {
    const syncState = () => {
      setIsPlaying(audioService.isPlaying)
      setSelectedMusic(audioService.src)
      setVolume(audioService.volume)
    }

    // Check for state changes periodically
    const interval = setInterval(syncState, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <MusicContext.Provider
      value={{
        selectedMusic,
        setSelectedMusic,
        isPlaying,
        togglePlay,
        volume,
        setVolume,
      }}
    >
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const context = useContext(MusicContext)
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider")
  }
  return context
}

