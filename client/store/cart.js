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

//Initial State
let activeCart
if (localStorage.getItem('cart')) {
  activeCart = JSON.parse(localStorage.getItem('cart'))
} else {
  activeCart = {
    experiences: [],
    totalQty: 0
  }
}

//REDUCER STUFF

const cartReducer = (state = activeCart, action) => {
  switch (action.type) {
    case GET_CART:
      return state
    case ADD_TO_CART:
      return addItemToCartFunc(state, action.payload)
    case REMOVE_FROM_CART:
      return removeItemFromCartFunc(state, action.payload)
    case DELETE_ALL_FROM_CART:
      return deleteAllFromCartFunc(state, action.payload)
    default:
      return state
  }
}

export default cartReducer
