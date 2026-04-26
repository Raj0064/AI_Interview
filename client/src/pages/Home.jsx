import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { useSelector } from 'react-redux';
import { HiSparkles } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import AuthModel from '../components/AuthModel';
import { BsBarChart, BsClock, BsFileEarmarkText, BsMic, BsRobot } from 'react-icons/bs';
import evalImg from "../assets/ai-ans.png"
import hrImg from "../assets/HR.png"
import resumeImg from "../assets/resume.png"
import pdfImg from "../assets/pdf.png"
import analyticsImg from "../assets/history.png"
import techImg from "../assets/tech.png"
import confidenceImg from "../assets/confi.png"
import creditImg from "../assets/credit.png"
import Footer from '../components/Footer';



const Home = () => {
  const { userData } = useSelector((state) => state.user);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-14 text-center">

        {/* Tagline */}
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <HiSparkles />
          AI Powered Smart Interview Platform
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-black">
          Practice Interviews with{" "}
          <span className="block mt-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]">
            AI Intelligence
          </span>
        </h1>

        {/* Description */}
        <p className="mt-5 text-gray-600 text-base max-w-xl mx-auto">
          Role-based mock interviews with smart follow-ups, adaptive difficulty,
          and real-time performance evaluation.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4 flex-wrap">

          {/* Start */}
          <button
            className="bg-black hover:bg-gray-900 text-white px-5 py-2.5 rounded-lg font-medium transition"
            onClick={() => {
              if (!userData) {
                setShowAuth(true);
                return;
              }
              navigate("/interview");
            }}
          >
            Start Interview
          </button>

          {/* History */}
          <button
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-5 py-2.5 rounded-lg font-medium transition"
            onClick={() => {
              if (!userData) {
                setShowAuth(true);
                return;
              }
              navigate("/history");
            }}
          >
            View History
          </button>

        </div>

      </div>
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Steps Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: <BsRobot size={22} />,
              title: "Role & Experience Selection",
              desc: "AI adjusts difficulty based on selected job role."
            },
            {
              icon: <BsMic size={22} />,
              title: "Smart Voice Interview",
              desc: "Dynamic follow-up questions based on your answers."
            },
            {
              icon: <BsClock size={22} />,
              title: "Timer Based Simulation",
              desc: "Real interview pressure with time tracking."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition text-center"
            >
              <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 mb-3">
                {item.icon}
              </div>

              <h3 className="font-semibold text-gray-900 mb-1">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Advanced AI Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-black">
            Advanced AI{" "}
            <span className="text-blue-600">Capabilities</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              image: evalImg,
              icon: <BsBarChart size={18} />,
              title: "AI Answer Evaluation",
              desc: "Scores communication, technical accuracy and confidence."
            },
            {
              image: resumeImg,
              icon: <BsFileEarmarkText size={18} />,
              title: "Resume Based Interview",
              desc: "Project-specific questions based on uploaded resume."
            },
            {
              image: pdfImg,
              icon: <BsFileEarmarkText size={18} />,
              title: "Downloadable PDF Report",
              desc: "Detailed strengths, weaknesses and insights."
            },
            {
              image: analyticsImg,
              icon: <BsBarChart size={18} />,
              title: "History & Analytics",
              desc: "Track progress with performance graphs."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="flex bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* Left Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-40 h-40 object-cover"
              />

              {/* Right Content */}
              <div className="p-4 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  {item.icon}
                  <h3 className="font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>

                <p className="text-gray-600 text-sm">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Multiple Modes Section */}
        <div className="text-center mb-8 mt-16">
          <h2 className="text-2xl font-bold text-black">
            Multiple Interview{" "}
            <span className="text-blue-600">Modes</span>
          </h2>
        </div>


        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              img: hrImg,
              icon: <BsRobot size={18} />,
              title: "HR Interview Mode",
              desc: "Behavioral and communication based evaluation."
            },
            {
              img: techImg,
              icon: <BsBarChart size={18} />,
              title: "Technical Mode",
              desc: "Deep technical questioning based on selected role."
            },
            {
              img: confidenceImg,
              icon: <BsMic size={18} />,
              title: "Confidence Detection",
              desc: "Basic tone and voice analysis insights."
            },
            {
              img: creditImg,
              icon: <BsClock size={18} />,
              title: "Credits System",
              desc: "Unlock premium interview sessions easily."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="flex bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* Left Image */}
              <img
                src={item.img}
                alt={item.title}
                className="w-40 h-40 object-cover"
              />

              {/* Right Content */}
              <div className="p-4 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  {item.icon}
                  <h3 className="font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>

                <p className="text-gray-600 text-sm">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
    </div>
  );
};

export default Home;