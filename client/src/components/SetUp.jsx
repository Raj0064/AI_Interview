import axios from 'axios';
import React, { useState } from 'react';
import { FaBriefcase, FaChartLine, FaFileUpload, FaMicrophoneAlt, FaUserTie } from 'react-icons/fa';
import { ServerURL } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const SetUp = ({onStart}) => {
  const {userData}=useSelector((state)=>state.user)
  const dispatch= useDispatch();
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [mode, setMode] = useState("Technical");
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeText,setResumeText] = useState("");
  const [analysisDone, setAnalysisDone] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleUploadResume=async()=>{
    if(!resumeFile || analyzing) return;
    setAnalyzing(true)

    const formData=new FormData();
    formData.append("resume",resumeFile);

    try {
      const result = await axios.post(ServerURL + "/api/interview/resume", formData, {withCredentials:true})

      console.log(result.data);

      setRole(result?.data?.role || "");
      setExperience(result?.data?.experience || "");
      setProjects(result?.data?.projects || []);
      setSkills(result?.data?.skills || []);
      setResumeText(result?.data?.resumeText || "");
      setAnalysisDone(true);

      setAnalyzing(false)

    } catch (error) {
      console.log(error);
      setAnalyzing(false)
    }
  }


  const handleStart=async()=>{
    setLoading(true);
    try {
      const result = await axios.post(ServerURL +"/api/interview/generate-questions",{role,experience,mode,projects,skills,resumeText},{withCredentials:true})
      console.log(result.data);
      if(userData){
        dispatch(setUserData({...userData, credits:result.data.creditsLeft}))
      }
      setLoading(false);
      onStart(result.data)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }


  return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="max-w-5xl w-full grid md:grid-cols-2 rounded-2xl shadow-xl overflow-hidden min-h-[500px]">

        {/* LEFT SIDE (SOFT BLUE) */}
        <div className="bg-gradient-to-br from-white to-blue-300 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Start your AI Interview
          </h2>

          <p className="text-gray-600 mb-8">
            Practice real interview scenarios powered by AI. Improve communication, technical skills and confidence.
          </p>

          <div className="space-y-5">
            {[
              {
                icon: <FaUserTie className="text-blue-500 text-xl" />,
                text: "Choose Role & Experience",
              },
              {
                icon: <FaMicrophoneAlt className="text-blue-500 text-xl" />,
                text: "Smart Voice Interview",
              },
              {
                icon: <FaChartLine className="text-blue-500 text-xl" />,
                text: "Performance Analytics",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                {item.icon}
                <span className="text-gray-700 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE (WHITE FORM) */}
        <div className="bg-white p-8 max-h-[80vh] overflow-y-auto transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Interview Setup
          </h2>

          {/* Role */}
          <div className="flex items-center gap-3 border border-gray-200 p-3 rounded-lg mb-4 focus-within:ring-1 focus-within:ring-blue-400">
            <FaUserTie className="text-black" />
            <input
              type="text"
              placeholder="Enter Role"
              className="w-full outline-none text-sm"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          {/* Experience */}
          <div className="flex items-center gap-3 border border-gray-200 p-3 rounded-lg mb-4 focus-within:ring-1 focus-within:ring-blue-400">
            <FaBriefcase className="text-black" />
            <input
              type="text"
              placeholder="Experience"
              className="w-full outline-none text-sm"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>

          {/* Mode */}
          <select
            className="w-full border border-gray-200 p-3 rounded-lg mb-4 text-sm focus:ring-1 focus:ring-blue-400"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="Technical">Technical</option>
            <option value="HR">HR Interview</option>
          </select>

          {/* Upload */}
          {!analysisDone && (
            <div
              onClick={() => document.getElementById("resumeUpload").click()}
              className="border border-dashed border-gray-300 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-50 transition mb-4"
            >
              <FaFileUpload className="mx-auto text-lg text-gray-500 mb-2" />

              <input
                type="file"
                id="resumeUpload"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => setResumeFile(e.target.files[0])}
              />

              <p className="text-gray-500 text-sm">
                {resumeFile ? resumeFile.name : "Upload Resume (Optional)"}
              </p>

              {resumeFile && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUploadResume();
                  }}
                  className="mt-3 text-sm px-4 py-2 border border-black rounded-md hover:bg-black hover:text-white transition"
                >
                  {analyzing ? "Analyzing..." : "Analyze Resume"}
                </button>
              )}
            </div>
          )}

          {/* Results */}
          {analysisDone && (
            <div className="mb-4 bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
              <h3 className="text-base font-bold text-gray-800 mb-3">
                Resume Analysis
              </h3>

              {projects.length > 0 && (
                <div className="mb-2">
                  <p className="text-blue-500 text-sm font-medium">Projects</p>
                  <ul className="list-disc ml-5 text-gray-600 text-sm">
                    {projects.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}

              {skills.length > 0 && (
                <div>
                  <p className="text-blue-600 text-sm font-semibold mb-2">Skills</p>

                  <div className="flex flex-wrap gap-2">
                    {skills.map((s, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Button */}
          <button
            onClick={handleStart}
            disabled={!role || !experience || loading}
            className={`w-full py-3 rounded-lg text-sm transition text-white hover:opacity-90
    ${!role || !experience || loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black"}
  `}
          >
            {loading?"Loading...." :"Start Interview"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SetUp;
