import axios from 'axios'

const API_BASE_URL = 'https://forum-api.dicoding.dev/v1'

export const api = (() => {
  const getAccessToken = () => {
    return localStorage.getItem('accessToken')
  }

  const putAccessToken = (token) => {
    return localStorage.setItem('accessToken', token)
  }

  const removeAccessToken = () => {
    return localStorage.removeItem('accessToken')
  }

  const _axiosWithAuth = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`
    }
  })

  const _axios = axios.create({
    baseURL: API_BASE_URL
  })

  const register = async ({ name, email, password }) => {
    const { data: response } = await _axios.post('/register', {
      name,
      email,
      password
    })

    const { data, message, status } = response
    if (status === 'success') {
      throw new Error(message)
    }

    const { user } = data
    return user
  }

  const login = async ({ email, password }) => {
    const { data: response } = await _axios.post('/login', {
      email,
      password
    })

    const { data, message, status } = response
    if (status === 'success') {
      throw new Error(message)
    }

    const { token } = data
    return token
  }

  const getUserOwnProfile = async () => {
    const { data: response } = await _axiosWithAuth.get('/users/me')

    const { data, message, status } = response
    if (status === 'error') {
      throw new Error(message)
    }

    const { user } = data
    return user
  }

  const getAllUsers = async () => {
    const { data: response } = await _axiosWithAuth.get('/users')

    const { data, message, status } = response
    if (status === 'error') {
      throw new Error(message)
    }

    const { users } = data
    return users
  }

  const createThread = async ({ title, body, category }) => {
    const { data: response } = await _axiosWithAuth.post('/threads', {
      title,
      body,
      category
    })

    const { data, message, status } = response
    if (status === 'error') {
      throw new Error(message)
    }

    const { thread } = data
    return thread
  }

  const getAllThreads = async () => {
    const { data: response } = await _axios.get('/threads')

    const { data, message, status } = response
    if (status === 'error') {
      throw new Error(message)
    }

    const { threads } = data
    return threads
  }

  const getThreadDetail = async (threadId) => {
    const { data: response } = await _axios.get(`/threads/${threadId}`)

    const { data, message, status } = response
    if (status === 'error') {
      throw new Error(message)
    }

    const { detailThread } = data
    return detailThread
  }

  const createComment = async ({ threadId, content }) => {
    const { data: response } = await _axiosWithAuth.post(`/threads/${threadId}/comments`, {
      content
    })

    const { data, message, status } = response
    if (status === 'error') {
      throw new Error(message)
    }

    const { comment } = data
    return comment
  }

  const upVoteThread = async (threadId) => {
    const { data: response } = await _axiosWithAuth.post(`/threads/${threadId}/up-vote`)

    const { data, message, status } = response
    if (status === 'error') {
      throw new Error(message)
    }

    const { vote } = data
    return vote
  }

  const downVoteThread = async (threadId) => {
    const { data: response } = await _axiosWithAuth.post(`/threads/${threadId}/down-vote`)

    const { data, message, status } = response
    if (status === 'error') {
      throw new Error(message)
    }

    const { vote } = data
    return vote
  }

  const unvoteThread = async (threadId) => {
    const { data: response } = await _axiosWithAuth.post(`/threads/${threadId}/neutral-vote`)

    const { data, message, status } = response
    if (status === 'error') {
      throw new Error(message)
    }

    const { vote } = data
    return vote
  }

  const upVoteComment = async (threadId, commentId) => {
    const { data: response } = await _axiosWithAuth.post(`/threads/${threadId}/comments/${commentId}/up-vote`)

    const { data, message, status } = response
    if (status === 'error') {
      throw new Error(message)
    }

    const { vote } = data
    return vote
  }

  const downVoteComment = async (threadId, commentId) => {
    const { data: response } = await _axiosWithAuth.post(`/threads/${threadId}/comments/${commentId}/down-vote`)

    const { data, message, status } = response
    if (status === 'error') {
      throw new Error(message)
    }

    const { vote } = data
    return vote
  }

  const unvoteComment = async (threadId, commentId) => {
    const { data: response } = await _axiosWithAuth.post(`/threads/${threadId}/comments/${commentId}/neutral-vote`)

    const { data, message, status } = response
    if (status === 'error') {
      throw new Error(message)
    }

    const { vote } = data
    return vote
  }

  const getLeaderboards = async () => {
    const { data: response } = await _axios.get('/leaderboards')
    const { data, message, status } = response
    if (status === 'error') {
      throw new Error(message)
    }
    const { leaderboards } = data
    return leaderboards
  }

  return {
    getAccessToken,
    putAccessToken,
    removeAccessToken,
    register,
    login,
    getUserOwnProfile,
    getAllUsers,
    createThread,
    getAllThreads,
    getThreadDetail,
    createComment,
    upVoteThread,
    downVoteThread,
    unvoteThread,
    upVoteComment,
    downVoteComment,
    unvoteComment,
    getLeaderboards
  }
})()
