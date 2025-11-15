// Signin.tsx
import { signinBuilder } from '../../../api/builder';
import { signinHederaApp } from '../../../api/hederaApp';
import SignTemplate from '../../templates/SignTemplate';
import SignForm from '../../molecules/form/SignForm';
import { useNavigate } from 'react-router-dom';
import { LS_ADJUVO_TOKEN } from '../../../helpers/constants';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginHederaApp } from '../../../redux/hederaApp/hederaAppReducer';
import { loginBuilder } from '../../../redux/builder/builderReducer';
import { fetchNotificationsAndDispatch } from '../../../helpers/fetchNotificationsAndDispatch';

export default function Signin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<string>('builder')
  const dispatch = useDispatch()

  const onSubmitForm = async (response: { wallet_id: string; }) => {
    try {
      if (mode === 'builder' && 'wallet_id' in response) {
        const connect = await signinBuilder({ wallet_id: response.wallet_id });
        if (connect.status === 200) {
          localStorage.setItem(import.meta.env.VITE_LS_ROLE_KEY, mode)
          await localStorage.setItem(LS_ADJUVO_TOKEN, connect.content.token);
          const user = {
            ...connect.content.builder,
            token: connect.content.token
          }
          await dispatch(loginBuilder(user))
          await fetchNotificationsAndDispatch({
                mode,
                token: connect.content.token,
                smartContractId: connect.content.builder.smartcontract_id,
                dispatch,
              });
          navigate('/dashboard');
        }
      }

      if (mode === 'app' && 'wallet_id' in response) {
        const connect = await signinHederaApp({ wallet_id: response.wallet_id });
        console.log(connect)
        if (connect.status === 200) {
          localStorage.setItem(import.meta.env.VITE_LS_ROLE_KEY, mode)
          await localStorage.setItem(LS_ADJUVO_TOKEN, connect.content.token);
          const user = {
            ...connect.content.app,
            token: connect.content.token
          }
          await dispatch(loginHederaApp(user))
          await fetchNotificationsAndDispatch({
                mode,
                token: connect.content.token,
                smartContractId: connect.content.app.smartcontract_id,
                dispatch,
              });
          navigate('/dashboard');
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SignTemplate>
      <SignForm type="signin" mode={mode} onModeChange={setMode} submit={onSubmitForm} />
    </SignTemplate>
  );
}
