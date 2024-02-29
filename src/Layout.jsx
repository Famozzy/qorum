import React from 'react'
import AppHeader from './components/app/AppHeader'
import AppNavigation from './components/app/AppNavigation'
import AppToaster from './components/app/AppToaster'
import PropTypes from 'prop-types'
import AppLoadingBar from './components/app/AppLoadingBar'

export default function Layout({ children }) {
  return (
    <>
      <AppLoadingBar />
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
