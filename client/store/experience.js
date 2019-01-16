import axios from 'axios'
import history from '../history'

const initState = {
  singleExperience: {},
  allExperiences: [],
  filteredExperiences: []
}

//action types
const GET_EXPERIENCE = 'GET_EXPERIENCE'
const GET_ALL_EXPERIENCES = 'GET_ALL_EXPERIENCES'
const GET_FILTERED_EXPERIENCES = 'GET_FILTERED_EXPERIENCES'
const POST_REVIEWS = 'POST_REVIEWS'

//action creators
const getExperince = experience => ({
  type: GET_EXPERIENCE,
  payload: experience
})

const getAllExperiences = experiences => ({
  type: GET_ALL_EXPERIENCES,
  payload: experiences
})

const getFilteredExperiences = experiences => ({
  type: GET_FILTERED_EXPERIENCES,
  payload: experiences
})

const postReviews = review => ({
  type: POST_REVIEWS,
  payload: review
})

//thunks

export const fetchExperience = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/experiences/${id}`)
    dispatch(getExperince(data))
  }
}

export const fetchAllExperiences = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/experiences')
    dispatch(getAllExperiences(data))
  }
}

export const fetchFilteredExperiences = categoryType => {
  return async dispatch => {
    const {data} = await axios.get(`/api/experiences?category=${categoryType}`)
    dispatch(getFilteredExperiences(data))
  }
}

export const postUserReview = (expId, review) => {
  return async dispatch => {
    const {data} = await axios.post(`/api/experiences/${expId}`, review)
    dispatch(postReviews(review))
  }
}

const experienceReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_EXPERIENCE:
      return {...state, singleExperience: action.payload}
    case GET_ALL_EXPERIENCES:
      return {...state, allExperiences: action.payload}
    case GET_FILTERED_EXPERIENCES:
      return {...state, filteredExperiences: action.payload}
    case POST_REVIEWS:
      return state
    default:
      return state
  }
}

export default experienceReducer
