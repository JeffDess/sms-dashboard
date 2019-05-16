import React from 'react'
import Typography from '@material-ui/core/Typography'

function Home () {
  return (
    <>
      <Typography component='h1' variant='h3'>
        SMS Dashboard Demo
      </Typography>
      <p>This app allows you to:</p>
      <ul>
        <li>Mass send SMS to distribution lists</li>
        <li>Target an audience for each message</li>
        <li>Browse your distribution lists</li>
        <li>Browse your messages history</li>
      </ul>
      <p>
        This demo app uses static fake data to illustrate its functionnalities.
        You cannot send SMS with it unless you hook it with your own backend.
        Please visit the{' '}
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
      <p>To try the app, start by clicking the login button.</p>
    </>
  )
}

export default Home
