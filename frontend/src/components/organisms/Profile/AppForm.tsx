import { useEffect, useState } from "react";
import Button from "../../atoms/Button";
import { Input } from "../../atoms/input/Input";
import { avatars } from "../../../constants/avatar";
import { H1 } from "../../atoms/Headers";
import { useAppSelector } from "../../../redux/hook";
import {
  loginHederaApp,
  selectHederaApp,
} from "../../../redux/hederaApp/hederaAppReducer";
import { checkHederaAppToken, updateHederaApp } from "../../../api/hederaApp";
import { useDispatch } from "react-redux";

interface AppData {
  app_name: string;
  app_twitter: string;
  email: string;
  wallet_id: string;
  avatar?: string | null;
}

interface AppFormProps {
  data: AppData;
  onSubmit: (data: AppData) => void;
}

const AppForm: React.FC<AppFormProps> = () => {
  const [appName, setAppName] = useState<string>("");
  const [appTwitter, setAppTwitter] = useState<string>("");
  const [appEmail, setAppEmail] = useState<string>("");
  const [avatar, setAvatar] = useState<string>(avatars[0]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const app = useAppSelector(selectHederaApp);
  const dispatch = useDispatch();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const token = localStorage.getItem(import.meta.env.VITE_LS_TOKEN_KEY);
      if (token !== null) {
        const data = {
          app_name: appName,
          app_twitter: appTwitter,
          email: appEmail,
          avatar: avatar,
        };
        console.log(data);
        const updated = await updateHederaApp({
          token: token,
          id: app.infos._id,
          data,
        });
        if (updated.status === 200) {
          const check = await checkHederaAppToken(token);
          if (check.status === 200) {
            const user = {
              ...check.content.app,
              token: check.content.token,
            };
            await dispatch(loginHederaApp(user));
            setSuccess("Your profile is updated!");
            setTimeout(() => {
              setSuccess(null);
            }, 3000);
          }
        } else {
          setError("Oups, an error occured, try later!");
        }
      }
    } catch {
      setError("Oups, an error occured, try later!");
    }
  };
  useEffect(() => {
    if (app.infos !== null) {
      setAppName(app.infos.app_name);
      setAppTwitter(app.infos.app_twitter);
      setAppEmail(app.infos.email);
      if (app.infos.avatar && app.infos.avatar !== null) {
        setAvatar(app.infos.avatar);
      }
    }
  }, [app]);

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <H1 className="text-left uppercase ml-0">Corporate Profile</H1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <img
          src={`/avatars/${avatar}`}
          alt="Selected avatar"
          style={{
            width: 160,
            height: 160,
            borderRadius: "50%",
            border: "3px solid #4f46e5",
          }}
        />
        <div
          className="avatar-selector"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            width: 6 * 50 + 5 * 8,
            maxHeight: 3 * 50 + 2 * 8,
            overflowY: "auto",
          }}
        >
          {avatars.map((a) => (
            <img
              key={a}
              src={`/avatars/${a}`}
              alt={a}
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                border: avatar === a ? "3px solid #4f46e5" : "1px solid #ccc",
                cursor: "pointer",
                opacity: avatar === a ? 0.5 : 1,
              }}
              onClick={() => setAvatar(a)}
            />
          ))}
        </div>
      </div>
      <div>
        <label>App Name</label>
        <Input placeholder="My DApp" changeValue={setAppName} value={appName} />
      </div>

      <div>
        <label>App Twitter</label>
        <Input
          placeholder="@mydapp"
          changeValue={setAppTwitter}
          value={appTwitter}
        />
      </div>

      <div>
        <label>App Email</label>
        <Input
          placeholder="email@example.com"
          changeValue={setAppEmail}
          value={appEmail}
        />
      </div>

      <div className="flex items-center mt-4">
        <Button className="mx-0 mr-4 py-2 px-4 uppercase" type="submit">
          Save
        </Button>
        <div className="flex flex-col justify-center">
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </div>
      </div>
    </form>
  );
};

export default AppForm;
