import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Layout from './Layout'
import FallbackPage from './pages/FallbackPage'
import HomePage from './pages/HomePage'
import LeaderboardsPage from './pages/LeaderboardsPage'
import { asyncPreloadProcess } from './states/isPreload/action'
import CreateThreadPage from './pages/CreateThreadPage'
import ThreadDetailPage from './pages/ThreadDetailPage'

function App() {
  const { authUser, isPreload } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncPreloadProcess())
  }, [dispatch])

  if (isPreload) {
    return null
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {authUser ? (
          <Route path="/threads/new" element={<CreateThreadPage />} />
        ) : (
          <>
            <Route path="/login" element={<h1>Login</h1>} />
            <Route path="/register" element={<h1>Register</h1>} />
          </>
        )}
        <Route path="/threads/:id" element={<ThreadDetailPage />} />
        <Route path="/leaderboards" element={<LeaderboardsPage />} />
        <Route path="/*" element={<FallbackPage />} />
      </Routes>
    </Layout>
  )
}

export default App
