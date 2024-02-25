import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Layout from './Layout'
import FallbackPage from './pages/FallbackPage'
import HomePage from './pages/HomePage'
import CreateThreadModal from './components/CreateThreadModal'
import { asyncPreloadProcess } from './states/isPreload/action'

function App() {
  const authUser = useSelector((state) => state.authUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncPreloadProcess())
  }, [dispatch])

  if (!authUser) {
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/threads/:id" element={<h1>Thread Detail</h1>} />
          <Route path="/leaderboards" element={<h1>Leaderboards</h1>} />
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
        <Route path="/threads/:id" element={<h1>Thread Detail</h1>} />
        <Route path="/leaderboards" element={<h1>Leaderboards</h1>} />
        <Route path="/*" element={<FallbackPage />} />
      </Routes>
      <CreateThreadModal />
    </Layout>
  )
}

export default App
