"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function PlaylistPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    setIsMounted(true)
  }, [])

  const handleNext = () => {
    router.push("/final")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 relative">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center text-[#525E75] mb-4 mt-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
        transition={{ duration: 0.8 }}
      >
        Here Is A Playlist
      </motion.h1>

      <motion.p
        className="text-lg text-center mb-8 text-[#525E75]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        i made you a playlist coz why not? :)
      </motion.p>

      <motion.div
        className="w-full max-w-2xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/playlist/4f8L4BxAeUwL81q1eDE6qw?utm_source=generator&theme=0"
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </motion.div>

      <motion.button
        className="py-3 px-8 bg-gradient-to-r from-periwinkle to-rose-gold text-white text-xl rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        onClick={handleNext}
      >
        Final Surprise
      </motion.button>

      {/* Floating music notes */}
      {isMounted &&
        Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl pointer-events-none"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
              opacity: 0,
              rotate: Math.random() * 360,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.7, 0],
              rotate: Math.random() * 360,
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 3 + Math.random() * 3,
              delay: Math.random() * 5,
            }}
          >
            {["🎵", "🎶", "🎼", "🎹", "🎷", "🎸", "🎺"][Math.floor(Math.random() * 7)]}
          </motion.div>
        ))}
    </main>
  )
}

