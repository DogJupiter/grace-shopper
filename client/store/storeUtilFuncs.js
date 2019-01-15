export const addItemToCartFunc = (state, payload) => {
  let newCart = {...state}
  if (state.experiences) {
    let duplicateItemIdx = state.experiences.findIndex(
      item => item.experience.id === payload.id
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
        experience: payload,
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
}

export const removeItemFromCartFunc = (state, payload) => {
  let newCart = {...state}
  if (state.experiences) {
    let removalIndex = state.experiences.findIndex(
      item => item.experience.id === payload.id
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
}

export const deleteAllFromCartFunc = (state, payload) => {
  console.log('ARRIVED AT DELETE ALL FROM CART')
  let newCart = {...state}
  if (state.experiences) {
    let removalIndex = state.experiences.findIndex(
      item => item.experience.id === payload.id
    )
    let totalQtyDecrement = newCart.experiences[removalIndex].quantity
    newCart.experiences = state.experiences.slice()
    newCart.experiences.splice(removalIndex, 1)
    console.log('NEWCART EXPERIENCES--->', newCart.experiences)
    newCart.totalQty -= totalQtyDecrement
    localStorage.setItem('cart', JSON.stringify(newCart))
  }
  if (newCart.totalQty === 0) {
    localStorage.clear()
  }
  return newCart
}

module.exports = {
  addItemToCartFunc,
  removeItemFromCartFunc,
  deleteAllFromCartFunc
}
