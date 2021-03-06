import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

import { clearCache, getCache, setCache } from 'cache'
import { useToaster } from 'hooks'
import { server, getInvitationList, getPokemonList, login } from 'services'

export const GlobalContext = createContext()

const Global = ({ children }) => {
  const { showError } = useToaster()

  const [initialized, setInitialized] = useState(false)
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

  const getPokemon = useCallback(
    name => {
      if (name) {
        return Object.entries(pokedex).find(
          ([_, pokemon]) => pokemon.name === name
        )[1]
      }
      const keys = Object.keys(pokedex)
      const idx = Math.floor(Math.random() * keys.length)
      return pokedex[keys[idx]]
    },
    [pokedex]
  )

  const [teams, setTeams] = useState(getCache())

  // init
  useEffect(() => {
    // -- get Pokemon information
    let mounted = true
    getPokemonList()
      .then(({ data }) => {
        if (!mounted) return
        setPokedex(
          data.reduce(
            (obj, pokemon) => ({ ...obj, [pokemon._id]: pokemon }),
            {}
          )
        )
      })
      .catch(err => {
        showError(err.message)
      })
    return () => {
      mounted = false
    }
  }, [])

  // -- try to maintain previous session
  useEffect(() => {
    if (authenticated) return
    setInitialized(false)
    const user = getCache('user')
    const token = getCache('token')
    if (user && token) {
      setUser(JSON.parse(user))
      setToken(token)
      setAuthenticated(true)
      server.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    setInitialized(true)
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
    setInitialized(false)
    return login({ email, password })
      .then(({ data }) => {
        updateUserData(data.user)
        updateToken(data.token)
        setAuthenticated(true)
      })
      .finally(() => {
        setInitialized(true)
      })
  }

  const signOut = () => {
    setUser(null)
    setToken(null)
    clearCache(['user', 'token'])
    setAuthenticated(false)
    setInitialized(false)
    delete server.defaults.headers.common['Authorization']
  }

  return (
    <GlobalContext.Provider
      value={{
        initialized,
        authenticated,
        user,
        signIn,
        signOut,
        pokedex,
        getPokemon,
        invitations,
        updateInvitations,
        updateUserData,
        updateToken
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default Global
