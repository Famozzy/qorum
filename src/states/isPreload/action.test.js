import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { api } from '../../lib/api'
import { asyncPreloadProcess, setIsPreload } from './action'
import { setAuthUser } from '../authUser/action'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const fakeSuccessResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg'
}

describe('asyncPreloadProcess thunk', () => {
  const dispatch = vi.fn()

  beforeEach(() => {
    api._getUserOwnProfile = api.getUserOwnProfile
  })

  afterEach(() => {
    vi.restoreAllMocks()
    api.getUserOwnProfile = api._getUserOwnProfile
    delete api._getUserOwnProfile
  })

  it('should dispatch actions correctly when getUserOwnProfile is successful', async () => {
    api.getUserOwnProfile = vi.fn().mockResolvedValue(fakeSuccessResponse)

    await asyncPreloadProcess()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(setAuthUser(fakeSuccessResponse))
    expect(dispatch).toHaveBeenCalledWith(setIsPreload(false))
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('should dispatch actions correctly when getUserOwnProfile is failed', async () => {
    api.getUserOwnProfile = vi.fn().mockRejectedValue(new Error('fail'))

    await asyncPreloadProcess()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(setAuthUser(null))
    expect(dispatch).toHaveBeenCalledWith(setIsPreload(false))
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})
