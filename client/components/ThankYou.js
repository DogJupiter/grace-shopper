import React from 'react'
import {Link} from 'react-router-dom'
import {
  Grid,
  Typography,
  Button,
  Card,
  Divider,
  CardMedia,
  CardHeader
} from '@material-ui/core'

import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'

import {clearCart} from '../store/cart'

const styles = () => ({
  content: {
    flexGrow: 1,
    marginTop: '50px',
    marginLeft: '50px',
    justifyContent: 'center'
  },
  pageHeader: {
    fontSize: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50px',
    fontFamily: '-apple-system'
  },
  button: {
    justifyContent: 'center',
    justify: 'center',
    alignItems: 'center',
    alignText: 'center'
  }
})

class ThankYou extends React.Component {
  render() {
    const {classes} = this.props
    return (
      <div>
        <Typography className={classes.pageHeader}>
          Thanks for your order! Come again soon!
        </Typography>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activeCart: state.cart,
  user: state.user
})
const mapDispatchToProps = dispatch => ({
  clearCart: () => {
    dispatch(clearCart())
  }
})

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ThankYou)
)
