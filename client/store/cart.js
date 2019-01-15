import axios from 'axios'
import history from '../history'
import {
  addItemToCartFunc,
  removeItemFromCartFunc,
  deleteAllFromCartFunc
} from './storeUtilFuncs'
//ACTION TYPES
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const DELETE_ALL_FROM_CART = 'DELETE_ALL_FROM_CART'
const CREATE_NEW_ORDER = 'CREATE_NEW_ORDER'
const CLEAR_CART = 'CLEAR_CART'
//ACTION CREATORS
export const getCart = () => ({
  type: GET_CART
})
export const addToCart = (experience, history) => ({
  type: ADD_TO_CART,
  payload: experience,
  history
})
export const removeFromCart = experience => ({
  type: REMOVE_FROM_CART,
  payload: experience
})
export const deleteAllFromCart = experience => ({
  type: DELETE_ALL_FROM_CART,
  payload: experience
})

export const clearCart = () => ({type: CLEAR_CART})

const createNewOrder = order => ({
  type: CREATE_NEW_ORDER,
  payload: order
})

//thunk
export const purchaseComplete = orderId => {
  return async dispatch => {
    const {data} = await axios.put(`/api/orders/${orderId}`)
    history.push(`/thanks/`)
    // dispatch(clearCart())
  }
}
export const makeNewOrder = order => {
  return async dispatch => {
    const {data} = await axios.post('/api/orders', order)
    dispatch(createNewOrder(data))
    localStorage.setItem('orderId', data.id)
  }
}
export const inStockCheck = (experience, qty) => {
  return async dispatch => {
    const {data} = await axios.get(`/api/experiences/${experience.id}`)
    if (data.inventory > qty) dispatch(addToCart(experience))
    else {
      window.alert(
        `Sorry there are only ${data.inventory} tickets left in stock`
      )
    }
  }
}

//Initial State
let activeCart
if (localStorage.getItem('cart')) {
  activeCart = JSON.parse(localStorage.getItem('cart'))
} else {
  activeCart = {
    experiences: [],
    totalQty: 0,
    subtotal: 0
  }
}
//REDUCER STUFF
const cartReducer = (state = activeCart, action) => {
  switch (action.type) {
    case GET_CART:
      return state
    case ADD_TO_CART:
      return addItemToCartFunc(state, action.payload, state.subtotal)
    case REMOVE_FROM_CART:
      return removeItemFromCartFunc(state, action.payload)
    case DELETE_ALL_FROM_CART:
      return deleteAllFromCartFunc(state, action.payload)
    case CREATE_NEW_ORDER:
      return state
    case CLEAR_CART:
      console.log('thank you message')
      localStorage.clear()
      return []
    default:
      return state
  }
}

export default cartReducer
