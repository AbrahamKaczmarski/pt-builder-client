import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <main>
      <h2>Page Not Found</h2>
      <p className='link'><Link to='/'>Home</Link></p>
    </main>
  )
}

export default NotFound
