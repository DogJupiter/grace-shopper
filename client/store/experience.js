import axios from 'axios'

const initState = {
  singleExperience: {},
  allExperiences: [],
  filteredExperiences: []
}

//action types
const GET_EXPERIENCE = 'GET_EXPERIENCE'
const GET_ALL_EXPERIENCES = 'GET_ALL_EXPERIENCES'
const GET_FILTERED_EXPERIENCES = 'GET_FILTERED_EXPERIENCES'

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
    console.log('HERE IS THE QUERIED CATEGORIES', data)
    dispatch(getFilteredExperiences(data))
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
    default:
      return state
  }
}

export default experienceReducer
