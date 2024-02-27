import React from 'react'
import AppHeader from './components/AppHeader'
import AppNavigation from './components/AppNavigation'
import AppToaster from './components/AppToaster'
import PropTypes from 'prop-types'

export default function Layout({ children }) {
  return (
    <>
      <AppToaster />
      <main>
        <AppHeader />
        <div className="max-w-2xl m-auto pt-16 min-h-dvh px-2.5 border border-neutral">{children}</div>
        <AppNavigation />
      </main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
