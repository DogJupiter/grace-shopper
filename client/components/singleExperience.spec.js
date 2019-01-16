import React from 'react'
import {shallow} from 'enzyme'
import {expect} from 'chai'
import singleExperience from './singleExperience'

describe('<SingleExperience/>', function() {
  it('should have an image to display experience', function() {
    const wrapper = shallow(<singleExperience />)
    expect(wrapper.find('image')).to.have.length(0)
  })

  it('should have props for all experiences', function() {
    const wrapper = shallow(<singleExperience />)
    const experiences = wrapper.props().experiences
    expect(experiences).to.be.defined
  })
})
