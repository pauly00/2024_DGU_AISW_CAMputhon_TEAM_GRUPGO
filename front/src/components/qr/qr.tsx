import React, {useEffect} from 'react';
import './qr.css';
import axios from 'axios';
import QR from './qr.png';

const QRPage: React.FC = () => {
    useEffect(() => {
        const fetchQrData = async () => {
            try{
                await axios.get('http://localhost:8080/qr'); // QR 데이터 요청
            } catch (e) {
                console.error(e);
            }
        };

        fetchQrData();
    }, []); // 마운트 시 1회 실행


  return (
    <div className="qr-page">
        {/* 사진 형태로 */}
        <img src={QR} alt="QR Code" />
    </div>
  );
};

export default QRPage;
