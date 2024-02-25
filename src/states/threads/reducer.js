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
          const updatedThread = { ...thread }
          updatedThread.upVotesBy = [...thread.upVotesBy, action.payload.userId]
          if (thread.downVotesBy.includes(action.payload.userId)) {
            updatedThread.downVotesBy = thread.downVotesBy.filter((id) => id !== action.payload.userId)
          }
          return updatedThread
        }
        return thread
      })
    case actionType.DOWNVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          const updatedThread = { ...thread }
          updatedThread.downVotesBy = [...thread.downVotesBy, action.payload.userId]
          if (thread.upVotesBy.includes(action.payload.userId)) {
            updatedThread.upVotesBy = thread.upVotesBy.filter((id) => id !== action.payload.userId)
          }
          return updatedThread
        }
        return thread
      })
    case actionType.UNVOTE_THREAD:
      return threads.map((thread) => {
        const { upVotesBy: upVotes, downVotesBy: downVotes } = thread
        const isUpVoted = upVotes.includes(action.payload.userId)
        const isDownVoted = downVotes.includes(action.payload.userId)
        if (thread.id === action.payload.threadId) {
          const updatedThread = { ...thread }
          if (isUpVoted) {
            updatedThread.upVotesBy = upVotes.filter((id) => id !== action.payload.userId)
          }
          if (isDownVoted) {
            updatedThread.downVotesBy = downVotes.filter((id) => id !== action.payload.userId)
          }
          return updatedThread
        }
        return thread
      })
    default:
      return threads
  }
}
