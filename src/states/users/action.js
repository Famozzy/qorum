import { api } from '../../lib/api'
import toast from 'react-hot-toast'

const actionType = {
  RECEIVE_USERS: 'RECEIVE_USERS'
}

function receiveUsers(users) {
  return {
    type: actionType.RECEIVE_USERS,
    payload: {
      users
    }
  }
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    try {
      await api.register({ name, email, password })
      dispatch(receiveUsers())
    } catch (error) {
      toast.error(error.message)
    }
  }
}

export { actionType, receiveUsers, asyncRegisterUser }
