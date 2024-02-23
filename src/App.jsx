import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import FallbackPage from './pages/FallbackPage'

function App() {
  const [authUser] = useState(true)

  if (!authUser) {
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
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
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/threads/create" element={<h1>New Threads</h1>} />
        <Route path="/threads/:id" element={<h1>Thread Detail</h1>} />
        <Route path="/leaderboards" element={<h1>Leaderboards</h1>} />
        <Route path="/*" element={<FallbackPage />} />
      </Routes>
    </Layout>
  )
}

export default App
