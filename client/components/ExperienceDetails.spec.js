//React
import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ExperienceDetails from './ExperienceDetails'

global.window = {}
import 'mock-local-storage'
window.localStorage = global.localStorage

const adapter = new Adapter()
enzyme.configure({adapter})

//Redux

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import {GET_EXPERIENCE, getExperience} from '../store/experience'

let awesome = {
  name: 'awesome experience',
  imageUrl:
    'https://www.thehappycatsite.com/wp-content/uploads/2017/10/best-treats-for-kittens.jpg',
  duration: '1',
  category: 'movie',
  description: 'awesome',
  price: 10,
  reviewes: [
    {description: 'love it'},
    {description: 'hate it'},
    {description: 'cool'}
  ]
}

describe('<ExperienceDetails /> component', () => {
  afterEach(() => {
    localStorage.clear()
    // remove callback
    localStorage.itemInsertionCallback = null
  })

  it('renders the name of the experience in a <Typography>', () => {
    const wrapper = shallow(<ExperienceDetails experience={awesome} />)
    awesome.description = 'cool experience'
    const title = <h4>awesome.description</h4>
    expect(wrapper.contains(title)).to.equal(false)
  })
})

describe('Redux', () => {
  // const experiences = [{name: 'New York'}, {name: 'Chicago'}, {name: 'Pluto'}]

  let mock
  beforeEach(() => {
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.reset()
  })

  describe('selecting an experience', () => {
    describe('`selectExperienceAction` action creator', () => {
      xit('creates GET_EXPERIENCE actions', () => {
        const getExperienceAction = getExperience(awesome)
        expect(getExperienceAction.type).to.equal(GET_EXPERIENCE)
        expect(getExperienceAction.experience).to.equal(awesome)
      })
    })
  })
})
