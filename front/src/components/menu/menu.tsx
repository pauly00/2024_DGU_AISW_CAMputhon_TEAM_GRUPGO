import React, { useState, useEffect } from 'react';
import './menu.css';
import Background from '../asset/menu-background.png';
import Cart from './cartt';
import { getAllFood } from '../../api/foodApi';

import Sam from '../asset/삼겹살김치철판.png';
import Cheeze from '../asset/치즈불닭철판.png';
import Deri from '../asset/데리야끼치킨솥밥.png';
import Usam from '../asset/우삼겹솥밥.png';
import Momil from '../asset/냉모밀.png';
import Momildon from '../asset/냉모밀돈가스.png';
import Momilal from '../asset/냉모밀알밥.png';
import Suyuk from '../asset/수육국밥.png';

// 기존 데이터
const ramenData = [
  { imgSrc: Sam, title: '삼겹살김치철판', description: '매콤한 김치와 함께 철판에서 지글지글 구워낸 삼겹살의 풍미를 느낄 수 있는 요리.', price: '5500원' },
  { imgSrc: Cheeze, title: '치즈불닭철판', description: '매콤한 불닭 위에 녹아내린 치즈가 어우러진 철판 요리.', price: '5800원' },
  { imgSrc: Deri, title: '데리야끼치킨솥밥', description: '달콤하고 짭짤한 데리야끼 소스에 구운 닭고기를 올린 솥밥.', price: '5000원' },
  { imgSrc: Usam, title: '우삼겹솥밥', description: '부드럽고 육즙이 가득한 우삼겹을 얹은 고소한 솥밥.', price: '6000원' },
  { imgSrc: Momil, title: '냉모밀', description: '시원한 국물에 담긴 쫄깃한 모밀면으로 더위를 식혀줄 별미.', price: '5000원' },
  { imgSrc: Momildon, title: '냉모밀*돈가스set', description: '바삭한 돈가스와 시원한 모밀면이 함께하는 푸짐한 한 끼.', price: '6500원' },
  { imgSrc: Momilal, title: '냉모밀*알밥set', description: '알밥과 시원한 모밀면이 어우러진 세트 메뉴.', price: '6500원' },
  { imgSrc: Suyuk, title: '수육국밥', description: '부드러운 수육과 깊은 맛의 국물, 그리고 밥이 한데 어우러진 따뜻한 국밥.', price: '6000원' },
];

const Menu: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [additionalRamenData, setAdditionalRamenData] = useState<any[]>([]);

  useEffect(() => {
    const getAllMenu = async () => {
      try {
        const foods = await getAllFood();

        // 서버 메뉴를 카드 형식으로 변환
        const transformedData = foods.map((item) => ({
          imgSrc: '', // 서버 메뉴는 기본 이미지 사용
          title: item.name,
          description: item.foodInfo,
          price: item.waiting != null ? `대기 ${item.waiting}팀` : '',
        }));

        setAdditionalRamenData(transformedData);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };

    getAllMenu();
  }, []);

  const addToCart = (item: any) => {
    setCartItems([...cartItems, item]);
  };

  return (
      <div className="menu-page" style={{ backgroundImage: `url(${Background})`, position: 'absolute' }}>
        <div className="menu-container">
          <h1>솥앤누들</h1>
          <div className="ramen-grid">
            {[...ramenData, ...additionalRamenData].map((ramen, index) => (
                <div className="ramen-card" key={index} onClick={() => addToCart(ramen)}>
                  <img src={ramen.imgSrc || Background} alt={ramen.title} />
                  <h2>{ramen.title}</h2>
                  <p>{ramen.description}</p>
                  <div className="price">{ramen.price}</div>
                </div>
            ))}
          </div>
        </div>
        <div className="cart-container">
          <Cart cartItems={cartItems} />
        </div>
      </div>
  );
};

export default Menu;
