import axios from 'axios'
import history from '../history'

//ACTION TYPES
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const DELETE_ALL_FROM_CART = 'DELETE_ALL_FROM_CART'

//ACTION CREATORS
export const getCart = () => ({
  type: GET_CART
})

//CG: These decisions of how to add (server or local storage) should be done by the cart.
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
    // subTotal: 0
  }
}

//REDUCER STUFF

//CG: NO LOGIC SHOULD BE HANDLED BY REDUCER
const cartReducer = (state = activeCart, action) => {
  let newCart

  switch (action.type) {
    //CG: WHAT IS THIS!??!?! :O
    case GET_CART:
      return state
    case ADD_TO_CART:
      //CG: Might as well do this up front.
      newCart = {...state}
      if (state.experiences) {
        let duplicateItemIdx = state.experiences.findIndex(
          item => item.experience.id === action.payload.id
        )

        //Is the item already in the cart?
        if (duplicateItemIdx > -1) {
          //if so, add another to the existing
          if (newCart.experiences[duplicateItemIdx].quantity === 5) {
            window.alert('Sorry! Max five tickets!')
            newCart.experiences[duplicateItemIdx].quantity = 5
          } else {
            newCart.experiences[duplicateItemIdx].quantity += 1
          }
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

    default:
      return state
  }
}

export default cartReducer
