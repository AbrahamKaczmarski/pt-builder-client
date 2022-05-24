export const setCache = (data, key = 'cache') => {
  localStorage.setItem(
    `ptBuilder::${key}`,
    data instanceof Object ? JSON.stringify(data) : data
  )
}

export const getCache = (key = 'cache') => {
  return localStorage.getItem(`ptBuilder::${key}`)
}

export const clearCache = (keys = 'cache') => {
  if (!(keys instanceof Array)) {
    keys = [keys]
  }
  keys.forEach(key => {
    localStorage.removeItem(`ptBuilder::${key}`)
  })
}

export const addLocalTeam = team => {
  const teams = JSON.parse(getCache('localTeams')) ?? []
  const n = teams.length
  teams.push(team)
  setCache(teams, 'localTeams')
  return n
}

export const updateLocalTeam = (index, name) => {
  const teams = JSON.parse(getCache('localTeams')) ?? []
  if (index < teams.length) {
    teams[index].name = name
    setCache(teams, 'localTeams')
    return teams[index]
  }
  return false
}

export const removeLocalTeam = index => {
  const teams = JSON.parse(getCache('localTeams')) ?? []
  if (index < teams.length) {
    teams.splice(index, 1)
    setCache(teams, 'localTeams')
    return true
  }
  return false
}
