import axios from 'axios'

//ACTION TYPES
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'

//ACTION CREATORS
export const getCart = () => ({
  type: GET_CART
})

export const addToCart = (experience, history) => ({
  type: ADD_TO_CART,
  payload: experience,
  history
})

//Initial State
let activeCart
if (localStorage.getItem('cart')) {
  activeCart = JSON.parse(localStorage.getItem('cart'))
} else {
  activeCart = []
}

//REDUCER STUFF

const cartReducer = (state = activeCart, action) => {
  let newCart

  switch (action.type) {
    case GET_CART:
      return state
    case ADD_TO_CART:
      let duplicateItemIdx = state.findIndex(
        item => item.experience.id === action.payload.id
      )
      //Is the item already in the cart?
      //if so, add another to the existing
      //if not, add a new one
      if (duplicateItemIdx > -1) {
        newCart = state
        newCart[duplicateItemIdx].quantity += 1
      } else {
        newCart = state.concat([
          {
            experience: action.payload,
            quantity: 1
          }
        ])
      }
      localStorage.setItem('cart', JSON.stringify(newCart))
      // history.push('/cart')
      return newCart
    default:
      return state
  }
}

export default cartReducer
