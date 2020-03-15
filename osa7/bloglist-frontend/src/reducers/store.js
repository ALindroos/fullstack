import usersReducer from '../reducers/usersReducer'
import blogReducer from '../reducers/BlogReducer'
import currentUserReducer from '../reducers/currentUserReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  users: usersReducer,
  blogs: blogReducer,
  currentUser: currentUserReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store