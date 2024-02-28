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
  return async () => {
    try {
      await api.register({ name, email, password })
      toast.success('successfully registered')
      return { error: false }
    } catch (error) {
      toast.error(error.response.data.message)
      return { error: true }
    }
  }
}

export { actionType, receiveUsers, asyncRegisterUser }
