import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Timer = ({timeLeft,totalTime}) => {
  const percentage =(timeLeft/totalTime)*100
  return (
    <div>
      <CircularProgressbar value={percentage} text={`${timeLeft}`} />
    </div>
  );
}

export default Timer;
