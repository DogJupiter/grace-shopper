import React from 'react'
import {Link} from 'react-router-dom'

import {withStyles} from '@material-ui/core/styles'
import {CardMedia, Grid, Card, Typography, CardContent} from '@material-ui/core'
import PropTypes from 'prop-types'

const styles = theme => ({
  image: {
    height: 65,
    paddingTop: '56.25%',
    objectFit: 'cover'
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%'
  }
})

class SingleExperience extends React.Component {
  render() {
    const {classes} = this.props
    return (
      <Grid container spacing={40}>
        {this.props.experiences.map(exp => {
          const {id, name, imageUrl, category, price} = exp
          return (
            <Grid key={exp.id} item>
              <Link to={`/experiences/${id}`}>
                <Card style={{width: 336}}>
                  <CardMedia
                    className={classes.image}
                    image={imageUrl}
                    title={name}
                  />
                  <CardContent>
                    <Typography paragraph style={{color: '#627264'}}>
                      {category}
                    </Typography>
                    <h3 color="secondary">{name}</h3>
                    <Typography paragraph style={{color: '#627264'}}>
                      $ {price}.00
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          )
        })}
      </Grid>
    )
  }
}

SingleExperience.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SingleExperience)
