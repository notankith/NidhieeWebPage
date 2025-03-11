"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function GalleryPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Sample images - replace with actual images
  const images = [
    {
      src: "/1.png?height=600&width=800",
      caption: "Remember Onam? :)",
    },
    {
      src: "/2.png?height=600&width=800",
      caption: "OMGG ankith gave you flowers?!? how sweet of him!",
    },
    {
      src: "/3.png?height=600&width=800",
      caption: "okay yeh i was scared of your mum!",
    },
    {
      src: "/4.png?height=600&width=800",
      caption: "First time we actually hung out! :)",
    },
    {
      src: "/22.png?height=600&width=800",
      caption: "Arghh US 4!",
    },
  ]

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    router.push("/game")
  }

  return (
    <main 
      className="flex min-h-screen flex-col items-center justify-center p-4 relative bg-cover bg-center"
      style={{
        backgroundImage: `url('https://i.imgur.com/vkdNRPU.jpeg')`
      }}
    >
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center text-[#F5F5DC]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
        transition={{ duration: 0.8 }}
      >
        Oh take a look at these
      </motion.h1>

      <motion.div
        className="relative w-full max-w-3xl aspect-[4/3] rounded-xl overflow-hidden shadow-2xl mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
          >
            <Image
              src={images[currentIndex].src || "/placeholder.svg"}
              alt={`Memory ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority
            />

            {/* Image caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
              <p className="text-lg md:text-xl text-center">{images[currentIndex].caption}</p>
            </div>

            {/* Sparkle effect */}
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-white rounded-full"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: Math.random() * 3,
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-periwinkle/30 backdrop-blur-sm p-2 rounded-full hover:bg-periwinkle/50 transition-colors"
          onClick={prevImage}
          aria-label="Previous image"
        >
          <ChevronLeft className="text-white" size={24} />
        </button>

        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-periwinkle/30 backdrop-blur-sm p-2 rounded-full hover:bg-periwinkle/50 transition-colors"
          onClick={nextImage}
          aria-label="Next image"
        >
          <ChevronRight className="text-white" size={24} />
        </button>
      </motion.div>

      {/* Image counter */}
      <motion.div
        className="mb-8 text-lg text-taupe"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {currentIndex + 1} / {images.length}
      </motion.div>

      <motion.button
        className="py-3 px-8 bg-gradient-to-r from-periwinkle to-rose-gold text-white text-xl rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        onClick={handleNext}
      >
        Next
      </motion.button>
    </main>
  )
}
