import { api } from '../../lib/api'
import toast from 'react-hot-toast'
import { addThread, receiveThreads } from '../threads/action'
import { addCategory, receiveCategories } from '../categories/action'
import { receiveUsers } from '../users/action'
import { closeModal } from '../isModalOpen/action'

function asyncPopulateData() {
  return async (dispatch) => {
    try {
      const threads = await api.getAllThreads()
      const users = await api.getAllUsers()
      const categories = threads.map((thread) => thread.category)

      dispatch(receiveCategories([...new Set(categories)]))
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
    const isCategoryExist = categories.include((_category) => _category === category)

    try {
      const newThread = await api.createThread({ title, body, category })
      if (!isCategoryExist) {
        dispatch(addCategory(newThread.category))
      }
      dispatch(addThread(newThread))
      dispatch(closeModal())
      toast.success('Thread has been posted')
    } catch (error) {
      toast.error(error.message)
    }
  }
}

export { asyncPopulateData, asyncCreateThreadAndCategory }
