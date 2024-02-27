import { api } from '../../lib/api'
import toast from 'react-hot-toast'

const actionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  UPVOTE_THREAD: 'UPVOTE_THREAD',
  DOWNVOTE_THREAD: 'DOWNVOTE_THREAD',
  UNVOTE_THREAD: 'UNVOTE_THREAD'
}

const voteType = {
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

function upVoteThread({ threadId, userId }) {
  return {
    type: actionType.UPVOTE_THREAD,
    payload: {
      threadId,
      userId
    }
  }
}

function unvoteThread({ threadId, userId }) {
  return {
    type: actionType.UNVOTE_THREAD,
    payload: {
      threadId,
      userId
    }
  }
}

function downVoteThread({ threadId, userId }) {
  return {
    type: actionType.DOWNVOTE_THREAD,
    payload: {
      threadId,
      userId
    }
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

function asyncUpvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    if (!authUser) {
      toast.error('You need to login first')
      return
    }
    dispatch(upVoteThread({ threadId, userId: authUser.id }))
    try {
      await api.upVoteThread(threadId)
    } catch (error) {
      toast.error(error.message)
      dispatch(unvoteThread({ threadId, userId: authUser.id }))
    }
  }
}

function asyncDownvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    if (!authUser) {
      toast.error('You need to login first')
      return
    }
    dispatch(downVoteThread({ threadId, userId: authUser.id }))
    try {
      await api.downVoteThread(threadId)
    } catch (error) {
      toast.error(error.message)
      dispatch(unvoteThread({ threadId, userId: authUser.id }))
    }
  }
}

function asyncUnvoteThread({ threadId, previousVoteType }) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(unvoteThread({ threadId, userId: authUser.id }))
    try {
      await api.unvoteThread(threadId)
    } catch (error) {
      toast.error(error.message)
      if (previousVoteType === voteType.UPVOTE) {
        dispatch(upVoteThread({ threadId, userId: authUser.id }))
      }
      if (previousVoteType === voteType.DOWNVOTE) {
        dispatch(downVoteThread({ threadId, userId: authUser.id }))
      }
    }
  }
}

export {
  actionType,
  receiveThreads,
  addThread,
  upVoteThread,
  downVoteThread,
  unvoteThread,
  asyncReceiveThreads,
  asyncUpvoteThread,
  asyncDownvoteThread,
  asyncUnvoteThread
}
