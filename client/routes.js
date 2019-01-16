import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Login, Signup, UserHome} from './components'
import ThankYou from './components/ThankYou'
import AllExperiences from './components/allExperiences'
import ExperienceDetails from './components/ExperienceDetails'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import FilteredExperiences from './components/filteredExperiences'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={UserHome} />
        <Route exact path="/thanks" component={ThankYou} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/home" component={UserHome} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/filter" component={FilteredExperiences} />
        <Route exact path="/experiences" component={AllExperiences} />
        <Route exact path="/experiences/:id" component={ExperienceDetails} />
      </Switch>
    )
  }
}

export default Routes
