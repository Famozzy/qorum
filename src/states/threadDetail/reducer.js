import { actionType } from './action'

export default function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case actionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail
    case actionType.CREATE_COMMENT:
      return {
        ...threadDetail,
        comments: [action.payload.comment, ...threadDetail.comments]
      }
    case actionType.UPVOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            comment.upVotesBy = [...comment.upVotesBy, action.payload.userId]
            if (comment.downVotesBy.includes(action.payload.userId)) {
              comment.downVotesBy = comment.downVotesBy.filter((id) => id !== action.payload.userId)
            }
          }
          return comment
        })
      }
    case actionType.DOWNVOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            comment.downVotesBy = [...comment.downVotesBy, action.payload.userId]
            if (comment.upVotesBy.includes(action.payload.userId)) {
              comment.upVotesBy = comment.upVotesBy.filter((id) => id !== action.payload.userId)
            }
          }
          return comment
        })
      }
    case actionType.UNVOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          const { upVotesBy: upVotes, downVotesBy: downVotes } = comment
          const isUpVoted = upVotes.includes(action.payload.userId)
          const isDownVoted = downVotes.includes(action.payload.userId)
          if (comment.id === action.payload.commentId) {
            if (isUpVoted) {
              comment.upVotesBy = upVotes.filter((id) => id !== action.payload.userId)
            }
            if (isDownVoted) {
              comment.downVotesBy = downVotes.filter((id) => id !== action.payload.userId)
            }
          }
          return comment
        })
      }
    default:
      return threadDetail
  }
}
