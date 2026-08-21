import React from 'react';
import ProfileImg from '../asset/BasicProfile.png';
import setting from "../asset/setting.png";
import './loginProfile.css';
import { useAuth } from '../../auth/authcontext';
import { useNavigate } from 'react-router-dom';

function AfterLogin() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSettingClick = () => {
    // 설정 화면 준비중
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/logout');
  };

  return (
    <div className="usersetting">
      <div className="afterlogin">
        <img src={ProfileImg} alt="profile" className="beforeprofile" />
      </div>
      <h2 className='gradientbackground' style={{ textAlign: "center" }}>User</h2>
      <div>
        <button className="logincontrol" onClick={handleLogoutClick}>
          <div className="loginimage">🔑</div>
          <div className="useraccount">Logout</div>
        </button>
        <br /> <br />
        <button className="logincontrol" onClick={handleSettingClick}>
          <img src={setting} className="loginimage" alt="setting" />
          <div className="useraccount">Setting</div>
        </button>
        <br /> <br />
      </div>
    </div>
  );
}

export default AfterLogin;
