// //React
// import {expect} from 'chai'
// import React from 'react'
// import enzyme, {shallow} from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
// import {ExperienceDetails} from './ExperienceDetails'

// const adapter = new Adapter()
// enzyme.configure({adapter})

// //Redux

// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import configureMockStore from 'redux-mock-store'
// import thunkMiddleware from 'redux-thunk'
// const middlewares = [thunkMiddleware]
// const mockStore = configureMockStore(middlewares)
// const initialState = {
//   experience: {}
// }
// const store = mockStore(initialState)
// // import reducer from '../client/redux/reducer'
// import {GET_EXPERIENCE, getExperience} from '../store/experience'

// describe('React', () => {
//   let awesome = {
//     name: 'awesome experience'
// imageUrl:
//   'https://www.thehappycatsite.com/wp-content/uploads/2017/10/best-treats-for-kittens.jpg',
// duration: '1',
// category: 'movie',
// description: 'awesome',
// price: 10,
// reviewes: [
//   {description: 'love it'},
//   {description: 'hate it'},
//   {description: 'cool'}
// ]
//   }

//   describe('<ExperienceDetails /> component', () => {
//     const renderedExperience = shallow(
//       <ExperienceDetails experience={awesome} />
//     )

//     // change campus name to test dynamic rendering
//     awesome.name = 'cool experience'
//     // remove first item to render different list of students
//     // const firstReview = awesome.reviews.shift()
//     const renderedCoolExperience = shallow(
//       <ExperienceDetails experience={awesome} />
//     )

//     // reset campus name
//     awesome.name = 'awesome experience'
//     // put first student back

//     xit('renders the name of the campus in an <Typography>', () => {
//       expect(renderedExperience.find('h3').text()).to.equal(
//         'awesome experience'
//       )
//       expect(renderedCoolExperience.find('h3').text()).to.equal(
//         'cool experience'
//       )
//     })
//   })
// })

// describe('Redux', () => {
//   const experiences = [{name: 'New York'}, {name: 'Chicago'}, {name: 'Pluto'}]

//   let mock
//   beforeEach(() => {
//     mock = new MockAdapter(axios)
//   })

//   afterEach(() => {
//     mock.reset()
//   })

//   describe('selecting an experience', () => {
//     describe('`selectExperienceAction` action creator', () => {
//       // defined in ../client/redux/actions.js

//       it('creates GET_EXPERIENCE actions', () => {
//         const getExperienceAction = getExperience(awesomeExperience)
//         expect(getExperienceAction.type).to.equal(GET_EXPERIENCE)
//         expect(getExperienceAction.experience).to.equal(awesomeExperience)
//       })
//     })

//     describe('reducer', () => {
//       // defined in ../client/redux/reducer.js

//       it('returns an immutably-updated new state with selected campus', () => {
//         const newState = reducer(initialState, {
//           type: GET_EXPERIENCE,
//           experience: awesomeExperience
//         })
//         expect(newState.selectedExperience).to.equal(awesomeExperience)
//         expect(initialState.selectedExperience).to.deep.equal({})
//         // these shouldn't have changed:
//         expect(newState.experiences).to.equal(initialState.experiences)
//         expect(newState.students).to.equal(initialState.students)
//       })
//     })
//   })

//   describe('setting multiple campuses', () => {
//     describe('`fetchCampuses` thunk creator', () => {
//       // defined in ../client/redux/actions.js

//       it('returns a thunk to fetch campuses from the backend and dispatch a SET_CAMPUSES action', async () => {
//         mock.onGet('/api/campuses').replyOnce(200, campuses)
//         await store.dispatch(fetchCampuses())
//         const actions = store.getActions()
//         expect(actions[0].type).to.equal('SET_CAMPUSES')
//         expect(actions[0].campuses).to.deep.equal(campuses)
//       })
//     })
//   })
// })
