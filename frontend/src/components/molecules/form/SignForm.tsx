import { Description, Text } from "../../atoms/Text/Text";
import { useEffect, useState } from "react";
import { Input } from "../../atoms/input/Input";
import "./SignForm.css";
import { Link, useLocation } from "react-router-dom";
import Button from "../../atoms/Button";
import { WalletSelectionDialog } from "../WalletSelectionDialog";
import { useWalletInterface } from "../../../services/wallets/useWalletInterface";
import Triangle from "../../../assets/images/triangle.png";
interface FormProps {
  type: string;
  mode: string;
  submit: (input: any) => void;
  submitError?: string | null;
  onModeChange?: (mode: string) => void;
}

const SignForm: React.FC<FormProps> = ({
  type,
  mode,
  submit,
  submitError,
  onModeChange,
}) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [nickname, setNickname] = useState("");
  const [appName, setAppName] = useState("");
  const [appTwitter, setAppTwitter] = useState("");
  const [appEmail, setAppEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const { accountId, walletInterface } = useWalletInterface();

  const isBuilder = mode === "builder";
  const location = useLocation();

  useEffect(() => {
    if (onModeChange) {
      onModeChange(mode);
    }
  }, [mode, onModeChange]);

  const handleWalletConnect = () => {
    if (accountId) {
      walletInterface?.disconnect?.();
    } else {
      setOpen(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!accountId) {
      setError("Please connect your wallet first.");
      return;
    }

    const payload = isBuilder
      ? {
          firstname,
          lastname,
          nickname,
          wallet_id: accountId,
        }
      : {
          app_name: appName,
          app_twitter: appTwitter,
          wallet_id: accountId,
          email: appEmail,
        };

    submit(payload);
  };
  return (
    <form
      className={`sign ${location.pathname === "/signup" ? "signup" : ""}`}
      onSubmit={handleSubmit}
    >
      <Text level={3} style={{ color: "white" }}>
        {type === "signup" ? "Sign up" : "Sign in"} as {mode}
      </Text>

      {error && <Description style={{ color: "red" }}>{error}</Description>}
      {submitError && (
        <Description style={{ color: "red" }}>{submitError}</Description>
      )}

      <div className="mode-wallet-image-container">
        <div className="wallet-and-mode">
          <div className="mode-selector">
            <label style={{ color: "white" }}>I am a:</label>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                type="button"
                onClick={() => onModeChange("builder")}
                className={`pt-1 pb-1 px-3 mx-0 w-[100px] ${
                  mode === "builder" ? "selected" : ""
                }`}
              >
                Builder
              </Button>
              <Button
                type="button"
                onClick={() => onModeChange("app")}
                className={`pt-1 pb-1 px-3 mx-0 lg:ml-4 w-[100px] ${
                  mode === "app" ? "selected" : ""
                }`}
              >
                App
              </Button>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleWalletConnect}
            className="uppercase font-bold pt-2 pb-2 ml-0 mt-4 w-full"
          >
            {accountId ? `Connected: ${accountId}` : "Connect Wallet"}
          </Button>
        </div>

        <img
          src={Triangle}
          alt=""
          className="w-30 md:w-50 max-w-full h-auto object-contain"
        />
      </div>

      {open && <WalletSelectionDialog setOpen={() => setOpen(false)} />}

      <div className="form-section">
        {type === "signup" &&
          (isBuilder ? (
            <>
              <label>Firstname</label>
              <Input
                placeholder="John"
                style={{ backgroundColor: "white", borderRadius: 8 }}
                value={firstname}
                changeValue={setFirstname}
              />

              <label>Lastname</label>
              <Input
                placeholder="Doe"
                style={{ backgroundColor: "white", borderRadius: 8 }}
                value={lastname}
                changeValue={setLastname}
              />

              <label>Nickname</label>
              <Input
                placeholder="nickname123"
                style={{ backgroundColor: "white", borderRadius: 8 }}
                value={nickname}
                changeValue={setNickname}
              />
            </>
          ) : (
            <>
              <label>App Name</label>
              <Input
                placeholder="My DApp"
                style={{ backgroundColor: "white", borderRadius: 8 }}
                value={appName}
                changeValue={setAppName}
              />

              <label>App Twitter</label>
              <Input
                placeholder="@mydapp"
                style={{ backgroundColor: "white", borderRadius: 8 }}
                value={appTwitter}
                changeValue={setAppTwitter}
              />

              <label>App Email</label>
              <Input
                placeholder="email@example.com"
                style={{ backgroundColor: "white", borderRadius: 8 }}
                value={appEmail}
                changeValue={setAppEmail}
              />
            </>
          ))}
      </div>

      <Button type="submit" className="uppercase font-bold pt-2 pb-2 mt-4 mx-0">
        {type === "signup" ? "Register" : "Log in"}
      </Button>

      <p>
        {type === "signup" ? (
          <>
            Already have an account?{" "}
            <Link className="underline" to="/signin">
              Sign in
            </Link>
          </>
        ) : (
          <>
            Don’t have an account?{" "}
            <Link className="underline" to="/signup">
              Sign up
            </Link>
          </>
        )}
      </p>
    </form>
  );
};

export default SignForm;
