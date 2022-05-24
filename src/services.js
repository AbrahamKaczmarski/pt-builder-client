import axios from 'axios'

export const server = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    accept: '*/*'
  },
  timeout: 10000
})

// # === Paths === # //

const userUrl = '/user'
const pokemonUrl = '/pokemon'
const invitationUrl = '/invitation'
const ruleUrl = '/rule'
const teamUrl = '/summary'
const engineUrl = '/engine'

// # === Methods === # //

// -- Auth -- //

export const registerUser = form => {
  return server.post(userUrl, form)
}

export const login = form => {
  return server.post(`${userUrl}/login`, form)
}

// -- Pokemon -- //

export const getPokemonList = () => {
  return server.get(`${pokemonUrl}/pokemons`)
}

// -- User -- //

export const getFriendList = () => {
  return server.get(`${userUrl}/friends`)
}

export const inviteFriend = email => {
  return server.post(`${userUrl}/invite`, { receiver: email })
}

export const updateUser = (key, value) => {
  switch (key) {
    case 'name':
      return server.patch(userUrl, { username: value })
    case 'email':
      return server.patch(userUrl, { email: value })
    default:
      return Promise.reject('Invalid key')
  }
}

// -- Invitations -- //

export const invitationAccept = id => {
  return server.get(`${invitationUrl}/accept/${id}`)
}

export const invitationReject = id => {
  return server.get(`${invitationUrl}/reject/${id}`)
}

export const invitationCancel = id => {
  return server.delete(`${invitationUrl}/${id}`)
}

export const getInvitationList = () => {
  return server.get(`${userUrl}/invitations`)
}

// -- Teams -- //

export const generateTeam = data => {
  return server.post(`${engineUrl}/team`, data)
}

export const deleteTeam = id => {
  return server.delete(`${teamUrl}/${id}`)
}

export const getTeamList = () => {
  return server.get(`${teamUrl}/summaries`)
}

export const getTeamListByUser = id => {
  return server.get(`${teamUrl}/user/${id}`)
}

export const getTeam = id => {
  return server.get(`${teamUrl}/${id}`)
}

export const publishTeam = id => {
  return server.get(`${teamUrl}/public/${id}`)
}

export const renameTeam = (id, name) => {
  return server.patch(`${teamUrl}/${id}`, { name })
}

// -- RuleEditor -- //

export const getRuleParams = () => {
  return server.get(`${ruleUrl}/rules`)
}

export const updateRule = (id, data) => {
  return server.patch(`${ruleUrl}/${id}`, data)
}
