import { Layout } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import Button from '../atoms/Button/Button';
import ScreenSize from '../../helpers/ScreenSize';
import logo from '../../assets/images/arzelogo.png';
const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const location = useLocation();
  const screenW: number = ScreenSize().width;
  return (
    <AntHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2% 5%', backgroundColor: location.pathname === "/" ? "transparent" : "#171717", position: "absolute", top: 0, left: 0, right: 0 }}>
      <Link to="/"><div>
      <img src={logo} alt="logo" height={screenW > 1024 ? 125 : 100} width={screenW > 1024 ? 125 : 100}/>
      </div></Link>

      {location.pathname === '/signup' ? (
        <Link to="/signin" style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', border: "2px solid white", lineHeight: "20px", padding: "5px 10px", borderRadius: "5px", textTransform:"uppercase" }}>Sign in</Link>
      ) : location.pathname === '/signin' ?(
        <Link to="/signup" style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', border: "2px solid white", lineHeight: "20px", padding: " 5px 10px", borderRadius: "5px", textTransform:"uppercase" }}>Sign up</Link>
      ) : <Link to="/signin">
        <Button variantCustom='header'>Sign in</Button>  
      </Link>}
    </AntHeader>
  );
};

export default Header;
