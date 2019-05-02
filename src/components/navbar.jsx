import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import IconButton from '@material-ui/core/IconButton'
import { PropTypes } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Person from '@material-ui/icons/Person'
import Edit from '@material-ui/icons/Edit'
import HowToReg from '@material-ui/icons/HowToReg'
import Message from '@material-ui/icons/Message'
import PhoneIphone from '@material-ui/icons/PhoneIphone'
import blue from '@material-ui/core/colors/blue'

function TabContainer (props) {
  return (
    <Typography component='div' style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: blue[800]
  },
  tabs: {
    flexGrow: 1,
    backgroundColor: blue[700]
  },
  title: {
    flexGrow: 1,
    fontSize: '2.5rem',
    marginTop: '0.3rem'
  }
})

class Navbar extends Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }
  render () {
    const { username } = this.props
    const { value } = this.state
    const { classes } = this.props
    return (
      <nav className={classes.root}>
        <AppBar position='static' className={classes.root}>
          <Toolbar>
            <PhoneIphone fontSize='large' />
            <Typography
              to='/'
              variant='h1'
              color='inherit'
              fontSize='small'
              style={{ verticalAlign: 'middle' }}
              className={classes.title}
            >
              SMS SENDER
            </Typography>
            {!username && (
              <Button to='/login' component={Link}>
                Login
              </Button>
            )}
            {username && (
              <Avatar to='/profile'>
                <Person />
              </Avatar>
            )}
            {username && (
              <Button to='/logout' component={Link}>
                Logout
              </Button>
            )}
          </Toolbar>
          <Tabs
            className={classes.tabs}
            value={value}
            onChange={this.handleChange}
          >
            <Tab
              label={
                <React.Fragment>
                  <IconButton color='inherit' aria-label='Compose menu icon'>
                    <Edit className='nav__icon' />
                  </IconButton>
                  <div>New SMS</div>
                </React.Fragment>
              }
              to='/compose'
              component={Link}
            />
            <Tab
              label={
                <React.Fragment>
                  <IconButton
                    color='inherit'
                    aria-label='Subscriptions menu icon'
                  >
                    <HowToReg className='nav__icon' />
                  </IconButton>
                  <div>Subscriptions</div>
                </React.Fragment>
              }
              to='/subscriptions'
              component={Link}
            />
            <Tab
              label={
                <React.Fragment>
                  <IconButton
                    color='inherit'
                    aria-label='Messages log menu icon'
                  >
                    <Message className='nav__icon' />
                  </IconButton>
                  <div>Messages Log</div>
                </React.Fragment>
              }
              to='/log'
              component={Link}
            />
          </Tabs>
        </AppBar>
      </nav>
    )
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Navbar)
