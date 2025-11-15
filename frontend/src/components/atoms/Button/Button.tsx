import React from 'react';
import { Button as AntButton } from 'antd';
import type {ButtonProps} from 'antd';
import ScreenSize from '../../../helpers/ScreenSize';
import './Button.css';

interface CustomButtonProps extends ButtonProps {
  variantCustom?: 'primary' | 'secondary' | 'header';
  width?: number;
  height?: number;
}

const Button: React.FC<CustomButtonProps> = ({ 
  variantCustom = 'primary', 
  children, 
  width, 
  height, 
  className = '',
  ...props 
}) => {
  const screenW: number = ScreenSize().width;
  let styleOverrides: React.CSSProperties = {};
  
  if (variantCustom === 'header') {
    styleOverrides = {
      backgroundColor: 'transparent',
      color: screenW > 1024 ? 'white' : '#1E2A38',
      border: screenW > 768 ? '1px solid white' : '2px solid #1E2A38',
      fontWeight: 'bold',
      fontSize: screenW > 768 ? '15px' : '20px',
      padding: screenW > 768 ? '10px 15px' : '20px 15px',
      marginTop: screenW > 768 ? 0 : '16px'
    };
  } else if (variantCustom === 'primary') {
    styleOverrides = {
      fontWeight: 'bold',
      fontSize: '14px',
      padding: '4px 15px',
    };
  } else if (variantCustom === 'secondary') {
    styleOverrides = {
      backgroundColor: '#a6d8f0',
      fontWeight: 'bold',
      fontSize: screenW > 768 ? '15px' : '20px',
      padding: screenW > 768 ? '20px 15px' : '20px 15px',
    };
  }

  if (width) styleOverrides.width = width;
  if (height) styleOverrides.height = height;

  return (
    <AntButton
      type={variantCustom === 'primary' ? 'primary' : 'default'}
      className={`custom-button ${variantCustom} ${className}`}
      style={styleOverrides}
      {...props}
    >
      {children}
    </AntButton>
  );
};

export default Button;
