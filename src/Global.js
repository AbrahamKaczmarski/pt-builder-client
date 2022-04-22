import React, { createContext, useState } from 'react'

export const GlobalContext = createContext()

const Global = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const signIn = (email, password) => {
    return new Promise(res => {
      setUser({ name: 'Test User', email })
      setAuthenticated(true)
      res()
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
