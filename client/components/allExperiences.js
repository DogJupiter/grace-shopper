import React from 'react'
import {Grid} from '@material-ui/core'
import SingleExperience from './singleExperience'

export default class AllExperiences extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      experiences: [
        {
          id: 1,
          title: 'Really Cool Experience',
          imageUrl:
            'https://images.unsplash.com/photo-1524281423221-234569bc0438?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2378&q=80',
          category: 'Drinks',
          rating: 4
        },
        {
          id: 2,
          title: 'Another Really Cool Experience',
          imageUrl:
            'https://images.unsplash.com/photo-1524281423221-234569bc0438?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2378&q=80',
          category: 'Sports',
          rating: 3
        },
        {
          id: 1,
          title: 'A Third Cool Experience',
          imageUrl:
            'https://images.unsplash.com/photo-1524281423221-234569bc0438?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2378&q=80',
          category: 'Dance',
          rating: 5
        }
      ]
    }
  }
  render() {
    return (
      <div>
        <Grid container style={{flexGrow: 1}} spacing={40}>
          <Grid item xs={12}>
            <SingleExperience experiences={this.state.experiences} />
          </Grid>
        </Grid>
      </div>
    )
  }
}
