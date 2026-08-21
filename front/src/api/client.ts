import axios from 'axios';

// API 기본 주소 (env 우선)
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

// 공용 axios 인스턴스
const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 저장된 사용자명 헤더 부착
client.interceptors.request.use((config) => {
  const username = localStorage.getItem('username');
  if (username) {
    config.headers['X-Username'] = username;
  }
  return config;
});

export default client;
