import { api } from '../../lib/api'
import toast from 'react-hot-toast'

const actionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER'
}

function setAuthUser(user) {
  return {
    type: actionType.SET_AUTH_USER,
    payload: { user }
  }
}

function unsetAuthUser() {
  return {
    type: actionType.UNSET_AUTH_USER
  }
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    try {
      const accessToken = await api.login({ email, password })
      console.log(accessToken)
      api.putAccessToken(accessToken)
      const user = await api.getUserOwnProfile()
      dispatch(setAuthUser(user))
      toast.success('Logged in')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    api.removeAccessToken()
    dispatch(unsetAuthUser())
    toast.success('Logged out')
  }
}

export { actionType, setAuthUser, unsetAuthUser, asyncSetAuthUser, asyncUnsetAuthUser }
