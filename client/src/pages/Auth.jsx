import { signInWithPopup } from 'firebase/auth';
import { BsRobot } from 'react-icons/bs';
import { FaGoogle } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerURL } from '../App';

const Auth = () => {

  const handleGoogleAuth= async ()=>{
    try {
      const res=await signInWithPopup(auth,provider);
      let user= res.user;
      let name= user.displayName;
      let email = user.email
      const result= await axios.post(ServerURL + "/api/auth/google", {name,email},
        {withCredentials: true
      })

      console.log(result.data);

      
    } catch (error) {
      console.log(error);
    }
  }




  return (
    <div className='w-full min-h-screen bg-linear-to-br from-gray-100 to-gray-200 flex justify-center items-center px-6 py-20'>

      <div className='w-full max-w-md px-8 py-8 rounded-3xl bg-white shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl'>

        {/* Logo */}
        <div className='flex items-center justify-center gap-3 mb-6'>
          <div className='bg-black text-white p-2.5 rounded-xl shadow-md'>
            <BsRobot size={18} />
          </div>
          <h2 className='text-2xl font-bold tracking-tight'>
            InterviewIQ<span className="text-gray-400">.AI</span>
          </h2>
        </div>

        {/* Heading */}
        <h1 className='text-xl md:text-2xl font-semibold text-center leading-snug'>
          Continue with <br />
          <span className='mt-2 inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm'>
            <IoSparkles size={16} />
            AI Smart Interview
          </span>
        </h1>

        {/* Description */}
        <p className='text-gray-500 text-sm md:text-base text-center mt-5 mb-8 leading-relaxed'>
          Start AI-powered mock interviews, track your progress, and unlock detailed performance insights.
        </p>

        {/* Google Button */}
        <button className='w-full flex items-center justify-center gap-3 bg-black text-white py-3 rounded-xl font-medium text-sm md:text-base transition-all duration-300 hover:bg-gray-900 hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer' onClick={handleGoogleAuth}>
          <FaGoogle size={18} />
          Continue with Google
        </button>

        {/* Footer */}
        <p className='text-xs text-gray-400 text-center mt-2'>
          By continuing, you agree to our Terms & Privacy Policy
        </p>

      </div>
    </div>
  );
};

export default Auth;