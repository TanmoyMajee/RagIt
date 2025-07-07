
import { Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/landingPage'
import { ChatPage } from './pages/chatPage'

function App() {

  return (
   <>
      <Routes>
        <Route path='/' element={<LandingPage/>}  />
        <Route path='/chat' element={<ChatPage/>} />
      </Routes>
   </>
  )
}

export default App
