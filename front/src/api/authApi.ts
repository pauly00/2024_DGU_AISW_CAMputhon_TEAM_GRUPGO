import client from './client';
import { ApiResponse } from '../types/api';
import { LoginRequest, SignupRequest, User } from '../types/user';

// 로그인 요청
export const login = async (payload: LoginRequest): Promise<User> => {
  const { data } = await client.post<ApiResponse<User>>('/User/login', payload);
  if (!data.success || !data.data) {
    throw new Error(data.message || '로그인에 실패했습니다.');
  }
  return data.data;
};

// 회원가입 요청
export const signup = async (payload: SignupRequest): Promise<User> => {
  const { data } = await client.post<ApiResponse<User>>('/User/join', payload);
  if (!data.success || !data.data) {
    throw new Error(data.message || '회원가입에 실패했습니다.');
  }
  return data.data;
};
