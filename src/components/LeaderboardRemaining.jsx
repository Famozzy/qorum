import React from 'react'
import { cn } from '../lib'
import { useSelector } from 'react-redux'
import SkeletonRemaining from './SkeletonRemaining'

export default function LeaderboardRemaining({ leaderboards }) {
  const authUser = useSelector((state) => state.authUser)

  return (
    <ol className="mt-6 space-y-4">
      {leaderboards.length ? (
        leaderboards.map(({ user, score }, i) => (
          <li key={i} className="flex justify-between items-center rounded-md w-full bg-base-200 p-5">
            <div className="flex items-center gap-x-3">
              <span className="flex justify-center text-xl font-medium w-6">{i + 4}</span>
              <img className="size-10 rounded-full" src={user.avatar} alt={user.name} />
              <p className={cn('inline text-neutral-content', user.id === authUser?.id && 'text-primary font-medium')}>
                {user.name}
              </p>
            </div>
            <span className="font-bold">{score} pts</span>
          </li>
        ))
      ) : (
        <SkeletonRemaining />
      )}
    </ol>
  )
}