import React from 'react';
import { Row, Col } from 'antd';
import Card from '../molecules/Card/Card';
import { Text, Description } from '../atoms/Text/Text';
import ScreenSize from '../../helpers/ScreenSize';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface Feature {
  title: string;
  description: string;
  icon?: IconDefinition; 
  style?: React.CSSProperties | undefined;
}

interface FeatureSectionProps {
  features: Feature[];
  title: string;
  description: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ features, title, description }) => {
  const screenW: number = ScreenSize().width;

  return (
    <section className="feature-section">
      <Text level={2}>{title}</Text>
      <Description
        style={{
          fontSize: screenW > 1800 ? '25px' : screenW > 1024 ? '20px' : screenW > 768 ? '30px' : '25px',
          margin: screenW > 1800 ? '5vh 0 15vh' : screenW > 1024 ? '20px' : screenW > 768 ? '30px 0' : '25px 0'
        }}
      >
        {description}
      </Description>
      <Row gutter={[32, 32]}>
    {features.map((feature, index) => (
      <Col key={index} xs={24} sm={12} md={12} lg={6} xl={6}>
        <Card
          {...feature}
          icon={feature.icon}
          titleStyle={{ color: 'white', textTransform: 'uppercase', fontSize: '15px', fontWeight: 'bold' }}
          descriptionStyle={{ padding: '20px 0 0', fontSize: '15px', textAlign: 'left' }}
        />
      </Col>
    ))}
</Row>
    </section>
  );
};

export default FeatureSection;
