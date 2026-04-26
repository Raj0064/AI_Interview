import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Auth from '../pages/Auth';

const AuthModel = ({ onClose }) => {
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (userData) onClose();
  }, [userData, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10 px-4"
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white text-gray-900 rounded-2xl shadow-2xl p-6 animate-scaleIn"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black transition"
        >
          <FaTimes size={18} />
        </button>

        {/* Auth Form ONLY */}
        <Auth isModel={true} />
      </div>
    </div>
  );
};

export default AuthModel;