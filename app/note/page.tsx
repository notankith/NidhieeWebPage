"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function NotePage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    setIsMounted(true)
  }, [])

  const handleNext = () => {
    router.push("/gallery")
  }

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6"
      style={{
        backgroundImage: `url('https://i.imgur.com/0DwAPoi.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <motion.div
        className="w-full max-w-2xl bg-[#D7C0AE]/80 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#9E7676] mb-6 md:mb-8">
          Happy Birthday, Mwole!
        </h1>

        <div className="space-y-4 sm:space-y-6">
          <p className="text-base sm:text-lg md:text-xl text-[#354259] leading-relaxed">
            So First Of All!
          </p>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-[#594545] leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Happy Birthdayyy! :D
          </motion.p>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-[#594545] leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            And since you told me gifting handmade origami stuff is more valuable, this is my digital and remote version of handmade origami gifts (yep, I put some serious effort into this)!
          </motion.p>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-[#594545] leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 3, duration: 1 }}
          >
            This website idea might seem cheesy or whatever from your POV, but at least I made an effort to gift you something special! 😭
          </motion.p>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-right font-medium text-periwinkle"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 4, duration: 1 }}
          >
            Your Own,
            <br />
            Mr SkiderMan :)
          </motion.p>
        </div>
      </motion.div>

      <motion.button
        className="mt-6 sm:mt-8 py-2 sm:py-3 px-6 sm:px-8 bg-gradient-to-r from-periwinkle to-rose-gold text-white text-base sm:text-xl rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 5, duration: 1 }}
        onClick={handleNext}
      >
        Keep Going
      </motion.button>

      {/* Floating hearts */}
      {isMounted &&
        Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl sm:text-2xl pointer-events-none"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth - 20 : 1000),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight - 20 : 800),
              opacity: 0,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 3 + Math.random() * 3,
              delay: Math.random() * 5,
            }}
          >
            {["❤️", "🧡", "💛", "💚", "💙", "💜", "🤎", "🖤", "🤍", "💖"][Math.floor(Math.random() * 10)]}
          </motion.div>
        ))}
    </main>
  )
}