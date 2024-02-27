import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  asyncUpVoteThreadDetailComment,
  asyncDownVoteThreadDetailComment,
  asyncUnVoteThreadDetailComment
} from '../states/threadDetail/action'
import { postedAt } from '../lib'
import parser from 'html-react-parser'
import VoteButton from './VoteButton'

export default function CommentItem({ threadId, owner, commentId, content, createdAt, upVotesBy, downVotesBy }) {
  const authUser = useSelector((state) => state.authUser)
  const dispatch = useDispatch()

  const isUpVoted = upVotesBy.includes(authUser?.id)
  const isDownVoted = downVotesBy.includes(authUser?.id)

  const onUpVoteButtonClick = () => {
    isUpVoted
      ? dispatch(asyncUnVoteThreadDetailComment({ threadId, commentId, previousVoteType: 1 }))
      : dispatch(asyncUpVoteThreadDetailComment({ threadId, commentId }))
  }

  const onDownVoteButtonClick = () => {
    isDownVoted
      ? dispatch(asyncUnVoteThreadDetailComment({ threadId, commentId, previousVoteType: -1 }))
      : dispatch(asyncDownVoteThreadDetailComment({ threadId, commentId }))
  }

  return (
    <div className="flex flex-col gap-y-4 p-4 rounded-md bg-base-200">
      <div className="flex gap-x-2.5 items-center text-neutral-content">
        <img className="rounded-full size-8" src={owner.avatar} alt={owner.name} />
        <p className="text-sm">{owner.name}</p>
        <span className="text-xs font-light">{postedAt(createdAt)}</span>
      </div>
      <p className="text-neutral-content w-full">{parser(content)}</p>
      <div className="flex gap-x-1">
        <VoteButton type="up" onClick={onUpVoteButtonClick} isVoted={isUpVoted} voteCount={upVotesBy.length} />
        <VoteButton type="down" onClick={onDownVoteButtonClick} isVoted={isDownVoted} voteCount={downVotesBy.length} />
      </div>
    </div>
  )
}
