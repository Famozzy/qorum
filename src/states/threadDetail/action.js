import { api } from '../../lib/api'
import toast from 'react-hot-toast'

const actionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  ADD_THREAD_DETAIL_COMMENT: 'ADD_THREAD_DETAIL_COMMENT',
  TOGGLE_VOTE_THREAD_DETAIL_COMMENT: 'TOGGLE_VOTE_THREAD_DETAIL_COMMENT'
}

function receiveThreadDetail(threadDetail) {
  return {
    type: actionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail
    }
  }
}

function addCommentThreadDetail(comment) {
  return {
    type: actionType.ADD_COMMENT_THREAD_DETAIL,
    payload: {
      comment
    }
  }
}

function toggleVoteCommentThreadDetail({ commentId, userId, voteType }) {
  return {
    type: actionType.TOGGLE_VOTE_COMMENT_THREAD_DETAIL,
    payload: { commentId, userId, voteType }
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
      dispatch(addCommentThreadDetail(newComment))
    } catch (error) {
      toast.error(error.message)
    }
  }
}
