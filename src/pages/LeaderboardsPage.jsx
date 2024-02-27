import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { asyncReceiveLeaderboards } from '../states/leaderboards/action'
import LeaderboardTopThree from '../components/LeaderboardTopThree'
import LeaderboardRemaining from '../components/LeaderboardRemaining'

export default function LeaderboardsPage() {
  const dispatch = useDispatch()
  const leaderboards = useSelector((state) => state.leaderboards)

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards())
  }, [dispatch])

  const topThreeList = leaderboards.slice(0, 3)
  const remainingList = leaderboards.slice(3)

  return (
    <section className="mt-6">
      <h1 className="text-3xl text-center font-semibold">Leaderboards</h1>
      <div className="my-10">
        <LeaderboardTopThree leaderboards={topThreeList} />
        <LeaderboardRemaining leaderboards={remainingList} />
      </div>
    </section>
  )
}