import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export const Text = ({ children, level = 1, style = {} }: {children: any, level: 1 | 5 | 2 | 3 | 4 | undefined, style?: React.CSSProperties}) => <Title level={level} style={{textTransform: "uppercase", color: "#1E2A38", ...style}}>{children}</Title>;

export const Description = ({ children, style = {} }: { children: any, style?: React.CSSProperties}) => <Paragraph style={style}>{children}</Paragraph>;
