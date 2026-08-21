import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import { signup as signupRequest } from '../../api/authApi';

const Signup: React.FC = () => {

  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "", // 이름 (30, 필수)
    username: "", // 아이디 (10, 필수)
    password: "", // 비밀번호 (15, 필수)
    phoneNum: "", // 전화번호 (10)
    major: "", // 소속학과 (30)
  });

  const { name, username, password, phoneNum, major } = user;

  const onInputChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  // 문자열 글자 수 기준
  const getStringLength = (str: string): number => {
    let length = 0;
    for (let char of str) {
      // 한글 여부 확인 (정규 표현식 사용)
      if (/[\u3131-\uD79D]/.test(char)) {
        length += 2; // 한글은 2로 계산
      } else {
        length += 1; // 영어는 1로 계산
      }
    }
    return length;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 길이 체크
    if(getStringLength(name) > 30){
      alert("이름의 길이가 최대 30자를 초과했습니다.");
      return;
    }
    if(getStringLength(username) > 10){
      alert("아이디의 길이가 최대 10자를 초과했습니다.");
      return;
    }
    if(getStringLength(password) > 15){
      alert("비밀번호의 길이가 최대 15자를 초과했습니다.");
      return;
    }
    if(getStringLength(phoneNum) > 10){
      alert("전화번호의 길이가 최대 10자를 초과했습니다.");
      return;
    }
    if(getStringLength(major) > 30){
      alert("소속 학과의 길이가 최대 30자를 초과했습니다.");
      return;
    }

  // API 호출
  try {
    await signupRequest({ ...user, role: 'U' });
    alert("회원가입이 완료되었습니다."); // 성공 메시지
    navigate('/login'); // 로그인 화면 이동
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "회원가입에 실패했습니다. 다시 시도해 주세요.";
    console.error("회원가입 중 오류 발생:", error);
    alert(message);
  }
};

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>

        {/* 이름 */}
        <div className="form-group">
          <label htmlFor="name">name</label>
          <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="이름을 입력하세요."
              onChange={onInputChange}
              required
          />
        </div>

        {/* 아이디 */}
        <div className="form-group">
          <label htmlFor="userID">id</label>
          <input
              type="text"
              id="username"
              name="username"
              value={username}
              placeholder="아이디를 입력하세요."
              onChange={onInputChange}
              required
          />
        </div>

        {/* 비밀번호 */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="비밀번호를 입력하세요."
              onChange={onInputChange}
              required
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              placeholder="비밀번호를 다시 입력해주세요."
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
          />
        </div>

        {/* 전화번호 */}
        <div className="form-group">
          <label htmlFor="phoneNum">Phone Number</label>
          <input
              type="text"
              id="phoneNum"
              name="phoneNum"
              value={phoneNum}
              placeholder="전화번호를 입력해주세요.(8자)"
              onChange={(e) => onInputChange(e)}
          />
        </div>

        {/* 전공 */}
        <div className="form-group">
          <label htmlFor="major">major</label>
          <input
              type="text"
              id="major"
              name="major"
              value={major}
              placeholder="전공을 입력해주세요."
              onChange={(e) => onInputChange(e)}
          />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
