// src/components/organisms/Footer.tsx
import React from 'react';
import { Layout } from 'antd';
import ScreenSize from '../../helpers/ScreenSize';
import { 
  FacebookFilled,
  XOutlined,
  LinkedinFilled
} from '@ant-design/icons'

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  const screenW: number = ScreenSize().width;
  return (
    <AntFooter className="footer" style={{ textAlign: 'center', padding: screenW > 768 ? '20px 50px' :  "30px 5%", backgroundColor: '#001529', color: 'white', position: "fixed", bottom: 0, left: 0, right: 0  }}>
      <p style={{fontSize: screenW < 768 ? "10px" : ""}}>
        ©2025 BOBI AI | All rights reserved
      </p>
      <div>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', marginRight: '10px' }}><FacebookFilled style={{fontSize: screenW > 1024 ? "25px" : "20px"}}/></a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', marginRight: '10px' }}><XOutlined style={{fontSize: screenW > 1024 ? "25px" : "20px"}}/></a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}><LinkedinFilled style={{fontSize: screenW > 1024 ? "25px" : "20px"}}/></a>
      </div>
    </AntFooter>
  );
};

export default Footer;
