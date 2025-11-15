import { Provider } from 'react-redux';
import { store } from "./redux";
import { AuthProvider } from './providers/AuthProvider';


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider/>
      </Provider>
  );
};

export default App;
