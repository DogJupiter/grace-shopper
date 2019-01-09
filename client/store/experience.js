import axios from 'axios'
import history from '../history'

const initState = {
  singleExperience: {},
  allExperiences: [],
  selectedExperience: {}
}

//action types
const GET_EXPERIENCE = 'GET_EXPERIENCE'
const GET_ALL_EXPERIENCES = 'GET_ALL_EXPERIENCES'

//action creators
const getExperince = experience => ({
  type: GET_EXPERIENCE,
  payload: experience
})

const getAllExperiences = experiences => ({
  type: GET_ALL_EXPERIENCES,
  payload: experiences
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

export const fetchAllExperiences = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/experiences')
    dispatch(getAllExperiences(data))
  }
}

const experienceReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_EXPERIENCE:
      return {...state, singleExperience: action.payload}
    case GET_ALL_EXPERIENCES:
      return {...state, allExperiences: action.payload}
    default:
      return state
  }
}

export default experienceReducer
