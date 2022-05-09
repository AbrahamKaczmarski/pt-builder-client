import React, { createContext, useRef, useState } from 'react'
import { login } from './services'

export const GlobalContext = createContext()

const Global = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const tokenRef = useRef(null)

  const signIn = (email, password) => {
    return login({ email, password }).then(({ data }) => {
      const { _id, email, friends, roles, username } = data.user
      setUser({
        email,
        friends,
        id: _id,
        name: username,
        roles
      })
      tokenRef.current = data.token
      setAuthenticated(true)
    })
  }

  const signOut = () => {
    setUser(null)
    setAuthenticated(false)
  }

  return (
    <GlobalContext.Provider
      value={{
        authenticated,
        user,
        signIn,
        signOut
      }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default Global
