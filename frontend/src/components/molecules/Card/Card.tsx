import React from 'react';
import { Card as AntCard } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import ScreenSize from '../../../helpers/ScreenSize';

interface CardProps {
  title: string;
  description: string;
  icon?: IconDefinition;
  style?: React.CSSProperties | undefined;
  titleStyle?: React.CSSProperties;
  descriptionStyle?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ title, description, icon, style, titleStyle, descriptionStyle }) => {
  const screenW: number = ScreenSize().width;
  return (
    <AntCard
      bordered={false}
      style={{
        ...style,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        minHeight: "100%",
        padding: screenW > 1300 ? "20px 10px" : "10px 0"
      }}
    >
      {icon && <FontAwesomeIcon icon={icon} style={{ fontSize: '40px', color: 'white', margin: '0 auto 20px', display: "block" }} />}
      <span style={{ ...titleStyle, textAlign: 'center' }}>{title}</span>
      <p style={{ ...descriptionStyle, textAlign: 'left' }}>{description}</p>
    </AntCard>
  );
};

export default Card;
