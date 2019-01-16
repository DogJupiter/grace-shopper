import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'

import {addToCart} from '../store/cart'
import {postUserReview} from '../store/experience'
import {getCart} from '../store/'

import {Button, Grid, TextField} from '@material-ui/core'

import {connect} from 'react-redux'
import {fetchExperience} from '../store'

import history from '../history'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
    maxWidth: '100vw'
  },
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'cover'
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  icons: {
    align: 'center'
  },
  avatar: {
    margin: 10
  },
  header: {
    fontSize: '48px',
    textTransform: 'uppercase'
  },
  uppercase: {
    textTransform: 'uppercase'
  },
  text: {
    fontSize: 18
  },
  margin: {
    marginTop: 100
  },
  singleViewContainer: {
    marginTop: 50,
    marginRight: 100
  }
})

class AllReviews extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    const review = evt.target.review.value
    let newReview = {description: review}
    this.props.postUserReview(this.props.currentExp, newReview)
  }

  render() {
    const {classes} = this.props

    return (
      <div
        container="true"
        classes={{root: classes.root, margin: classes.margin}}
        color="font"
        className={classes.singleViewContainer}
      >
        <div>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12}>
              <form name="reviewForm" onSubmit={this.handleSubmit}>
                <TextField
                  name="firstName"
                  label="Your Name!"
                  margin="normal"
                  id="standard-full-width"
                  style={{margin: 8}}
                  fullWidth
                  placeholder={this.props.user.firstName || 'Your Name'}
                />
                <TextField
                  name="review"
                  label="Say something nice..."
                  margin="normal"
                  id="standard-full-width"
                  style={{margin: 8}}
                  fullWidth
                />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  id="standard-full-width"
                  style={{margin: 8}}
                  fullWidth
                >
                  Submit
                </Button>
              </form>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  experience: state.experience.singleExperience,
  activeCart: state.cart,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchExperience: id => dispatch(fetchExperience(id)),
  addToCart: exp => dispatch(addToCart(exp)),
  getCart: () => dispatch(getCart()),
  postUserReview: (expId, review) => dispatch(postUserReview(expId, review))
})

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(AllReviews)
)
