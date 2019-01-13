import axios from 'axios'
import history from '../history'

//ACTION TYPES
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const DELETE_ALL_FROM_CART = 'DELETE_ALL_FROM_CART'
const ADD_TO_MEMBER_CART = 'ADD_TO_MEMBER_CART'

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

export const addToMemberCart = experience => ({
  type: ADD_TO_MEMBER_CART,
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

// THUNK CREATOR
export const updateMemberCart = (experience, userId) => {
  return async dispatch => {
    const res = await axios.post(`/api/users/${userId}/orders/cart`, experience)
    console.log('POST EXPERIENCE TO CART', res.data)
    const action = addToMemberCart(res.data)
    console.log('THIS IS THE ACTION', action)
    dispatch(action)
  }
}

//REDUCER STUFF

const cartReducer = (state = activeCart, action) => {
  let newCart

  switch (action.type) {
    case GET_CART:
      return state
    case ADD_TO_CART:
      newCart = {...state}
      if (state.experiences) {
        let duplicateItemIdx = state.experiences.findIndex(
          item => item.experience.id === action.payload.id
        )

        //Is the item already in the cart?
        if (duplicateItemIdx > -1) {
          //if so, add another to the existing
          newCart.experiences[duplicateItemIdx].quantity += 1
          newCart.totalQty += 1
        } else {
          //if not, add a new one
          newCart.experiences = state.experiences.concat({
            experience: action.payload,
            quantity: 1
          })
          newCart.totalQty += 1
        }
      }
      localStorage.setItem('cart', JSON.stringify(newCart))
      if (newCart.totalQty === 0) {
        localStorage.clear()
      }
      return newCart

    case REMOVE_FROM_CART:
      newCart = {...state}
      if (state.experiences) {
        let removalIndex = state.experiences.findIndex(
          item => item.experience.id === action.payload.id
        )
        newCart.experiences = state.experiences.slice()
        newCart.experiences[removalIndex].quantity -= 1
        newCart.totalQty -= 1
        if (newCart.experiences[removalIndex].quantity === 0) {
          newCart.experiences.splice(removalIndex, 1)
        }
      }
      localStorage.setItem('cart', JSON.stringify(newCart))
      if (newCart.totalQty === 0) {
        localStorage.clear()
      }
      return newCart

    case DELETE_ALL_FROM_CART:
      newCart = {...state}
      if (state.experiences) {
        let removalIndex = state.experiences.findIndex(
          item => item.experience.id === action.payload.id
        )
        let totalQtyDecrement = newCart.experiences[removalIndex].quantity
        newCart.experiences = state.experiences.slice()
        newCart.experiences.splice(removalIndex, 1)
        newCart.totalQty -= totalQtyDecrement
      }
      if (newCart.totalQty === 0) {
        localStorage.clear()
      }
      return newCart

    case ADD_TO_MEMBER_CART:
      newCart = {...state, experiences: [...state.experiences, action.payload]}
      console.log(newCart)
      const addTotalQty = cart => {
        let total = 0
        cart.map(item => (total += item.quantity))
        return total
      }
      if (newCart.experiences.length > 0) {
        newCart.totalQty = addTotalQty(newCart.experiences)
        // newCart.experiences =
      }

      return newCart
    default:
      return state
  }
}

export default cartReducer
