import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { api } from '../../lib/api'
import { asyncReceiveLeaderboards, receiveLeaderboards } from './action'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import toast from 'react-hot-toast'

const fakeleaderboardsResponse = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg'
    },
    score: 10
  },
  {
    user: {
      id: 'users-2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      avatar: 'https://generated-image-url.jpg'
    },
    score: 5
  }
]

const fakeErrorResponse = new Error('Failed to fetch leaderboards')

describe('asyncReceiveLeaderboards thunk', () => {
  const dispatch = vi.fn()

  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards
    toast._error = toast.error
  })

  afterEach(() => {
    vi.restoreAllMocks()
    api.getLeaderboards = api._getLeaderboards
    toast.error = toast._error
    delete api._getLeaderboards
    delete toast._error
  })

  it('should dispatch actions correctly when data is fetched successfully', async () => {
    api.getLeaderboards = vi.fn().mockResolvedValue(fakeleaderboardsResponse)

    await asyncReceiveLeaderboards()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(receiveLeaderboards(fakeleaderboardsResponse))
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('should dispatch actions and toast error correctly when data fetching failed', async () => {
    api.getLeaderboards = vi.fn().mockRejectedValue(fakeErrorResponse)
    toast.error = vi.fn()

    await asyncReceiveLeaderboards()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
    expect(toast.error).toHaveBeenCalledWith('Failed to fetch leaderboards')
  })
})
