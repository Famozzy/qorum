import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from './authUser/reducer'
import isPreloadReducer from './isPreload/reducer'
import threadsReducer from './threads/reducer'
import categoriesReducer from './categories/reducer'
import threadDetailReducer from './threadDetail/reducer'
import leaderboardsReducer from './leaderboards/reducer'

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    threads: threadsReducer,
    categories: categoriesReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer
  }
})

export default store
