import React, { useEffect, useRef } from 'react';
import maleVideo from "../assets/Videos/male-ai.mp4";
import femaleVideo from "../assets/Videos/female-ai.mp4"
import Timer from './Timer';
import { FaMicrophone } from 'react-icons/fa';

const Interview = ({ onFinish, interviewData }) => {
  const { InterviewId, questions, userName } = interviewData

  // States
  const [isIntroPhase, setIsIntroPhase] = useState(true);
  const [isMicon, setIsMicon] = useState(true);
  const [isAIPlaying, setIsAIPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");
  const videoRef=useRef(null);
  const recognitionRef = useRef(null);

  const currentQuestion = questions[currentIndex];

  useEffect(()=>{
    const loadVoices=()=>{
      const voices= window.SpeechSynthesis.getVoices();
      if(!voices.length) return;

      const femaleVoice= voices.find(v=> 
        v.name.toLowerCase().includes("zira")||
        v.name.toLowerCase().includes("samantha")||
        v.name.toLowerCase().includes("female")
      );

      if(femaleVoice){
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }
      const maleVoice= voices.find(v=> 
        v.name.toLowerCase().includes("david")||
        v.name.toLowerCase().includes("mark")||
        v.name.toLowerCase().includes("male")
      );

      if(maleVoice){
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
        return;
      }

      //Fallback
      setSelectedVoice(voices[0]);
      setVoiceGender("female")
      
    };


    loadVoices();
    window.speechSynthesis.onvoiceschanged=loadVoices;
  },[])


  const videoSource = voiceGender==="male" ? maleVideo : femaleVideo;

  const speakText = (text) => {
    return new Promise((resolve) => {
      // ❌ If speech not supported OR no voice selected
      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }

      // Stop any ongoing speech
      window.speechSynthesis.cancel();

      // Add natural pauses
      const humanText = text
        .replace(/,/g, ", ... ")
        .replace(/\./g, "....");

      const utterance = new SpeechSynthesisUtterance(humanText);

      // Voice settings
      utterance.voice = selectedVoice;
      utterance.pitch = 1.05;   // slightly warm
      utterance.rate = 0.92;    // slightly slower
      utterance.volume = 1;

      // Start speaking
      utterance.onstart = () => {
        setIsAIPlaying(true);
        setSubtitle(text); // show original text

        if (videoRef.current) {
          videoRef.current.play();
        }
      };

      // End speaking
      utterance.onend = () => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }

        setIsAIPlaying(false);

        // Small delay for smooth UX
        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300);
      };

      // Error handling
      utterance.onerror = () => {
        setIsAIPlaying(false);
        resolve();
      };

      // Speak
      window.speechSynthesis.speak(utterance);
    });
  };


  return (
    <div>
      <div>
        {/* Video Section */}
        <div>
          <video src={videoSource} key={videoSource} ref={videoRef} />
        </div>
        {/* Subtitles */}

        {/* Timer */}
        <div>
          <div>
            <span>
              Interview Status
            </span>
            <span>
              AI Speaking
            </span>
          </div>

          <div>
          </div>
          <div>
            <Timer timeLeft="30" totalTime="60" />
          </div>

          <div></div>
          <div>
            <div>
              <span>1</span>
              <span>Current Questions</span>
            </div>
            <div>
              <span>{questions.length}</span>
              <span>Total Questions</span>
            </div>
          </div>


          {/* Text Section */}
          <div>
            <h2>
AI Smart Interview
            </h2>

            <div>
              <p>Question {currentIndex+1} of {questions.length}</p>
              <div>{currentQuestion?.question}</div>
            </div>
            <textarea placeholder='Type your answer here'></textarea>

            <div>
              <button><FaMicrophone/></button>
              <button>Submit answer</button>
            </div>

          </div>


        </div>


      </div>
    </div>
  );
}

export default Interview;
