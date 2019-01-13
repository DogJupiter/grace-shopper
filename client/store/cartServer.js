import axios from 'axios'
import history from '../history'

const initState = {}
//ACTION TYPES
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const DELETE_ALL_FROM_CART = 'DELETE_ALL_FROM_CART'

//ACTION CREATORS
export const getCart = cart => ({
  type: GET_CART,
  payload: cart
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

export const fetchCart = userId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/users/${userId}/orders/cart`)
    console.log(data, 'kevins cart from cartServer reducer')
    dispatch(getCart(data))
  }
}

export const addItemToCart = (userId, experience) => {
  return async dispatch => {
    const {data} = await axios.post(
      `/api/users/${userId}/orders/cart`,
      experience
    )
    console.log(data, 'data from add item to cart')
    dispatch(addToCart(data))
  }
}

const cartServerReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_CART:
      return {...action.payload}
    case ADD_TO_CART:
      return {...state, items: [...state.items, action.payload]}
    default:
      return state
  }
}

export default cartServerReducer
