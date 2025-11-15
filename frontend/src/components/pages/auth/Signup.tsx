// Signup.tsx
import { signupBuilder, signinBuilder } from '../../../api/builder';
import { signupHederaApp, signinHederaApp } from '../../../api/hederaApp';
import SignTemplate from '../../templates/SignTemplate';
import SignForm from '../../molecules/form/SignForm';
import { useNavigate } from 'react-router-dom';
import type { CreateHederaApp } from '../../../types/hederaApp-types';
import type { CreateBuilder } from '../../../types/builder-types';
import { useState } from 'react';
import { loginHederaApp } from '../../../redux/hederaApp/hederaAppReducer';
import { useDispatch } from 'react-redux';
import { loginBuilder } from '../../../redux/builder/builderReducer';

export default function Signup() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<string>('builder')
  const dispatch = useDispatch()
  const onSubmitForm = async (response: CreateBuilder | CreateHederaApp) => {
    console.log(response, mode)
    try {
      if (mode === 'builder' && 'firstname' in response) {
        const register = await signupBuilder({ 
            firstname: response.firstname,
            lastname: response.lastname,
            nickname: response.nickname,
            wallet_id: response.wallet_id
        });
        if (register.status === 200) {
          const connect = await signinBuilder({ wallet_id: response.wallet_id });
          if (connect.status === 200) {
            localStorage.setItem(import.meta.env.VITE_LS_ROLE_KEY, mode)
            localStorage.setItem(import.meta.env.VITE_LS_TOKEN_KEY, connect.content.token);
            const user = {
              ...connect.content.builder,
              token: connect.content.token
            }
            dispatch(loginBuilder(user))
            navigate('/dashboard');
          } else {
            navigate('/signin');
          }
        }
      }

      if (mode === 'app' && 'app_name' in response) {
        const register = await signupHederaApp({
            app_name: response.app_name,
            app_twitter: response.app_twitter,
            email: response.email,
            wallet_id: response.wallet_id
         });
        if (register.status === 200) {
          const connect = await signinHederaApp({ wallet_id: response.wallet_id });
          
          if (connect.status === 200) {
            localStorage.setItem(import.meta.env.VITE_LS_ROLE_KEY, mode)
            localStorage.setItem(import.meta.env.VITE_LS_TOKEN_KEY, connect.content.token);
            const user = {
              ...connect.content.app,
              token: connect.content.validationToken
            }
            dispatch(loginHederaApp(user))
            navigate('/dashboard');
          } else {
            navigate('/signin');
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SignTemplate>
      <SignForm type="signup" mode={mode} onModeChange={setMode}  submit={onSubmitForm} />
    </SignTemplate>
  );
}
