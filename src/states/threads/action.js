import { api } from '../../lib/api'
import toast from 'react-hot-toast'

const actionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_VOTE_THREAD: 'TOGGLE_VOTE_THREAD'
  // TOGGLE_UPVOTE_THREAD: 'TOGGLE_VOTE_THREAD',
  // TOGGLE_DOWNVOTE_THREAD: 'TOGGLE_VOTE_THREAD'
}

const _voteType = {
  UPVOTE: 1,
  NEUTRAL: 0,
  DOWNVOTE: -1
}

function receiveThreads(threads) {
  return {
    type: actionType.RECEIVE_THREADS,
    payload: {
      threads
    }
  }
}

function addThread(thread) {
  return {
    type: actionType.ADD_THREAD,
    payload: {
      thread
    }
  }
}

function toggleVoteThread({ threadId, userId, voteType }) {
  return {
    type: actionType.TOGGLE_VOTE_THREAD,
    payload: { threadId, userId, voteType }
  }
}

function asyncReceiveThreads() {
  return async (dispatch) => {
    try {
      const threads = await api.get('/threads')
      dispatch(receiveThreads(threads))
    } catch (error) {
      toast.error(error.message)
    }
  }
}

function asyncToggleVoteThread(threadId, voteType) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(toggleVoteThread({ threadId, voteType, userId: authUser.id }))
    try {
      if (voteType === _voteType.UPVOTE) {
        await api.upVoteThread(threadId)
      }
      if (voteType === _voteType.DOWNVOTE) {
        await api.downVoteThread(threadId)
      }
      if (voteType === _voteType.NEUTRAL) {
        await api.unvoteThread(threadId)
      }
    } catch (error) {
      toast.error(error.message)
      dispatch(toggleVoteThread({ threadId, voteType, userId: authUser.id }))
    }
  }
}

export { actionType, receiveThreads, addThread, toggleVoteThread, asyncReceiveThreads, asyncToggleVoteThread }
