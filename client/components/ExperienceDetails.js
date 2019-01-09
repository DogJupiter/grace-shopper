import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
// import ButtonBase from '@material-ui/core/ButtonBase'

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
  async componentDidMount() {
    console.log('mounted experience', this.props)
    await this.props.fetchExperience(this.props.match.params.id)
  }

  render() {
    const {classes, experience} = this.props

    return experience && experience.name ? (
      <div
        container
        classes={{root: classes.root, margin: classes.margin}}
        color="font"
      >
        {/* <Paper className={classes.paper}> */}
        <Grid container className={classes.text} style={{margin: 50}}>
          <Grid item sm={3}>
            <img
              src={experience.imageUrl}
              className={classes.image}
              alt="experience"
            />
          </Grid>

          <Grid item sm style={{marginLeft: 40}}>
            <Typography className={classes.header}>
              {experience.name}
            </Typography>
            <p>
              <WatchLater className={classes.icons} /> {experience.duration}{' '}
              total
            </p>

            <p>
              <EventNote className={classes.icons} />
              {experience.category}
            </p>

            <p>$ {experience.price}.00</p>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
            >
              Add to Cart
            </Button>
          </Grid>

          <Grid item sm={12}>
            <h2 className={classes.uppercase}>Description</h2>
            <p>{experience.description}</p>
          </Grid>

          <Grid item sm={12}>
            {experience.reviews[0] ? (
              <div>
                <h3 className={classes.uppercase}>
                  Reviews from people who took this experience
                </h3>
                <h4>What guests are saying</h4>
                {experience.reviews.map(review => (
                  <Grid
                    key={review.id}
                    container
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item sm={1}>
                      <Avatar alt="userImg" src="" className={classes.avatar} />
                    </Grid>
                    <Grid item sm={11}>
                      {review.description}
                    </Grid>
                  </Grid>
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
  experience: state.experience.singleExperience
})

const mapDispatchToProps = dispatch => ({
  fetchExperience: id => dispatch(fetchExperience(id))
})

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ExperienceDetails)
)
