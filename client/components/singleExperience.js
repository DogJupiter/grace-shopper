import React from 'react'
import {CardMedia, Grid, Card, Typography, CardContent} from '@material-ui/core'

export default class SingleExperience extends React.Component {
  render() {
    return (
      <Grid container spacing={40}>
        {this.props.experiences.map(exp => {
          const {name, imageUrl, category, price} = exp
          return (
            <Grid item key={exp.id}>
              <Card style={{width: 336}}>
                <CardMedia
                  style={{height: 60, paddingTop: '56.25%'}}
                  image={imageUrl}
                  title={name}
                />
                <CardContent>
                  <Typography component="p" style={{color: '#627264'}}>
                    {category}
                  </Typography>
                  <h3 style={{color: '#FCC30A'}}>{name}</h3>
                  <Typography component="p" style={{color: '#627264'}}>
                    $ {price}.00
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    )
  }
}
