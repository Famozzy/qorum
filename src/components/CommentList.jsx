import React from 'react'
import CommentItem from './CommentItem'

export default function CommentList({ threadId, comments }) {
  return (
    <>
      <h2 className="ml-2.5 text-xl font-bold">Comments[{comments.length}]</h2>
      <div>
        {comments.map(({ id, owner, content, createdAt, upVotesBy, downVotesBy }) => (
          <CommentItem
            key={id}
            threadId={threadId}
            commentId={id}
            owner={owner}
            content={content}
            createdAt={createdAt}
            upVotesBy={upVotesBy}
            downVotesBy={downVotesBy}
          />
        ))}
      </div>
    </>
  )
}
