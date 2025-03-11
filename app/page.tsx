"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Confetti from "./components/confetti"
import { useMusic } from "./context/music-context"

export default function LandingPage() {
  const router = useRouter()
  const [showMusicSelector, setShowMusicSelector] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { selectedMusic, setSelectedMusic } = useMusic()

  // Navigate to the next page
  const handleBegin = () => {
    router.push("/note")
  }

  // Show music selector when page loads
  useEffect(() => {
    setIsMounted(true)
    const timer = setTimeout(() => {
      setShowMusicSelector(true)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      <Confetti />

      {/* Greeting Text */}
      <motion.h1
        className="text-3xl md:text-7xl font-bold mb-8 text-center"
        style={{ color: "#5C7285" }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Helew Sreekutti
      </motion.h1>

      <motion.div
        className="text-2xl md:text-3xl mb-12 text-center"
        style={{ color: "#5C7285" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        You're Turning 18 ?!?!
      </motion.div>

      {/* Music Selector */}
      {showMusicSelector && !selectedMusic && (
        <motion.div
          className="bg-[#E5E1DA] backdrop-blur-sm p-6 rounded-xl shadow-lg mb-8 max-w-md w-full" 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-center mb-4">Choose some music to make this more dramatic</h2> 
          <div className="grid grid-cols-1 gap-3"> 
            {[
              {
                name: "Margaret Lana Del Rey",
                src: "https://raw.githubusercontent.com/notankith/Web-Hosting-Resource/main/music4.mp3",
              },
              {
                name: "Cinnamon Girl",
                src: "https://raw.githubusercontent.com/notankith/Web-Hosting-Resource/main/music1.mp3",
              },
              { name: "Sex Drugs Etc", src: "https://raw.githubusercontent.com/notankith/Web-Hosting-Resource/main/music3.mp3" },
              {
                name: "End Of Beginning",
                src: "https://raw.githubusercontent.com/notankith/Web-Hosting-Resource/main/music2.mp3",
              },
              { name: "No Music (you're boring)", src: "" },
            ].map((music, index) => (
              <button
                key={index}
                className="py-2 px-4 bg-gradient-to-r bg-[#987D9A] text-white rounded-lg hover:opacity-90 transition-all"
                onClick={() => setSelectedMusic(music.src)}
              >
                {music.name}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Begin Button */}
      <motion.button
        className="mt-8 py-3 px-8 bg-gradient-to-r bg-[#F7F5EB] text-black text-xl rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={handleBegin}
      >
        Tap to Begin
      </motion.button>

      
    </main>
  )
}

