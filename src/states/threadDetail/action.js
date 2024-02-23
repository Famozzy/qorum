import { api } from '../../lib/api'
import toast from 'react-hot-toast'

const actionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  ADD_THREAD_DETAIL_COMMENT: 'ADD_THREAD_DETAIL_COMMENT',
  UPVOTE_THREAD_DETAIL_COMMENT: 'TOGGLE_VOTE_THREAD_DETAIL_COMMENT',
  DOWNVOTE_THREAD_DETAIL_COMMENT: 'TOGGLE_VOTE_THREAD_DETAIL_COMMENT',
  UNVOTE_THREAD_DETAIL_COMMENT: 'TOGGLE_VOTE_THREAD_DETAIL_COMMENT'
}

const voteType = {
  UPVOTE: 1,
  NEUTRAL: 0,
  DOWNVOTE: -1
}

function receiveThreadDetail(threadDetail) {
  return {
    type: actionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail
    }
  }
}

function addThreadDetailComment(comment) {
  return {
    type: actionType.ADD_COMMENT_THREAD_DETAIL,
    payload: {
      comment
    }
  }
}

function upVoteThreadDetailComment({ commentId, userId }) {
  return {
    type: actionType.UPVOTE_THREAD_DETAIL_COMMENT,
    payload: {
      commentId,
      userId
    }
  }
}

function downVoteThreadDetailComment({ commentId, userId }) {
  return {
    type: actionType.DOWNVOTE_THREAD_DETAIL_COMMENT,
    payload: {
      commentId,
      userId
    }
  }
}

function unVoteThreadDetailComment({ commentId, userId }) {
  return {
    type: actionType.UNVOTE_THREAD_DETAIL_COMMENT,
    payload: {
      commentId,
      userId
    }
  }
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    try {
      const threadDetail = await api.getThreadDetail(threadId)
      dispatch(receiveThreadDetail(threadDetail))
    } catch (error) {
      toast.error(error.message)
    }
  }
}

function asyncAddThreadDetailComment({ threadId, content }) {
  return async (dispatch) => {
    try {
      const newComment = await api.createComment({ threadId, content })
      dispatch(addThreadDetailComment(newComment))
    } catch (error) {
      toast.error(error.message)
    }
  }
}

function asyncUpVoteThreadDetailComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(upVoteThreadDetailComment({ commentId, userId: authUser.id }))
    try {
      await api.upVoteComment(threadId, commentId)
    } catch (error) {
      toast.error(error.message)
      dispatch(unVoteThreadDetailComment({ commentId, userId: authUser.id }))
    }
  }
}

function asyncDownVoteThreadDetailComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(downVoteThreadDetailComment({ commentId, userId: authUser.id }))
    try {
      await api.downVoteComment(threadId, commentId)
    } catch (error) {
      toast.error(error.message)
      dispatch(unVoteThreadDetailComment({ commentId, userId: authUser.id }))
    }
  }
}

function asyncUnVoteThreadDetailComment({ threadId, commentId, previousVoteType }) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(unVoteThreadDetailComment({ commentId, userId: authUser.id }))
    try {
      await api.unvoteComment(threadId, commentId)
    } catch (error) {
      toast.error(error.message)
      if (previousVoteType === voteType.UPVOTE) {
        dispatch(upVoteThreadDetailComment({ commentId, userId: authUser.id }))
      }
      if (previousVoteType === voteType.DOWNVOTE) {
        dispatch(downVoteThreadDetailComment({ commentId, userId: authUser.id }))
      }
    }
  }
}

export {
  actionType,
  receiveThreadDetail,
  addThreadDetailComment,
  upVoteThreadDetailComment,
  downVoteThreadDetailComment,
  unVoteThreadDetailComment,
  asyncReceiveThreadDetail,
  asyncAddThreadDetailComment,
  asyncUpVoteThreadDetailComment,
  asyncDownVoteThreadDetailComment,
  asyncUnVoteThreadDetailComment
}
