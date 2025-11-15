import { useState } from "react";
import MainTemplate from "../templates/MainTemplate";
import BuilderForm from "../organisms/Profile/BuilderForm";
import AppForm from "../organisms/Profile/AppForm";

const Profile = () => {
  const modeLS = localStorage.getItem(import.meta.env.VITE_LS_ROLE_KEY) ?? "builder";
  const [mode, setMode] = useState<"builder" | "app">(modeLS === "app" ? "app" : "builder");

  const [builderData, setBuilderData] = useState({
    firstname: "John",
    lastname: "Doe",
    nickname: "johnny",
    wallet_id: "0.0.123",
    avatar: "avatar-3.jpg",
  });

  const [appData, setAppData] = useState({
    app_name: "MyDApp",
    app_twitter: "@mydapp",
    email: "email@example.com",
    wallet_id: "0.0.456",
    avatar: "avatar-7.jpg",
  });

  return (
    <MainTemplate>
      {mode === "builder" ? (
        <BuilderForm data={builderData} onSubmit={(newData) => setBuilderData(newData)} onModeChange={setMode} />
      ) : (
        <AppForm data={appData} onSubmit={(newData) => setAppData(newData)} onModeChange={setMode} />
      )}
    </MainTemplate>
  );
};

export default Profile;
