import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user, {me} from './user'
import cart, {getCart} from './cart'
import experience, {fetchExperience, fetchAllExperiences} from './experience'

const reducer = combineReducers({user, experience, cart})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export {fetchExperience, fetchAllExperiences, me, getCart}
