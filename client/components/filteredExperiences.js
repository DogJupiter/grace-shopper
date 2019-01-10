import React from 'react'
import {Grid} from '@material-ui/core'
import SingleExperience from './singleExperience'
import {connect} from 'react-redux'
import {fetchFilteredExperiences} from '../store/experience'

class FilteredExperiences extends React.Component {
  async componentDidMount() {
    await this.props.fetchFiltered(this.props.match.params.id)
  }

  render() {
    return (
      // This style div adds space to the left of the Grid container so that sidebar can be added
      // Anything non-material UI should be done stylistically in a CSS file (SCSS) and this should be given appropriate class/id.
      this.props.filteredExperiences &&
        this.props.filteredExperiences.length ? (
        <div style={{marginLeft: '27%', justifyContent: 'center'}}>
          <h1>THIS IS THE FILTERED EXPERIENCES VIEW!!!</h1>
          <Grid
            container
            justify="center"
            style={{
              flexGrow: 1
            }}
            spacing={40}
          >
            <Grid item xs={12}>
              <SingleExperience experiences={this.props.filteredExperiences} />
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
  filteredExperiences: state.experience.filteredExperiences
})
const mapDispatchToProps = dispatch => ({
  fetchFiltered: id => dispatch(fetchFilteredExperiences(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(FilteredExperiences)
