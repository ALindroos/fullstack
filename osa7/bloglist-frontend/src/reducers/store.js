import usersReducer from '../reducers/usersReducer'
import blogReducer from '../reducers/BlogReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  users: usersReducer,
  blogs: blogReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store