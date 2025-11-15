import { useEffect, useState } from "react";
import Button from "../../atoms/Button";
import { Input } from "../../atoms/input/Input";
import { avatars } from "../../../constants/avatar";
import { H1 } from "../../atoms/Headers";
import { useDispatch } from "react-redux";
import {
  loginBuilder,
  selectBuilder,
} from "../../../redux/builder/builderReducer";
import { updateBuilder, checkBuilderToken } from "../../../api/builder";
import { useAppSelector } from "../../../redux/hook";

interface BuilderData {
  firstname: string;
  lastname: string;
  nickname: string;
  wallet_id: string;
  avatar?: string | null;
}

interface BuilderFormProps {
  data: BuilderData;
  onSubmit: (data: BuilderData) => void;
  onModeChange: (mode: "builder" | "app") => void;
}

const BuilderForm: React.FC<BuilderFormProps> = () => {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [avatar, setAvatar] = useState<string>(avatars[0]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const builder = useAppSelector(selectBuilder);
  const dispatch = useDispatch();

  useEffect(() => {
    if (builder.infos !== null) {
      setFirstname(builder.infos.firstname);
      setLastname(builder.infos.lastname);
      setNickname(builder.infos.nickname);
      if (builder.infos.avatar) {
        setAvatar(builder.infos.avatar);
      }
    }
  }, [builder]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem(import.meta.env.VITE_LS_TOKEN_KEY);
      if (token !== null) {
        const updatedData = {
          firstname,
          lastname,
          nickname,
          avatar,
        };

        const updated = await updateBuilder({
          token,
          id: builder.infos._id,
          data: updatedData,
        });
        if (updated.status === 200) {
          const check = await checkBuilderToken(token);
          if (check.status === 200) {
            const user = {
              ...check.content.builder,
              token: check.content.token,
            };
            await dispatch(loginBuilder(user));
            setSuccess("Your profile is updated!");
            setTimeout(() => setSuccess(null), 3000);
          }
        } else {
          setError("Oups, an error occured, try later!");
        }
      }
    } catch {
      setError("Oups, an error occured, try later!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <H1 className="text-left uppercase ml-0">Ghost Profile</H1>
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
        <label>Firstname</label>
        <Input
          placeholder="John"
          changeValue={setFirstname}
          value={firstname}
        />
      </div>

      <div>
        <label>Lastname</label>
        <Input placeholder="Doe" changeValue={setLastname} value={lastname} />
      </div>

      <div>
        <label>Nickname</label>
        <Input
          placeholder="johnny123"
          changeValue={setNickname}
          value={nickname}
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

export default BuilderForm;
