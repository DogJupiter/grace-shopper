import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
// import {unstable_Box as Box} from '@material-ui/core/Box'
// import ButtonBase from '@material-ui/core/ButtonBase'
import WatchLaterIcon from '@material-ui/icons/WatchLater'
import EventNoteIcon from '@material-ui/icons/EventNote'
import SentimentIcon from '@material-ui/icons/SentimentVeryDissatisfied'

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
    width: 128,
    height: 128
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
    fontSize: '18px'
  }
})

class ExperienceDetails extends Component {
  async componentDidMount() {
    console.log('mounted experience', this.props)
    await this.props.fetchExperience(this.props.match.params.id)
  }

  render() {
    const {classes, experience} = this.props
    const {
      id,
      name,
      imageUrl,
      duration,
      category,
      description,
      price,
      reviews
    } = experience
    return id ? (
      <div className={classes.root} color="font">
        <Paper className={classes.paper}>
          <Grid container className={classes.text}>
            <Grid item sm={3}>
              <img className={classes.image} src={imageUrl} alt="experience" />
            </Grid>

            <Grid item sm>
              <Typography className={classes.header}>{name}</Typography>
              <p>
                <WatchLaterIcon className={classes.icons} /> {duration} hours
                total
              </p>
              <p>
                <EventNoteIcon className={classes.icons} /> {category}
              </p>
            </Grid>

            <Grid item sm={12}>
              <h2 className={classes.uppercase}>Description</h2>
              <p>{description}</p>
            </Grid>

            <Grid item sm={12}>
              {reviews[0] ? (
                <div>
                  <h3 className={classes.uppercase}>
                    {' '}
                    Reviews from people who took this experience
                  </h3>
                  <h4>What guests are saying</h4>
                  {reviews.map(review => (
                    <Grid
                      key={review.id}
                      container
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item sm={1}>
                        <Avatar
                          alt="userImg"
                          src=""
                          className={classes.avatar}
                        />
                      </Grid>
                      <Grid item sm={11}>
                        {review.description}
                      </Grid>
                    </Grid>
                  ))}
                </div>
              ) : (
                <p>
                  {' '}
                  <SentimentIcon className={classes.icons} /> No reviews for
                  this experience
                </p>
              )}
            </Grid>
          </Grid>
        </Paper>
      </div>
    ) : null
  }
}

ExperienceDetails.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  experience: state.experience.experience
})

const mapDispatchToProps = dispatch => ({
  fetchExperience: id => dispatch(fetchExperience(id))
})

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ExperienceDetails)
)
