import React from 'react'
import {Link} from 'react-router-dom'

import {withStyles} from '@material-ui/core/styles'
import {CardMedia, Grid, Card, Typography, CardContent} from '@material-ui/core'
import PropTypes from 'prop-types'
import Fastfood from '@material-ui/icons/Fastfood'
import Casino from '@material-ui/icons/Casino'
import School from '@material-ui/icons/School'
import LocalBar from '@material-ui/icons/LocalBar'

const drawerWidth = 264
const styles = theme => ({
  root: {
    display: 'flex',
    width: `calc(100% - (${drawerWidth}px + 50px))`,
    marginLeft: `calc(${drawerWidth}px + 50px)`,
    padding: theme.spacing.unit * 4
  },
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
      <div className={classes.root}>
        <Grid container spacing={40}>
          {this.props.experiences.map(exp => {
            const {id, name, imageUrl, category, price} = exp
            return (
              <Grid key={exp.id} item>
                <Link to={`/experiences/${id}`}>
                  <Card style={{width: 345, height: 420}}>
                    <CardMedia
                      className={classes.image}
                      image={imageUrl}
                      title={name}
                    />
                    <CardContent>
                      <Typography paragraph style={{color: '#627264'}}>
                        {category === 'food' ? (
                          <Fastfood />
                        ) : category === 'drinks' ? (
                          <LocalBar />
                        ) : category === 'education' ? (
                          <School />
                        ) : (
                          <Casino />
                        )}{' '}
                        {category}
                      </Typography>
                      <Typography variant="h5" color="black">
                        {name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        style={{color: '#627264', bottom: 5}}
                      >
                        Price: $ {price}.00
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            )
          })}
        </Grid>
      </div>
    )
  }
}

SingleExperience.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SingleExperience)
