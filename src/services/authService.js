import http, { setJwt } from './httpService'
import jwtDecode from 'jwt-decode'
import db from './db.json'

setJwt(getJwt())

export async function login (user) {
  // Fake response for demo purposes
  const body = db.auth
    .filter(u => u.email === user.email && u.password === user.password)
    .map(u => u.jwt)

  // TODO : Implement real backend auth with this object instead
  // const body = {
  //   email: user.username,
  //   password: user.password
  // }
  const res = await http.post(`/auth`, body)
  const jwt = res.data

  window.localStorage.setItem('token', jwt)
  return res
}

export async function loginWithJwt (jwt) {
  window.localStorage.setItem('token', jwt)
}

export function logout () {
  window.localStorage.removeItem('token')
}

export function getCurrentUser () {
  try {
    const jwt = window.localStorage.getItem('token')
    return jwtDecode(jwt)
  } catch (ex) {
    return null
  }
}

function getJwt () {
  try {
    return window.localStorage.getItem('token')
  } catch (ex) {
    return null
  }
}

export default {
  getCurrentUser,
  getJwt,
  login,
  loginWithJwt,
  logout
}
