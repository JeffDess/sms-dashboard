import http from './httpService'

export function getUsers () {
  return http.get(`/users`)
}

export function getUser (userId) {
  return http.get(`/users/${userId}`)
}

export function saveUser (user) {
  const body = {
    email: user.username,
    name: user.name,
    password: user.password
  }

  // Update
  if (user._id) {
    return http.put(`/users/${user._id}`, body)
  }
  // Create
  return http.post(`/users`, body)
}

export function deleteUser (id) {
  return http.delete(`/users/${id}`)
}
