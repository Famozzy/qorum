import React from 'react'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { cn } from '../lib'

export default function VoteButton({ type, onClick, isVoted, voteCount }) {
  const voteTypes = {
    up: <ChevronUpIcon size={24} />,
    down: <ChevronDownIcon size={24} />
  }

  return (
    <button
      className={cn(
        'btn btn-ghost btn-square min-w-0 min-h-0 h-full flex justify-center items-center gap-x-0.5 font-semibold px-0',
        isVoted && 'text-primary'
      )}
      onClick={onClick}
    >
      {voteTypes[type]}
      {voteCount}
    </button>
  )
}
