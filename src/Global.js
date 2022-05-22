import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

import { useToaster } from 'hooks'

import { server, getInvitationList, getPokemonList, login } from './services'

export const GlobalContext = createContext()

const setCache = (data, key = 'cache') => {
  localStorage.setItem(
    `ptBuilder::${key}`,
    data instanceof Object ? JSON.stringify(data) : data
  )
}

const getCache = (key = 'cache') => {
  return localStorage.getItem(`ptBuilder::${key}`)
}

const clearCache = (keys = 'cache') => {
  if (!(keys instanceof Array)) {
    keys = [keys]
  }
  keys.forEach(key => {
    localStorage.removeItem(`ptBuilder::${key}`)
  })
}

const Global = ({ children }) => {
  const { showInfo } = useToaster()

  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const tokenRef = useRef(null)

  const setToken = token => {
    tokenRef.current = token
  }

  const [invitations, setInvitations] = useState([])

  const updateInvitations = () => {
    getInvitationList().then(({ data }) => {
      setInvitations(data)
    })
  }

  const [pokedex, setPokedex] = useState(null)

  const randomPokemon = useCallback(() => {
    const keys = Object.keys(pokedex)
    const idx = Math.floor(Math.random() * keys.length)
    return pokedex[keys[idx]]
  }, [pokedex])

  const [teams, setTeams] = useState(getCache())

  // init
  useEffect(() => {
    // -- get Pokemon information
    let mounted = true
    getPokemonList().then(({ data }) => {
      if (!mounted) return
      setPokedex(
        data.reduce((obj, pokemon) => ({ ...obj, [pokemon._id]: pokemon }), {})
      )
      showInfo('Pokedex updated')
    })
    return () => {
      mounted = false
    }
  }, [])

  // -- try to maintain previous session
  useEffect(() => {
    if (authenticated) return
    const user = getCache('user')
    const token = getCache('token')
    if (user && token) {
      setUser(JSON.parse(user))
      setToken(token)
      setAuthenticated(true)
      server.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }, [authenticated])

  useEffect(() => {
    if (!authenticated) return
    let mounted = true
    updateInvitations()
    return () => {
      mounted = false
    }
  }, [authenticated])

  useEffect(() => {
    setCache(teams)
  }, [teams])

  const updateUserData = ({ _id, email, friends, roles, username }) => {
    const user = {
      email,
      friends,
      id: _id,
      name: username,
      roles
    }
    setUser(user)
    setCache(user, 'user')
  }

  const updateToken = token => {
    setToken(token)
    setCache(token, 'token')
    server.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  const signIn = (email, password) => {
    return login({ email, password }).then(({ data }) => {
      updateUserData(data.user)
      updateToken(data.token)
      setAuthenticated(true)
    })
  }

  const signOut = () => {
    setUser(null)
    setToken(null)
    clearCache(['user', 'token'])
    setAuthenticated(false)
    delete server.defaults.headers.common['Authorization']
  }

  return (
    <GlobalContext.Provider
      value={{
        authenticated,
        user,
        signIn,
        signOut,
        pokedex,
        randomPokemon,
        invitations,
        updateInvitations,
        updateUserData
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default Global
