import { actionType } from './action'

export default function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case actionType.RECEIVE_THREADS:
      return action.payload.threads
    case actionType.CREATE_THREAD:
      return [action.payload.thread, ...threads]
    case actionType.TOGGLE_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          const { userId, voteType } = action.payload
          const upVotes = thread.upVotesBy
          const downVotes = thread.downVotesBy
          const isUpVoted = upVotes.includes(userId)
          const isDownVoted = downVotes.includes(userId)

          if (voteType === 1) {
            if (isUpVoted) {
              thread.upVotesBy = upVotes.filter((id) => id !== userId)
            } else {
              thread.upVotesBy = [...upVotes, userId]
              if (isDownVoted) {
                thread.downVotesBy = downVotes.filter((id) => id !== userId)
              }
            }
          }
          if (voteType === -1) {
            if (isDownVoted) {
              thread.downVotes = downVotes.filter((id) => id !== userId)
            } else {
              thread.downVotes = [...downVotes, userId]
              if (isUpVoted) {
                thread.upVotes = upVotes.filter((id) => id !== userId)
              }
            }
          }
          if (voteType === 0) {
            if (isUpVoted) {
              thread.upVotesBy = upVotes.filter((id) => id !== userId)
            } else if (isDownVoted) {
              thread.downVotesBy = downVotes.filter((id) => id !== userId)
            }
          }
        }

        return thread
      })
    default:
      return threads
  }
}
