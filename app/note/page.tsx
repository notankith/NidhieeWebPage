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
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative">
      <motion.div
        className="max-w-2xl w-full bg-[#D7C0AE] backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#9E7676] mb-8">Happy Birthday,Mwole!</h1>

        <div className="space-y-6">
          <p className="typing-effect text-lg md:text-xl text-[#354259] leading-relaxed">So First Of All!</p>

          <motion.p
            className="text-lg md:text-xl text-[#594545] leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Happy Birthdayyy! :D
          </motion.p>

          <motion.p
            className="text-lg md:text-xl text-[#594545] leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            And since you told gifting handmade origami stuffs are more valuable! this is my version of handmade origami gifts but digital and remote (yeh i put some serious efforts making this)
          </motion.p>

          <motion.p
            className="text-lg md:text-xl text-[#594545] leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 3, duration: 1 }}
          >
            also this website idea thing could be cheesy or wtv in your POV but atleast i made some efforts to gift or show you something😭
          </motion.p>

          <motion.p
            className="text-lg md:text-xl text-right font-medium text-periwinkle"
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
        className="mt-8 py-3 px-8 bg-gradient-to-r from-periwinkle to-rose-gold text-white text-xl rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
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
        Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl pointer-events-none"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
              opacity: 0,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 3 + Math.random() * 5,
              delay: Math.random() * 5,
            }}
          >
            {["❤️", "🧡", "💛", "💚", "💙", "💜", "🤎", "🖤", "🤍", "💖"][Math.floor(Math.random() * 10)]}
          </motion.div>
        ))}
    </main>
  )
}

