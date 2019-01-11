import Axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'

const addToCart = obj => ({
  type: ADD_TO_CART,
  payload: obj
})

const cart = []

const fetchCart = (user, order) => {
  return async dispatch => {}
}

const reducer = (state = cart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload]

    default:
      return state
  }
}
