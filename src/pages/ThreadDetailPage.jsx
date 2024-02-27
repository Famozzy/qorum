import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { asyncReceiveThreadDetail, clearThreadDetail } from '../states/threadDetail/action'
import ThreadDetail from '../components/ThreadDetail'
import CommentList from '../components/CommentList'
import CreateCommentForm from '../components/CreateCommentForm'
import SkeletonThreadDetail from '../components/SkeletonThreadDetail'

export default function ThreadDetailPage() {
  const { id } = useParams()
  const { threadDetail } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id))
    return () => dispatch(clearThreadDetail())
  }, [dispatch])

  if (!threadDetail) {
    return <SkeletonThreadDetail />
  }

  return (
    <section className="mt-8 mb-20 space-y-6">
      <ThreadDetail {...threadDetail} />
      {<CreateCommentForm threadId={threadDetail.id} />}
      <CommentList threadId={threadDetail.id} comments={threadDetail.comments} />
    </section>
  )
}
