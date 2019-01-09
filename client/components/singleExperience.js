import React from 'react'
import {CardMedia, Grid, Card, Typography, CardContent} from '@material-ui/core'
import {Link} from 'react-router-dom'
export default class SingleExperience extends React.Component {
  render() {
    return (
      <Grid container spacing={40}>
        {this.props.experiences.map(exp => {
          const {id, name, imageUrl, category, price} = exp
          return (
            <Grid key={exp.id} item>
              <Link to={`/experiences/${id}`}>
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
              </Link>
            </Grid>
          )
        })}
      </Grid>
    )
  }
}
