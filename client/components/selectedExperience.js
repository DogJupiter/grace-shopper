import React from 'react'
import {CardMedia, Grid, Card, Typography, CardContent} from '@material-ui/core'

export default class SelectedExperience extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Grid container justify="center" spacing={40}>
          {this.props.experiences.map(exp => {
            return (
              <Grid item key={exp.id}>
                <Card style={{width: 400}}>
                  <CardMedia
                    style={{height: 60, paddingTop: '56.25%'}}
                    image={exp.imageUrl}
                    title={exp.title}
                  />
                  <CardContent>
                    <Typography component="h2">{exp.title}</Typography>
                  </CardContent>
                  <CardContent>
                    <Typography component="p">{exp.category}</Typography>
                  </CardContent>
                  <CardContent>
                    <Typography component="p">{exp.rating}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </div>
    )
  }
}
