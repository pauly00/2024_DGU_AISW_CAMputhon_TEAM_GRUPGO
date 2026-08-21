import React from 'react';
import { useNavigate } from 'react-router-dom';
import './func2.css';
import LineGraph from '../dailyschedule/linegraph';
import CustomPieChart from './PieChart';

const events = [
  { starttime: '10:30 AM', endtime: '12:00 PM', label: '데이터베이스' },
  { starttime: '1:00 PM', endtime: '2:00 PM', label: '프로그래밍 언어 개념' },
  { starttime: '2:30 PM', endtime: '5:00 PM', label: '형식 언어' }
];

const behavior = {
  rest: 13.5,
  meal: 1.5,
  study: 2.5,
  exercise: 1.5,
  hobby: 4.0
};

const getMostFrequentActivity = (behavior: Record<string, number>) => {
  const maxValue = Math.max(...Object.values(behavior));
  const mostFrequentActivity = Object.keys(behavior).find(
    key => behavior[key] === maxValue
  );
  return mostFrequentActivity;
};

const Func2Page: React.FC = () => {
  const mostFrequentActivity = getMostFrequentActivity(behavior);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('./dailyschedule');
  };

  return (
    <div className="page" id="func2-page">
      <h1>Today's Schedule</h1>
      <div className="line-graph-container">
        <LineGraph events={events} />
      </div>
      <div className="bottom-div">
        <div className="bottom-div-div">
          During your free time, you have spent the most time on {mostFrequentActivity}
          <button onClick={handleButtonClick} className="navigate-button">Go to Daily Schedule</button>
        </div>
        <div className="pie-chart-container">
          <CustomPieChart />
        </div>
      </div>
      <div className='box'>
        <div className='wave -one'></div>
        <div className='wave -two'></div>
        <div className='wave -three'></div>
      </div>
    </div>
  );
};

export default Func2Page;
