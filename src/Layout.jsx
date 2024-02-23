import React from 'react'
import { Toaster } from 'react-hot-toast'
import AppHeader from './components/AppHeader'
import AppNavigation from './components/AppNavigation'

export default function Layout({ children }) {
  return (
    <>
      <Toaster />
      <main>
        <AppHeader />
        <div className="max-w-2xl m-auto pt-14 min-h-dvh">{children}</div>
        <AppNavigation />
      </main>
    </>
  )
}
