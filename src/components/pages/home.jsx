import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  featureList: {
    fontSize: '1.2rem',
    lineHeight: 1.8,
    listStyle: 'none'
  },
  emoji: {
    marginRight: theme.spacing(1)
  }
}))

function Home ({ username }) {
  const classes = useStyles()
  return (
    <>
      <Paper className={classes.root}>
        <Typography component='h1' variant='h3'>
          SMS Dashboard Demo
        </Typography>
        <p>This app allows you to:</p>
        <ul className={classes.featureList}>
          <li>
            <span
              role='img'
              aria-label='Mobile phone with arrow'
              className={classes.emoji}
            >
              📲
            </span>
            &nbsp;Mass send SMS to distribution lists
          </li>
          <li>
            <span
              role='img'
              aria-label='Bullseye target'
              className={classes.emoji}
            >
              🎯
            </span>
            &nbsp;Target an audience for each message
          </li>
          <li>
            <span role='img' aria-label='Microscope' className={classes.emoji}>
              🔬
            </span>
            &nbsp;View message metrics (characters, bytes and segments count)
          </li>
          <li>
            <span
              role='img'
              aria-label='Money with wings'
              className={classes.emoji}
            >
              💸
            </span>
            &nbsp;Estimate your costs
          </li>
          <li>
            <span role='img' aria-label='Silouhettes' className={classes.emoji}>
              👥
            </span>
            &nbsp;Browse your distribution lists
          </li>
          <li>
            <span role='img' aria-label='Envelope' className={classes.emoji}>
              💬
            </span>
            &nbsp;Browse your messages history
          </li>
        </ul>
        <p>
          This demo app uses fake static data to illustrate its functionalities.
          For security reasons, you cannot send SMS with it unless you hook it
          with your own backend. Please visit the{' '}
          <a
            href='https://github.com/jeffdess/sms-dashboard'
            title='SMS Dashboard on Github'
            target='blank'
          >
            Github repository
          </a>{' '}
          and read the documentation to learn how you can achieve this with
          minimal configuration.
        </p>
        {!username && (
          <p>To try the app, start by clicking the login button.</p>
        )}
      </Paper>
    </>
  )
}

export default Home
