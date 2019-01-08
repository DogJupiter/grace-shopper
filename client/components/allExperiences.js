import React from 'react'
import {CardMedia, Grid, Card, Typography, CardContent} from '@material-ui/core'

export default class AllExperiences extends React.Component {
  render() {
    return (
      <div>
        <Grid container style={{flexGrow: 1}} spacing={40}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={40}>
              <Grid item>
                <Card style={{width: 400}}>
                  <CardMedia
                    style={{height: 60, paddingTop: '56.25%'}}
                    image="https://images.unsplash.com/photo-1524281423221-234569bc0438?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2378&q=80"
                    title="Hiking to the top of the mountain"
                  />
                  <CardContent>
                    <Typography component="h2">
                      Hike to the top of the mountain
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography component="p">Category</Typography>
                  </CardContent>
                  <CardContent>
                    <Typography component="p">Rating</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card style={{width: 400}}>
                  <CardMedia
                    style={{height: 60, paddingTop: '56.25%'}}
                    image="https://images.unsplash.com/photo-1524281423221-234569bc0438?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2378&q=80"
                    title="Hiking to the top of the mountain"
                  />
                  <CardContent>
                    <Typography component="h2">
                      Hike to the top of the mountain
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography component="p">Category</Typography>
                  </CardContent>
                  <CardContent>
                    <Typography component="p">Rating</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card style={{width: 400}}>
                  <CardMedia
                    style={{height: 60, paddingTop: '56.25%'}}
                    image="https://images.unsplash.com/photo-1524281423221-234569bc0438?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2378&q=80"
                    title="Hiking to the top of the mountain"
                  />
                  <CardContent>
                    <Typography component="h2">
                      Hike to the top of the mountain
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography component="p">Category</Typography>
                  </CardContent>
                  <CardContent>
                    <Typography component="p">Rating</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

/*<Grid item>
                <Paper style={{height: '327px', width: '302px'}} />
              </Grid>
              <Grid item>
                <Paper style={{height: '327px', width: '302px'}} />
              </Grid>
              <Grid item>
                <Paper style={{height: '327px', width: '302px'}} />
              </Grid>*/
