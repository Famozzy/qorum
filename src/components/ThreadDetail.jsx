import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncUnVoteThreadDetail
} from '../states/threadDetail/action'
import parser from 'html-react-parser'
import { postedAt } from '../lib'
import VoteButton from './VoteButton'
import { MessageSquareReplyIcon } from 'lucide-react'

export default function ThreadDetail({
  id,
  category,
  createdAt,
  owner,
  title,
  body,
  upVotesBy,
  downVotesBy,
  comments
}) {
  const authUser = useSelector((state) => state.authUser)
  const dispatch = useDispatch()

  const isUpVoted = upVotesBy.includes(authUser?.id)
  const isDownVoted = downVotesBy.includes(authUser?.id)

  const onUpVoteButtonClick = () => {
    isUpVoted
      ? dispatch(asyncUnVoteThreadDetail({ threadId: id, previousVoteType: 1 }))
      : dispatch(asyncUpVoteThreadDetail(id))
  }

  const onDownVoteButtonClick = () => {
    isDownVoted
      ? dispatch(asyncUnVoteThreadDetail({ threadId: id, previousVoteType: -1 }))
      : dispatch(asyncDownVoteThreadDetail(id))
  }

  return (
    <div className="px-2.5 py-6 bg-base-200 rounded-md space-y-4">
      <span className="badge badge-lg badge-outline">
        {'#'}
        {category}
      </span>
      <div className="flex items-center gap-x-3">
        <img className="rounded-full size-10" src={owner.avatar} alt={owner.name} />
        <p className="text-sm">{owner.name}</p>
        <span className="text-xs font-light">{postedAt(createdAt)}</span>
      </div>
      <div>
        <h1 className="text-2xl font-semibold my-2.5">{title}</h1>
        <p className="text-neutral-content">{parser(body)}</p>
      </div>
      <div className="flex mt-4 gap-x-4 text-sm text-neutral-content font-medium">
        <div className="flex gap-x-1">
          <VoteButton type="up" onClick={onUpVoteButtonClick} isVoted={isUpVoted} voteCount={upVotesBy.length} />
          <VoteButton
            type="down"
            onClick={onDownVoteButtonClick}
            isVoted={isDownVoted}
            voteCount={downVotesBy.length}
          />
        </div>
        <span className="flex items-center gap-x-1 opacity-50">
          <MessageSquareReplyIcon size={24} />
          {comments.length} comments
        </span>
      </div>
    </div>
  )
}
