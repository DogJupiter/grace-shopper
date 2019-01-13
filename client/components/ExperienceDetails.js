import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'

import {addToCart} from '../store/cart'
import {fetchCart, addItemToCart} from '../store/'

import {
  Grid,
  Typography,
  Avatar,
  Button,
  ListItemText,
  ListItem,
  List,
  Divider
} from '@material-ui/core'
// import Grid from '@material-ui/core/Grid'

// import Typography from '@material-ui/core/Typography'
// import Avatar from '@material-ui/core/Avatar'
// import Button from '@material-ui/core/Button'

import {
  WatchLater,
  EventNote,
  SentimentVeryDissatisfied
} from '@material-ui/icons'

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
  }
})

class ExperienceDetails extends Component {
  handleAddToCart(experience) {
    this.props.addToCart(experience)
    this.props.addItemToCart(3, experience)
  }

  async componentDidMount() {
    console.log('mounted experience', this.props)
    await this.props.fetchExperience(this.props.match.params.id)
    // await this.props.fetchUsers;
    console.log('kevins cart going to be fetched')
    await this.props.fetchCart(3)
    console.log('kevins cart fetched')
  }

  render() {
    const {classes, experience} = this.props

    return experience && experience.name ? (
      <div
        container="true"
        classes={{root: classes.root, margin: classes.margin}}
        color="font"
      >
        <Grid container className={classes.text} style={{margin: 50}}>
          <Grid item sm={3}>
            <img
              src={experience.imageUrl}
              className={classes.image}
              alt="experience"
            />
          </Grid>

          <Grid item sm style={{marginLeft: 40}}>
            <Typography variant="h3" className={classes.uppercase}>
              {experience.name}
            </Typography>
            <List>
              <ListItem>
                <WatchLater className={classes.icons} />
                <ListItemText>{experience.duration} total</ListItemText>
              </ListItem>

              <ListItem>
                <EventNote className={classes.icons} />
                <ListItemText> {experience.category}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>$ {experience.price}.00</ListItemText>
              </ListItem>
            </List>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              onClick={() => this.handleAddToCart(experience)}
            >
              Add to Cart
            </Button>
          </Grid>

          <Grid item sm={12} style={{marginTop: 30, marginBottom: 30}}>
            <Typography variant="h4">Description</Typography>

            <Typography variant="body1" style={{marginTop: 20}}>
              {experience.description}
            </Typography>
          </Grid>

          <Grid item sm={12}>
            {experience.reviews[0] ? (
              <div>
                <Typography variant="h6">
                  Reviews from people who took this experience
                </Typography>

                {/* <Typography variant="subtitle1">
                    What guests are saying
                  </Typography> */}

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

                    {/* for possible use in the future */}
                    {/* <Divider variant="light" /> */}
                  </List>
                ))}
              </div>
            ) : (
              <p>
                <SentimentVeryDissatisfied className={classes.icons} /> No
                reviews for this experience
              </p>
            )}
          </Grid>
        </Grid>
      </div>
    ) : null
  }
}

ExperienceDetails.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  experience: state.experience.singleExperience,
  activeCart: state.cart,
  user: state.user,
  cartServer: state.cartServer
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchExperience: id => dispatch(fetchExperience(id)),
  addToCart: exp => dispatch(addToCart(exp)),
  fetchCart: userId => dispatch(fetchCart(userId)),
  addItemToCart: (userId, experience) =>
    dispatch(addItemToCart(userId, experience))
})

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ExperienceDetails)
)
