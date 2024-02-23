import { actionType } from './action'

export default function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case actionType.RECEIVE_THREADS:
      return action.payload.threads
    case actionType.CREATE_THREAD:
      return [action.payload.thread, ...threads]
    case actionType.UPVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          thread.upVotesBy = [...thread.upVotesBy, action.payload.userId]
          if (thread.downVotesBy.includes(action.payload.userId)) {
            thread.downVotesBy = thread.downVotesBy.filter((id) => id !== action.payload.userId)
          }
        }
        return thread
      })
    case actionType.DOWNVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          thread.downVotesBy = [...thread.downVotesBy, action.payload.userId]
          if (thread.upVotesBy.includes(action.payload.userId)) {
            thread.upVotesBy = thread.upVotesBy.filter((id) => id !== action.payload.userId)
          }
        }
        return thread
      })
    case actionType.UNVOTE_THREAD:
      return threads.map((thread) => {
        const { upVotesBy: upVotes, downVotesBy: downVotes } = thread
        const isUpVoted = upVotes.includes(action.payload.userId)
        const isDownVoted = downVotes.includes(action.payload.userId)
        if (thread.id === action.payload.threadId) {
          if (isUpVoted) {
            thread.upVotesBy = upVotes.filter((id) => id !== action.payload.userId)
          }
          if (isDownVoted) {
            thread.downVotesBy = downVotes.filter((id) => id !== action.payload.userId)
          }
        }
        return thread
      })
    default:
      return threads
  }
}
