"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "../components/confetti"

export default function FinalPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showReplay, setShowReplay] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    setIsMounted(true)

    const timer = setTimeout(() => {
      setShowReplay(true)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  const handleReplay = () => {
    window.location.href = "/"
  }

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url('https://i.imgur.com/JDuFjip.jpeg')`
      }}
    >
      <Confetti />

      <motion.div
        className="max-w-4xl w-full text-center mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#9D5353] mb-4">Happy Birthday Nidhiee ♡</h1>
        <p className="text-xl md:text-2xl text-[#9D5353]">you are 18 and 5'0 btw :D</p>
      </motion.div>

      <motion.div
        className="max-w-2xl w-full bg-[#DFD3C3] backdrop-blur-sm p-6 rounded-xl shadow-lg mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <p className="text-lg md:text-xl text-center text-[#8E806A] leading-relaxed">
        Nidhieee- The best chaos. HAPPY BIRTHDAY GYAL. 🌿✨<br />
          
you are the most adipwoli combination of chaos and kindness and weirdness and smartness and attitude and yeh.
hope you're day is filled with laughter and gifts and songs and your attitude.
Also you're finally 18 and legal. 
so now buy me my RTX 4090 and also BMW M5 and also creatine and also hotwheels and also Ducati Panigale V4R
Have a lovely day 🌷🕊️🌙
        </p>
      </motion.div>

      <AnimatePresence>
        {showReplay && (
          <motion.button
            className="py-3 px-8 bg-gradient-to-r from-[#E9B384] to-[#DFA878] text-white text-xl rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={handleReplay}
          >
            Replay ✧･ﾟ: *✧･ﾟ:* 
          </motion.button>
        )}
      </AnimatePresence>

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
                ["🌷", "🕊️", "🌙", "✨", "🎀", "🌸", "🍒", "🩰", "📖", "🎶", "🌿", "💌", "🤍", "☁️", "🫧"][
                  Math.floor(Math.random() * 15)
                ]
              }
            </motion.div>
          ))}
      </div>
    </main>
  )
}
