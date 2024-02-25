import React from 'react'
import { cn } from '../lib'

export default function CategoryItem({ isSelected, clickHandler, category }) {
  return (
    <span
      className={cn('badge badge-lg cursor-pointer', isSelected ? 'badge-primary' : 'badge-outline')}
      onClick={clickHandler}
    >
      {'#'}
      {category}
    </span>
  )
}
