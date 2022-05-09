import axios from 'axios'

export const server = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    accept: '*/*'
  },
  timeout: 10000
})

// # === Paths === # //

// # === Methods === # //

// -- Auth -- //

export const registerUser = form => {
  return server.post('/user', form)
}

export const login = form => {
  return server.post('/user/login', form)
}
