import React from 'react'
import {Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

import SingleExperience from './singleExperience'
import SideBar from './SideBar'
import {connect} from 'react-redux'
import {fetchAllExperiences} from '../store'
import {getCart} from '../store/cart'

const styles = theme => ({
  content: {
    flexGrow: 1,
    marginTop: '45px'
  },
  loader: {
    fontSize: '35px',
    marginTop: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

class AllExperiences extends React.Component {
  componentDidMount() {
    this.props.fetchAllExperiences()
    this.props.getCart()
  }

  render() {
    const {classes} = this.props

    if (!this.props.allExperiences.length) {
      return <div className={classes.loader}>Loading ...</div>
    }
    return (
      <div>
        <Grid container justify="center" spacing={40}>
          <Grid item xs={3} className={classes.content}>
            <SideBar />
          </Grid>
          <Grid item xs={9} className={classes.content}>
            <SingleExperience experiences={this.props.allExperiences} />
          </Grid>
        </Grid>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  allExperiences: state.experience.allExperiences,
  currentCart: state.cart
})
const mapDispatchToProps = dispatch => ({
  fetchAllExperiences: () => dispatch(fetchAllExperiences()),
  getCart: () => dispatch(getCart())
})

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(AllExperiences)
)
