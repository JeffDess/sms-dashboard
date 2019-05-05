// import http from './httpService'
import db from './../db.json'

export async function getMessages () {
  // Fake response for demo purposes
  const body = db.messages

  // TODO : Implement real backend call
  // const res = await http.post(`/auth`, body)
  // return res
  return { status: 200, data: body }
}

export default {
  getMessages
}
