import React from 'react';
import { Button } from 'antd';
import { Text } from '../atoms/Text/Text';
import { Link } from 'react-router-dom';

interface CTASectionProps {
  text: string;
  buttonText: string;
}

const ctaSectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    backgroundColor: '#1E2A38',
    color: 'white',
    textAlign: 'center',
  };
  
  const textStyle: React.CSSProperties = {
    fontSize: '24px',
    marginBottom: '20px',
    color: 'white'
  };
  
  const buttonStyle: React.CSSProperties = {
    fontSize: '18px',
    padding: '10px 20px',
    backgroundColor: 'transparent',
    border: "1px solid white",
    textTransform: "uppercase"
  };

const CTASection: React.FC<CTASectionProps> = ({ text, buttonText }) => {
  return (
    <section className="cta-section" style={ctaSectionStyle}>
      <Text level={2} style={textStyle}>{text}</Text>
      <Link to="/signup"><Button type="primary" size="large" style={buttonStyle}>
        {buttonText}
      </Button></Link>
    </section>
  );
};

export default CTASection;
