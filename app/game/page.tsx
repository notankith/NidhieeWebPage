"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function GamePage() {
  const router = useRouter()
  const [hearts, setHearts] = useState<
    Array<{
      id: number
      x: number
      y: number
      emoji: string
      message: string
      popped: boolean
    }>
  >([])
  const [poppedCount, setPoppedCount] = useState(0)
  const [showMessage, setShowMessage] = useState<{ show: boolean; message: string; x: number; y: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  const messages = [
    "You're amazing!",
    "Happy Birthday!",
    "I WANT HOTWHEELS",
    "You're officially an aunt",
    "yeh i like your specs :D",
    "Sreekutti>>Nidhi",
    "hope youve got a lovely year ahead",
    "you are adipwoli!",
    "you're 5'0 <3",
    "also im skider man",
  ]

  const heartEmojis = [
    "❤️", "🧡", "💛", "💚", "💙", 
    "💜", "🤎", "🖤", "🤍", "💖", 
    "💗", "💓", "💕"
  ]

  useEffect(() => {
    setIsMounted(true)

    if (!containerRef.current) return

    const container = containerRef.current
    const containerWidth = container.clientWidth
    const containerHeight = window.innerHeight - 200 // Account for header and padding

    const padding = 50 // Reduced padding to keep hearts more centered
    const heartSize = 60 // Approximate size of heart emoji at text-6xl

    const newHearts = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: padding + Math.random() * (containerWidth - padding * 2 - heartSize),
      y: padding + Math.random() * (containerHeight - padding * 2 - heartSize),
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      message: messages[i % messages.length],
      popped: false,
    }))

    setHearts(newHearts)
  }, [])

  const popHeart = (id: number, x: number, y: number) => {
    setHearts((prev) => prev.map((heart) => 
      heart.id === id ? { ...heart, popped: true } : heart
    ))

    setPoppedCount((prev) => prev + 1)

    const heart = hearts.find((h) => h.id === id)
    if (heart) {
      setShowMessage({
        show: true,
        message: heart.message,
        x: Math.min(Math.max(x, 100), window.innerWidth - 100), // Keep message on screen
        y: Math.min(Math.max(y, 100), window.innerHeight - 100),
      })

      // Increased duration to 3.5 seconds
      setTimeout(() => {
        setShowMessage(null)
      }, 3500)
    }
  }

  useEffect(() => {
    if (poppedCount === 10) {
      const timer = setTimeout(() => {
        router.push("/playlist")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [poppedCount, router])

  return (
    <main
      ref={containerRef}
      className="flex min-h-screen flex-col items-center justify-start p-4 relative overflow-hidden"
      style={{ position: 'relative', maxHeight: '100vh' }}
    >
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center text-[#BAABDA] mb-4 mt-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Pop the Hearts!
      </motion.h1>

      <motion.p
        className="text-lg text-center mb-8 text-[#BAABDA]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Tap each heart to reveal a special message
      </motion.p>

      {isMounted && (
        <div className="relative flex-1 w-full" style={{ height: 'calc(100vh - 200px)' }}>
          {hearts.map((heart) => (
            <AnimatePresence key={heart.id}>
              {!heart.popped && (
                <motion.div
                  className="absolute cursor-pointer text-5xl md:text-6xl flex items-center justify-center"
                  style={{
                    left: heart.x,
                    top: heart.y,
                  }}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    y: [0, -10, 0, -5, 0],
                  }}
                  exit={{
                    scale: 1.5,
                    opacity: 0,
                  }}
                  transition={{
                    y: {
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2 + Math.random() * 2,
                      repeatType: "reverse",
                    },
                  }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    popHeart(heart.id, rect.left + rect.width / 2, rect.top)
                  }}
                >
                  {heart.emoji}
                </motion.div>
              )}
            </AnimatePresence>
          ))}

          <AnimatePresence>
            {showMessage && (
              <motion.div
                className="absolute bg-[#6a58ac] backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg text-lg font-medium text-[#BAABDA] z-10"
                style={{
                  left: showMessage.x,
                  top: showMessage.y - 50,
                  transform: "translate(-50%, -100%)",
                }}
                initial={{ opacity: 0, scale: 0.5, y: 0 }}
                animate={{ opacity: 1, scale: 1, y: -20 }}
                exit={{ opacity: 0, scale: 0.5, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {showMessage.message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="fixed bottom-8 left-0 right-0 flex justify-center">
        <motion.div
          className="bg-periwinkle/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-lg font-medium text-white">{poppedCount} / 10 hearts popped</p>
        </motion.div>
      </div>

      <AnimatePresence>
        {poppedCount === 10 && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-lavender p-8 rounded-2xl shadow-2xl max-w-md text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-[#DE8971] mb-4">Good Girl!</h2>
              <p className="text-lg mb-6 text-[#8F4068]">You found all the birthday messages!</p>
              <p className="text-lg mb-6 text-[#8F4068]">Moving to the next surprise...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}