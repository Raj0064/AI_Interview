import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'
import InterviewPage from './pages/InterviewPage'

export const ServerURL = "http://localhost:5000"

function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    const getUser = async()=>{
      try {
        const result=await axios.get(ServerURL+"/api/user/current-user",{withCredentials:true})
        dispatch(setUserData(result.data));
      } catch (error) {
        console.log(error);
        dispatch(setUserData(null))
      }
    }
    getUser()
  },[dispatch])



  return (<>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/auth' element={<Auth/>}></Route>
      <Route path='/interview' element={<InterviewPage/>}></Route>

     </Routes>
  </>)
}

export default App
