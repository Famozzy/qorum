import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Layout from './Layout'
import FallbackPage from './pages/FallbackPage'
import HomePage from './pages/HomePage'
import LeaderboardsPage from './pages/LeaderboardsPage'
import { asyncPreloadProcess } from './states/isPreload/action'
import CreateThreadPage from './pages/CreateThreadPage'

function App() {
  const { authUser, isPreload } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncPreloadProcess())
  }, [dispatch])

  if (isPreload) {
    return null
  }

  if (!authUser) {
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/threads/:id" element={<h1>Thread Detail</h1>} />
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/register" element={<h1>Signup</h1>} />
          <Route path="/*" element={<FallbackPage />} />
        </Routes>
      </Layout>
    )
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/threads/new" element={<CreateThreadPage />} />
        <Route path="/threads/:id" element={<h1>Thread Detail</h1>} />
        <Route path="/leaderboards" element={<LeaderboardsPage />} />
        <Route path="/*" element={<FallbackPage />} />
      </Routes>
    </Layout>
  )
}

export default App
