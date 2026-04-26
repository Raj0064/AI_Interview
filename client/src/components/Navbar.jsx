import React, { useState } from 'react';
import { BsCoin, BsRobot } from 'react-icons/bs';
import { FaUserAstronaut } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ServerURL } from '../App';
import { setUserData } from '../redux/userSlice';
import axios from 'axios';
import AuthModel from './AuthModel';

const Navbar = () => {

  const { userData } = useSelector((state) => state.user);
  const [showCreditPopUp, setShowCreditPopUp] = useState(false);
  const [showUserPopUp, setShowUserPopUp] = useState(false);

  const [showAuth,setShowAuth]=useState(false)
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const handleLogOut=async()=>{
    try {
      await axios.get(ServerURL+"/api/auth/logout",{withCredentials:true})
      dispatch(setUserData(null))
      setShowCreditPopUp(false)
      setShowUserPopUp(false)
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <BsRobot className="text-3xl text-blue-400" />
          <h1 className="text-xl font-bold">
            InterviewIQ<span className="text-blue-400">.AI</span>
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">

          {/* Credits */}
          <div className="relative">
            <button
              onClick={() => {
                if(!userData){setShowAuth(true); return}
                setShowCreditPopUp(!showCreditPopUp);
                 setShowUserPopUp(false)}}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg transition"
            >
              <BsCoin className="text-yellow-400" />
              {userData?.credits || 0}
            </button>

            {showCreditPopUp && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-800 p-4 rounded-lg shadow-lg text-sm">
                <p className="mb-2">
                  Need more credits to continue interview?
                </p>
                <button
                  onClick={() => navigate("/pricing")}
                  className="text-blue-400 hover:underline"
                >
                  Buy more credits
                </button>
              </div>
            )}
          </div>

          {/* User */}
          <div className="relative">
            <button
              onClick={() => {
                if (!userData) { setShowAuth(true); return }
                setShowUserPopUp(!showUserPopUp); setShowCreditPopUp(false)}}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 font-bold text-lg"
            >
              {userData
                ? userData?.name?.slice(0, 1).toUpperCase()
                : <FaUserAstronaut />}
            </button>

            {showUserPopUp && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg p-4 text-sm">
                <h2 className="font-semibold mb-2">
                  {userData?.name || "Guest"}
                </h2>

                <button
                  onClick={() => navigate("/history")}
                  className="block w-full text-left hover:text-blue-400 mb-2"
                >
                  Interview History
                </button>

                {userData && (
                <button
                  className="flex items-center gap-2 text-red-400 hover:text-red-500"
                  onClick={handleLogOut}
                
                >
                  <HiOutlineLogout />
                  Logout
                </button>
                )
            }
              </div>
            )}
          </div>

        </div>

      </div>
      {
        showAuth && <AuthModel onClose={()=>setShowAuth(false)}/>
      }
    </div>
  );
};

export default Navbar;