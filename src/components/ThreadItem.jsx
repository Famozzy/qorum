import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import parse from 'html-react-parser'
import { MessageSquareReplyIcon } from 'lucide-react'
import { postedAt } from '../lib'
import { asyncUpvoteThread, asyncDownvoteThread, asyncUnvoteThread } from '../states/threads/action'
import toast from 'react-hot-toast'
import VoteButton from './VoteButton'

export default function ThreadItem({
  id,
  category,
  title,
  body,
  owner,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  authUser
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isUpVoted = upVotesBy.includes(authUser?.id)
  const isDownVoted = downVotesBy.includes(authUser?.id)

  const loginAlert = () => {
    toast('You need to login to vote')
  }

  const onUpVoteButtonClick = (ev) => {
    ev.stopPropagation()
    if (!authUser) return loginAlert()
    isUpVoted ? dispatch(asyncUnvoteThread({ threadId: id, previousVoteType: 1 })) : dispatch(asyncUpvoteThread(id))
  }

  const onDownVoteButtonClick = (ev) => {
    ev.stopPropagation()
    if (!authUser) return loginAlert()
    isDownVoted
      ? dispatch(asyncUnvoteThread({ threadId: id, previousVoteType: -1 }))
      : dispatch(asyncDownvoteThread(id))
  }

  const onThreadClick = () => {
    navigate(`/threads/${id}`)
  }

  return (
    <article
      key={id}
      className="bg-base-200 py-3.5 px-2 cursor-pointer rounded-md hover:bg-base-100"
      onClick={onThreadClick}
    >
      <div className="mb-2">
        <span className="badge badge-sm badge-outline">
          {'#'}
          {category}
        </span>
        <p className="inline ml-2 text-sm font-light text-neutral-content/80">
          Posted by <span className="font-normal">{owner.name}</span> - {postedAt(createdAt)}
        </p>
      </div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-neutral-content/70 line-clamp-4">{parse(body)}</p>
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
          {totalComments} comments
        </span>
      </div>
    </article>
  )
}
