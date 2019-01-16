import {expect} from 'chai'
import {fetchExperience, fetchAllExperiences} from './experience'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {user: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchExperience', () => {
    it('eventually dispatches the GET_EXPERIENCE action', async () => {
      const fakeExperience = {
        id: 999,
        name: 'Union Square Drum Circle',
        duration: '2 hours',
        imageUrl:
          'https://images.unsplash.com/photo-1499482125586-91609c0b5fd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
      }
      mockAxios.onGet('/api/experiences/999').replyOnce(200, fakeExperience)
      await store.dispatch(fetchExperience(999))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_EXPERIENCE')
      expect(actions[0].payload).to.be.deep.equal(fakeExperience)
    })
  })

  describe('fetch all experiences', () => {
    it('fetchAllExperiences: eventually dispatches the GET_ALL_EXPERIENCES action', async () => {
      mockAxios.onGet('/api/experiences').replyOnce(200)
      await store.dispatch(fetchAllExperiences())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ALL_EXPERIENCES')
    })
  })
})
