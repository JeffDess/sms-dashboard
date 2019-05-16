// import http from './httpService'
import db from './../db.json'

export async function getSubscriptions () {
  // Fake response for demo purposes
  const body = db.subscriptions

  // TODO : Implement real backend call
  return { status: 200, data: body }
}
