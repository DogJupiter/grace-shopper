/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AllExperiences from './allExperiences'
import SingleExperience from './singleExperience'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllExperiences', () => {
  it('renders five <SingleExperience /> components', () => {
    const wrapper = shallow(<AllExperiences />)
    expect(wrapper.find(<SingleExperience />)).to.have.lengthOf(1)
  })

  it('passes props to child components', () => {
    const wrapper = shallow(
      <AllExperiences>
        <SingleExperience experiences={this.state.experiences} />
      </AllExperiences>
    )
    expect(
      wrapper.contains(
        <SingleExperience experiences={this.state.experiences} />
      )
    ).to.equal(true)
  })
})