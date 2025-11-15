import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux'
import { AllWalletsProvider } from './services/wallets/AllWalletsProvider.tsx'
import '@ant-design/v5-patch-for-react-19';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AllWalletsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AllWalletsProvider>
    </Provider>
  </StrictMode>,
)
