import React, { useState } from 'react'
import { HomeIcon, BarChart2Icon, LogInIcon, LogOutIcon } from 'lucide-react'
import NavigationButton from './NavigationButton'

export default function AppNavigation() {
  const [authed, setAuthed] = useState(true)
  const navigationList = [
    {
      title: 'Home',
      path: '/',
      icon: <HomeIcon size={22} />
    },
    {
      title: 'Leaderboards',
      path: '/leaderboards',
      icon: <BarChart2Icon size={22} />
    },
    {
      title: 'Login',
      path: '/login',
      icon: <LogInIcon size={22} />
    },
    {
      title: 'Logout',
      clickHandler: () => setAuthed(false),
      icon: <LogOutIcon size={22} />
    }
  ]

  const filteredNavigationList = navigationList.filter((nav) => {
    if (nav.title === 'Login' || nav.title === 'Logout') {
      return authed ? nav.title === 'Logout' : nav.title === 'Login'
    }
    return true
  })

  return (
    <nav className="navbar fixed w-full py-1 bg-base-100 min-h-3 bottom-0 right-0 left-0 backdrop-blur-lg lg:w-16 lg:h-full lg:p-0">
      <div className="gap-8 m-auto lg:flex-col lg:items-center lg:justify-center">
        {filteredNavigationList.map(({ title, path, icon, clickHandler }, i) => {
          return <NavigationButton key={i} title={title} icon={icon} path={path} onClick={clickHandler} />
        })}
      </div>
    </nav>
  )
}
