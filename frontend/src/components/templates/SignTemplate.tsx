import Footer from '../organisms/Footer';
import Header from '../organisms/Header';
import './SignTemplate.css';

const SignTemplate = ({ children } : { children: any }) => {
  return (
   <div
  className="sign-template flex flex-col text-white bg-cover bg-center bg-no-repeat min-h-screen"

    style={{ backgroundImage: `url('/connect.png')` }}
  >
      <Header />
        <main  className='content'>{children}</main>
      <Footer />
    </div>
  );
};

export default SignTemplate;