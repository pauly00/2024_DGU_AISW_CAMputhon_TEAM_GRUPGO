import client from './client';
import { Food } from '../types/food';

// 전체 메뉴 조회
export const getAllFood = async (): Promise<Food[]> => {
  const { data } = await client.get<Food[]>('/Food/getAll');
  return data;
};
