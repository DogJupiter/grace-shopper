import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'

import Adapter from 'enzyme-adapter-react-16'
import SingleExperience from './singleExperience'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllExperiences', () => {
  xit('should render all the experiences', () => {
    const component = renderIntoDocument(
      <SingleExperience
        experiences={[
          {
            name: 'some cheap activity',
            imageUrl:
              'https://images.unsplash.com/photo-1547380109-a2fffd5b9036?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1848&q=80',
            duration: '2 hour',
            price: 50
          },
          {name: 'another cheap activity'}
        ]}
      />
    )
    const singleEle = findRenderedDOMComponentWithClass(
      component,
      'experiences'
    )

    // expect(singleEle).to.be.ok
  })

  xit('passes props to child components', () => {
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
