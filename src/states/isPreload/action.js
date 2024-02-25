import { api } from '../../lib/api'
import { setAuthUser } from '../authUser/action'

const actionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD'
}

function setIsPreload(isPreload) {
  return {
    type: actionType.SET_IS_PRELOAD,
    payload: {
      isPreload
    }
  }
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    try {
      const authUser = await api.getUserOwnProfile()
      dispatch(setAuthUser(authUser))
    } catch (error) {
      dispatch(setAuthUser(null))
    } finally {
      dispatch(setIsPreload(false))
    }
  }
}

export { actionType, setIsPreload, asyncPreloadProcess }
