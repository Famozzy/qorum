import React from 'react'
import { Link } from 'react-router-dom'

export default function NavigationButton({ title, path, icon, onClick }) {
  if (path) {
    return (
      <Link to={path}>
        <button className="btn btn-ghost tooltip lg:tooltip-right" data-tip={title}>
          {icon}
        </button>
      </Link>
    )
  }

  return (
    <button onClick={onClick} className="btn btn-ghost tooltip lg:tooltop-right" data-tip={title}>
      {icon}
    </button>
  )
}
