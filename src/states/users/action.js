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

function asyncRegisterUser(user) {
  return async (dispatch) => {
    try {
      const newUser = await api.registerUser(user)
      dispatch(receiveUsers([newUser]))
    } catch (error) {
      toast.error(error.message)
    }
  }
}

export { actionType, receiveUsers, asyncRegisterUser }
