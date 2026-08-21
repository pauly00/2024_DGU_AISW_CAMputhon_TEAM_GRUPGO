// 음식 메뉴 타입 정의

export interface Food {
  id: number;
  name: string;
  restaurant: string;
  waiting?: number;
  foodInfo?: string;
}
