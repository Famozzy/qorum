import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from './authUser/reducer'
import isPreloadReducer from './isPreload/reducer'
import threadsReducer from './threads/reducer'
import categoriesReducer from './categories/reducer'
import threadDetailReducer from './threadDetail/reducer'
import leaderboardsReducer from './leaderboards/reducer'
import usersReducer from './users/reducer'

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    users: usersReducer,
    isPreload: isPreloadReducer,
    threads: threadsReducer,
    categories: categoriesReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer
  }
})

export default store
