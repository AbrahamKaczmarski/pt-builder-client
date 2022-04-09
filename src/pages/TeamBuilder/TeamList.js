import React from 'react'
import { useSearchParams } from 'react-router-dom'

const TeamList = () => {
  const [search] = useSearchParams()
  const user = search.get('user')

  return (
    <main>
      <h2>Team List</h2>
      <p>User: {user ?? 'current user'}</p>
    </main>
  )
}

export default TeamList
