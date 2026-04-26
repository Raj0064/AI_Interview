import React, { useState } from 'react';
import SetUp from '../components/SetUp';
import Interview from '../components/Interview';
import Report from '../components/Report';

const InterviewPage = () => {
  const [step,setStep]=useState(1);
  const [interviewData,setInterviewData]=useState(null);
  return (
    <div>
      {step===1 && (
          <SetUp onStart={(data)=>{
            setInterviewData(data);
            setStep(2);
          }}/>
        )}
      {step===2 && (
          <Interview interviewData={interviewData} onFinish={(report)=>{
            setInterviewData(report);
            setStep(3)
          }}/>
        )}
      {step===3 && (
          <Report report={interviewData}/>
        )}

    </div>
  );
}

export default InterviewPage;
