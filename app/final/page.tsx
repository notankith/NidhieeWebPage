"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "../components/confetti"

export default function FinalPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showReplay, setShowReplay] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setIsLoaded(true)
    setIsMounted(true)

    // Show replay button after video ends
    const timer = setTimeout(() => {
      setShowReplay(true)
    }, 10000) // Adjust based on actual video length

    return () => clearTimeout(timer)
  }, [])

  const handleReplay = () => {
    window.location.href = "/"
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      <Confetti />

      <motion.div
        className="max-w-4xl w-full text-center mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#9D5353] mb-4">Happy Birthday Nidhiee ♡</h1>
        <p className="text-xl md:text-2xl text-[#9D5353]">you are 18 and 5'0 btw :D </p>
      </motion.div>

      {/* Video - using local file */}
      <motion.div
        className="w-full max-w-3xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <video ref={videoRef} className="w-full h-full object-cover" autoPlay controls playsInline>
          <source src="/77.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      <motion.div
        className="max-w-2xl w-full bg-[#DFD3C3] backdrop-blur-sm p-6 rounded-xl shadow-lg mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <p className="text-lg md:text-xl text-center text-[#8E806A] leading-relaxed">
          Also here is an edit. Coz this is supposed to be like a gift or wtv but anw HAPPY BIRTHDAY YOU'RE 18! AND BLESSINGS :)
        </p>
      </motion.div>

      <AnimatePresence>
        {showReplay && (
          <motion.button
            className="py-3 px-8 bg-gradient-to-r from-periwinkle to-rose-gold text-white text-xl rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={handleReplay}
          >
            Replay (if you want to 🥴 )
          </motion.button>
        )}
      </AnimatePresence>

      {/* Animated hearts and fireworks */}
      <div className="fixed inset-0 pointer-events-none">
        {isMounted &&
          Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                y: (typeof window !== "undefined" ? window.innerHeight : 800) + 100,
                opacity: 0,
              }}
              animate={{
                y: -100,
                opacity: [0, 1, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 4 + Math.random() * 4,
                delay: Math.random() * 10,
              }}
            >
              {
                ["❤️", "🧡", "💛", "💚", "💙", "💜", "🤎", "🖤", "🤍", "💖", "🎉", "🎊", "✨", "🎂", "🎁"][
                  Math.floor(Math.random() * 15)
                ]
              }
            </motion.div>
          ))}
      </div>
    </main>
  )
}

