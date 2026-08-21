// 사용자 타입 정의

export interface User {
  id: number;
  name: string;
  username: string;
  phoneNum?: string;
  major: string;
  role: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  username: string;
  password: string;
  phoneNum?: string;
  major: string;
  role?: string;
}
