import React from 'react';
import Toggle from '../toggle-button/toggle';
import LineAnimation from '../animations/lineanimation';
import './home.css';
import Schedule from '../asset/schedule.png';


const Home: React.FC = () => {
    return (
      <div>
        <LineAnimation />
        <div className="main-home-page">
        <div className="title">
          <h1>Welcome to GRUPGO!</h1>
          <p>
          Discover the extraordinary free time management system offered by GRUPGO. With our innovative features and user-friendly interface, managing your schedule has never been easier. 
          </p>
          <div className="toggle-container">
            <Toggle defaultText={'Discord channel'} hoverText={'Join In Discord !'} href='https://discord.gg/hdc6fndc'/>
          </div>
          <div className='imagee'>
            <img src={Schedule} alt="일정 미리보기" />
          </div>
        </div>
      </div>

      </div>
    );
  };
  
  export default Home;
  