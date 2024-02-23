import { api } from '../../lib/api'
import toast from 'react-hot-toast'
import { addThread, receiveThreads } from '../threads/action'
import { addCategory, receiveCategories } from '../categories/action'
import { receiveUsers } from '../users/action'

function asyncPopulateData() {
  return async (dispatch) => {
    try {
      const threads = await api.getAllThreads()
      const users = await api.getAllUsers()
      const categories = threads
        .filter((thread, index) => threads.indexOf(thread) === index)
        .map((thread) => thread.category)

      dispatch(receiveCategories(categories))
      dispatch(receiveThreads(threads))
      dispatch(receiveUsers(users))
    } catch (error) {
      toast.error(error.message)
    }
  }
}

function asyncCreateThreadAndCategory({ title, body, category }) {
  return async (dispatch, getState) => {
    const { categories } = getState()
    const isCategoryExist = categories.some((c) => c.id === category)

    try {
      const newThread = await api.createThread({ title, body, category })
      if (!isCategoryExist) {
        dispatch(addCategory(newThread.category))
      }
      dispatch(addThread(newThread))
    } catch (error) {
      toast.error(error.message)
    }
  }
}

export { asyncPopulateData, asyncCreateThreadAndCategory }
