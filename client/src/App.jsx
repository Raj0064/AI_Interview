import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'

export const ServerURL = "http://localhost:5000"

function App() {
  return (<>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/auth' element={<Auth/>}></Route>

     </Routes>
  </>)
}

export default App
