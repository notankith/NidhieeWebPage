// Singleton audio service that persists across page navigations
class AudioService {
  private static instance: AudioService
  private audio: HTMLAudioElement | null = null
  private _src: string | null = null
  private _volume = 0.5
  private _isPlaying = false

  private constructor() {
    // Private constructor to enforce singleton pattern
  }

  public static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService()
    }
    return AudioService.instance
  }

  public get src(): string | null {
    return this._src
  }

  public get volume(): number {
    return this._volume
  }

  public get isPlaying(): boolean {
    return this._isPlaying
  }

  public setSource(src: string | null): void {
    this._src = src

    if (!src) {
      if (this.audio) {
        this.audio.pause()
        this.audio = null
      }
      this._isPlaying = false
      return
    }

    // Create audio element if it doesn't exist or if source changed
    if (!this.audio || this.audio.src !== src) {
      if (this.audio) {
        this.audio.pause()
      }

      this.audio = new Audio(src)
      this.audio.loop = true
      this.audio.volume = this._volume

      // Try to play
      this.play()
    }
  }

  public setVolume(volume: number): void {
    this._volume = volume
    if (this.audio) {
      this.audio.volume = volume
    }
  }

  public play(): void {
    if (this.audio && this._src) {
      this.audio
        .play()
        .then(() => {
          this._isPlaying = true
        })
        .catch((err) => {
          console.error("Failed to play audio:", err)
          this._isPlaying = false
        })
    }
  }

  public pause(): void {
    if (this.audio) {
      this.audio.pause()
      this._isPlaying = false
    }
  }

  public toggle(): void {
    if (this._isPlaying) {
      this.pause()
    } else {
      this.play()
    }
  }
}

// Export a singleton instance
export const audioService = AudioService.getInstance()

