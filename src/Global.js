import React, { createContext, useState } from 'react'

export const GlobalContext = createContext()

const Global = ({ children }) => {
  const [user, setUser] = useState(null)

  const signIn = (email, password) => {
    return new Promise(res => {
      setUser({ name: 'Test User', email })
      res()
    })
  }

  const signOut = () => {
    setUser(null)
  }

  return (
    <GlobalContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default Global
