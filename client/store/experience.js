import axios from 'axios'
import history from '../history'

const initState = {
  experience: {}
}

//action types
const GET_EXPERIENCE = 'GET_EXPERIENCE'

//action creators
const getExperince = experience => ({
  type: GET_EXPERIENCE,
  payload: experience
})

//thunks

export const fetchExperience = id => {
  return async dispatch => {
    console.log('data to be fetched')
    const {data} = await axios.get(`/api/experiences/${id}`)
    console.log('data', data)
    dispatch(getExperince(data))
  }
}

const experienceReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_EXPERIENCE:
      return {...state, experience: action.payload}
    default:
      return state
  }
}

export default experienceReducer
