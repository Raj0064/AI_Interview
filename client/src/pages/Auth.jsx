import { signInWithPopup } from 'firebase/auth';
import { BsRobot } from 'react-icons/bs';
import { FaGoogle } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerURL } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const Auth = ({ isModel = false }) => {

  const dispatch = useDispatch();
  let isSubmitting = false;

  const handleGoogleAuth = async () => {
    if (isSubmitting) return;
    isSubmitting = true;

    try {
      const res = await signInWithPopup(auth, provider);

      let user = res.user;
      let name = user.displayName;
      let email = user.email;

      const result = await axios.post(
        ServerURL + "/api/auth/google",
        { name, email },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
    } catch (error) {
      console.log(error);
      dispatch(setUserData(null));
    } finally {
      isSubmitting = false;
    }
  };

  return (
    <div
      className={`w-full flex justify-center items-center ${
        isModel ? "py-2" : "min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-20"
      }`}
    >
      <div
        className={`w-full ${
          isModel ? "max-w-sm p-6" : "max-w-md p-8"
        } rounded-2xl bg-white shadow-xl border border-gray-100`}
      >

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="bg-black text-white p-2.5 rounded-xl">
            <BsRobot size={18} />
          </div>
          <h2 className="text-xl font-bold">
            InterviewIQ<span className="text-gray-400">.AI</span>
          </h2>
        </div>

        {/* Heading */}
        <h1 className="text-lg md:text-xl font-semibold text-center leading-snug">
          Continue with <br />
          <span className="mt-2 inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium">
            <IoSparkles size={14} />
            AI Smart Interview
          </span>
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-sm text-center mt-4 mb-6 leading-relaxed">
          Start AI-powered mock interviews, track your progress, and unlock detailed performance insights.
        </p>

        {/* Google Button */}
        <button
          className="w-full flex items-center justify-center gap-3 bg-black text-white py-2.5 rounded-lg font-medium text-sm transition hover:bg-gray-900 active:scale-[0.98]"
          onClick={handleGoogleAuth}
        >
          <FaGoogle size={16} />
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-4">
          By continuing, you agree to Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Auth;