import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'

import {addToCart} from '../store/cart'
import {postUserReview} from '../store/experience'
import {getCart} from '../store/'
import AddReviewForm from './AddReviewForm'

import {
  Typography,
  Avatar,
  ListItemText,
  ListItem,
  List,
  Grid
} from '@material-ui/core'

import {connect} from 'react-redux'
import {fetchExperience} from '../store'

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
  render() {
    const {classes, experience} = this.props

    return (
      <div
        container="true"
        classes={{root: classes.root, margin: classes.margin}}
        color="font"
        className={classes.singleViewContainer}
      >
        <Grid container className={classes.text} style={{margin: 50}}>
          <Grid item sm={12}>
            <div>
              <Typography variant="h6">Reviews from beNewYorkers!</Typography>

              {experience.reviews.map(review => (
                <List className={classes.root} key={review.id}>
                  <ListItem>
                    <Avatar
                      alt="userImg"
                      src={review.user.imageUrl}
                      className={classes.avatar}
                    />
                    <ListItemText
                      primary={review.user.firstName}
                      secondary={`${new Date(
                        review.user.createdAt
                      ).toLocaleString('en-us', {
                        month: 'long'
                      })}, ${new Date(review.user.createdAt).getFullYear()}`}
                    />
                  </ListItem>
                  <ListItemText>{review.description}</ListItemText>
                </List>
              ))}
            </div>
            <div>
              <AddReviewForm
                experience={experience}
                currentExp={this.props.currentExp}
              />
            </div>
          </Grid>
        </Grid>
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
