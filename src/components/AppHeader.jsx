import React from 'react'
import { MessagesSquare } from 'lucide-react'

export default function AppHeader() {
  return (
    <header className="navbar fixed top-0 left-0 right-0 bg-base-100 backdrop-blur-lg z-50 shadow-sm">
      <div className="container flex justify-center max-w-2xl gap-2">
        <MessagesSquare size={24} className="text-primary" />
        <h1 className="text-xl font-bold">Qorum</h1>
      </div>
    </header>
  )
}
