import React from 'react'
import {Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import queryString from 'query-string'
import SingleExperience from './singleExperience'
import SideBar from './SideBar'

import {fetchFilteredExperiences} from '../store/experience'

const styles = theme => ({
  content: {
    flexGrow: 1,
    marginTop: '45px'
  },
  loader: {
    fontSize: '35px',
    marginTop: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

class FilteredExperiences extends React.Component {
  async componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    console.log('THESE ARE THE PARAMS PASSED TO FETCH FILTER:', values)
    await this.props.fetchFiltered(values.category)
  }

  componentDidUpdate(prevProps) {
    const values = queryString.parse(this.props.location.search)
    const prevPropsValues = queryString.parse(prevProps.location.search)
    if (values.category !== prevPropsValues.category) {
      this.props.fetchFiltered(values.category)
    }
  }

  render() {
    const {classes} = this.props
    return this.props.filteredExperiences &&
      this.props.filteredExperiences.length ? (
      <div style={{marginLeft: '27%', justifyContent: 'center'}}>
        <Grid item xs={3} className={classes.content}>
          <SideBar />
        </Grid>
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
  }
}
const mapStateToProps = state => ({
  filteredExperiences: state.experience.filteredExperiences
})
const mapDispatchToProps = dispatch => ({
  fetchFiltered: categoryType =>
    dispatch(fetchFilteredExperiences(categoryType))
})

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(FilteredExperiences)
)
