import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { MusicProvider } from "./context/music-context"
import MusicPlayer from "./components/music-player"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Happy Birthday Nidhi!",
  description: "A special birthday celebration for Nidhi",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MusicProvider>
          {children}
          <MusicPlayer />
        </MusicProvider>
      </body>
    </html>
  )
}



import './globals.css'