import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { api } from '../../lib/api'
import { asyncSetAuthUser, asyncUnsetAuthUser, setAuthUser, unsetAuthUser } from './action'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import toast from 'react-hot-toast'

const fakeUserProfileResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg'
}

const fakeLoginResponse = 'userAccessToken'

const fakeErrorResponse = {
  response: {
    data: {
      message: 'login failed'
    }
  }
}

describe('asyncSetAuthUser thunk', () => {
  const dispatch = vi.fn()

  beforeEach(() => {
    api._getuserOwnProfile = api.getUserOwnProfile
    api._login = api.login
    api._putAccessToken = api.putAccessToken
    api._removeAccessToken = api.removeAccessToken
    toast._success = toast.success
    toast._error = toast.error
  })

  afterEach(() => {
    vi.restoreAllMocks()

    api.getUserOwnProfile = api._getuserOwnProfile
    api.login = api._login
    api.putAccessToken = api._putAccessToken
    api.removeAccessToken = api._removeAccessToken
    toast.success = toast._success
    toast.error = toast._error

    delete api._getuserOwnProfile
    delete api._login
    delete api._putAccessToken
    delete api._removeAccessToken
    delete toast._success
    delete toast._error
  })

  it('should dispatch actions and toast success correctly when login is successful', async () => {
    let localAccessToken
    const thunkPayload = {
      email: 'john@example.com',
      password: 'password'
    }

    toast.success = vi.fn()
    api.login = vi.fn().mockResolvedValue(fakeLoginResponse)
    api.getUserOwnProfile = vi.fn().mockResolvedValue(fakeUserProfileResponse)
    api.putAccessToken = vi.fn().mockImplementation((token) => {
      localAccessToken = token
    })

    await asyncSetAuthUser(thunkPayload)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(setAuthUser(fakeUserProfileResponse))
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
    expect(localAccessToken).toEqual(fakeLoginResponse)
    expect(toast.success).toHaveBeenCalledWith('Logged in')
  })

  it('should dispatch actions and toast error correctly when login is failed', async () => {
    toast.error = vi.fn()
    api.login = vi.fn().mockRejectedValue(fakeErrorResponse)

    await asyncSetAuthUser({ email: '', password: '' })(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.response.data.message)
  })
})

describe('asyncUnsetAuthUser thunk', () => {
  beforeEach(() => {
    api._removeAccessToken = api.removeAccessToken
    toast._success = toast.success
  })

  afterEach(() => {
    api.removeAccessToken = api._removeAccessToken
    toast.success = toast._success

    delete api._removeAccessToken
    delete toast._success
  })

  it('should dispatch actions, remove access token, and toast success correctly when user is logged out', async () => {
    let localAccessToken = 'userAccessToken'

    api.removeAccessToken = vi.fn().mockImplementation(() => (localAccessToken = null))
    toast.success = vi.fn()
    const dispatch = vi.fn()

    await asyncUnsetAuthUser()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(unsetAuthUser())
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
    expect(localAccessToken).toBeNull()
    expect(toast.success).toHaveBeenCalledWith('Logged out')
  })
})
