import React from 'react'
import {Grid} from '@material-ui/core'
import SingleExperience from './singleExperience'
import {connect} from 'react-redux'
import {fetchAllExperiences} from '../store'

class AllExperiences extends React.Component {
  componentDidMount() {
    console.log('mounted')
    this.props.fetchAllExperiences()
  }

  render() {
    console.log(this.props, 'props')

    return (
      // This style div adds space to the left of the Grid container so that sidebar can be added
      // Anything non-material UI should be done stylistically in a CSS file (SCSS) and this should be given appropriate class/id.
      this.props.allExperiences && this.props.allExperiences.length ? (
        <div style={{marginLeft: '27%', justifyContent: 'center'}}>
          <Grid
            container
            justify="center"
            style={{
              flexGrow: 1
            }}
            spacing={40}
          >
            <Grid item xs={12}>
              <SingleExperience experiences={this.props.allExperiences} />
            </Grid>
          </Grid>
        </div>
      ) : (
        <div>Loading ...</div>
      )
    )
  }
}
const mapStateToProps = state => ({
  allExperiences: state.experience.allExperiences
})
const mapDispatchToProps = dispatch => ({
  fetchAllExperiences: () => dispatch(fetchAllExperiences())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllExperiences)
