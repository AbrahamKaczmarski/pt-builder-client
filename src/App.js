import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Footer from './pages/App/Footer'
import Header from './pages/App/Header'
import Login from './pages/Auth/Login'
import NotFound from './pages/NotFound/NotFound'
import Profile from './pages/Profile/Profile'
import Register from './pages/Auth/Register'
import RuleEditor from './pages/Admin/RuleEditor'
import Summary from './pages/TeamBuilder/Summary'
import TeamBuilder from './pages/TeamBuilder/TeamBuilder'
import TeamList from './pages/TeamBuilder/TeamList'

import './i18n/i18n'
import Global from './Global'
import Toaster from 'components/Toaster/Toaster'

function App() {
  return (
    <Toaster>
      <Global>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<TeamBuilder />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/team' element={<TeamBuilder />} />
            <Route path='/team/:id' element={<Summary />} />
            <Route path='/teams' element={<TeamList />} />
            <Route path='/teams/:userId' element={<TeamList />} />
            <Route path='/rule-editor' element={<RuleEditor />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </Global>
    </Toaster>
  )
}

export default App
