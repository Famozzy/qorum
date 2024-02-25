import React from 'react'
import SkeletonThreadList from './SkeletonThreadList'
import ThreadItem from './ThreadItem'

export default function ThreadList({ threads }) {
  return (
    <div className="space-y-3">
      {threads.length ? threads.map((thread, i) => <ThreadItem key={i} {...thread} />) : <SkeletonThreadList />}
    </div>
  )
}
