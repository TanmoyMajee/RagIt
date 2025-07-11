
import { Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/landingPage'
import { ChatPage } from './pages/chatPage'
import Login from './pages/login'
import SignUp from './pages/signup'
import Layout from './components/layout'

function App() {

  return (
   <>
      <Routes>
        <Route  element={<Layout/>} >
            <Route path='/' element={<LandingPage/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
        </Route>
        <Route path='/chat' element={<ChatPage/>} />
      </Routes>
   </>
  )
}

export default App
