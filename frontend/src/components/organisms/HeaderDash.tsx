import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import Button from "../atoms/Button";
import { logoutBuilder } from "../../redux/builder/builderReducer";
import { logoutHederaApp } from "../../redux/hederaApp/hederaAppReducer";
import { useWalletInterface } from "../../services/wallets/useWalletInterface";
import { WalletSelectionDialog } from "../molecules/WalletSelectionDialog";
import logo from "../../assets/images/arzelogo.png";
import { Avatar, Tooltip } from "antd";
import {
  BellOutlined,
  CheckOutlined,
  CloseOutlined,
  DashboardOutlined,
  LogoutOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { clearNotifications, selectNotifications } from "../../redux/notifications/notificationsReducer";
import type { NotificationQuery } from "../../types/notification-types";
import { deleteMission } from "../../api/mission";
import { deleteNotification } from "../../api/notification";
import { fetchNotificationsAndDispatch } from "../../helpers/fetchNotificationsAndDispatch";
import { updateCancellation } from "../../api/cancellation";

export default function HeaderBuilder() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { infos: notifications, count } = useAppSelector(selectNotifications);
  const builder = useAppSelector((state) => state.builder);
  const hederaApp = useAppSelector((state) => state.hederaApp);

  const [open, setOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { accountId, walletInterface } = useWalletInterface();
  const notifRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await localStorage.removeItem(import.meta.env.VITE_LS_ROLE_KEY);
    await localStorage.removeItem(import.meta.env.VITE_LS_TOKEN_KEY);
    if (builder.isLogged) dispatch(logoutBuilder());
    if (hederaApp.isLogged) dispatch(logoutHederaApp());
    await dispatch(clearNotifications());
    navigate("/signin");
  };

  const handleConnect = () => {
    if (accountId) {
      walletInterface?.disconnect?.();
    } else {
      setOpen(true);
    }
  };

  const handleDismiss = async (id: string) => {
    try {
      const token = await localStorage.getItem(import.meta.env.VITE_LS_TOKEN_KEY)
      if(token === null) return;
      const delNotif = await deleteNotification({token, id})
      if(delNotif.status === 200){
        const mode = await localStorage.getItem(import.meta.env.VITE_LS_ROLE_KEY)
        if(builder.infos === null || mode === null) return;
        await fetchNotificationsAndDispatch({
          mode,
          token: token,
          smartContractId: builder.infos.smartcontract_id,
          dispatch,
        });
      }
    } catch {
      return;
    }
};

const handleAccept = async (notif: NotificationQuery) => {
  try {
    const token = await localStorage.getItem(import.meta.env.VITE_LS_TOKEN_KEY)
    if(token === null) return;
    if(notif.mission_id === null || notif.mission_id === undefined) return;
    const deleted = await deleteMission({token, id: notif.mission_id})
    if(deleted.status === 200){
      const delNotif = await deleteNotification({token, id: notif._id})
      if(delNotif.status === 200){
        const mode = await localStorage.getItem(import.meta.env.VITE_LS_ROLE_KEY)
        if(builder.infos === null || mode === null) return;
        await fetchNotificationsAndDispatch({
          mode,
          token: token,
          smartContractId: builder.infos.smartcontract_id,
          dispatch,
        });
      }
    }
  } catch {
    return;
  }
};

const handleRefuse = async (notif: NotificationQuery) => {
  try {
    const token = await localStorage.getItem(import.meta.env.VITE_LS_TOKEN_KEY)
    if(token === null) return;
    if(notif.cancellation_id === null || notif.cancellation_id === undefined) return;
    console.log(notif)
    const updated = await updateCancellation({token, id: notif.cancellation_id, data: {status: "Conflict"}})
    if(updated.status === 200){
      const delNotif = await deleteNotification({token, id: notif._id})
      if(delNotif.status === 200){
        const mode = await localStorage.getItem(import.meta.env.VITE_LS_ROLE_KEY)
        if(builder.infos === null || mode === null) return;
        await fetchNotificationsAndDispatch({
          mode,
          token: token,
          smartContractId: builder.infos.smartcontract_id,
          dispatch,
        });
      }
    }
  } catch {
    return;
  }
};

function formatDate(timestamp: number) {
  const date = new Date(timestamp);
  return date.toLocaleString("en-EN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

  useEffect(() => {
    const token = localStorage.getItem(import.meta.env.VITE_LS_TOKEN_KEY);
    const mode = localStorage.getItem(import.meta.env.VITE_LS_ROLE_KEY);

    const smartContractId =
      mode === "builder"
        ? builder.infos?.smartcontract_id
        : hederaApp.infos?.smartcontract_id;

    if (!token || !smartContractId || !mode) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [builder.infos, hederaApp.infos, dispatch]);

  return (
    <header className="flex items-center justify-between px-6 py-2 bg-[#171717] border-b border-[#333]">
      <Link to="/">
        <img src={logo} alt="Logo" className="w-32 object-contain" />
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/dashboard">
          <Tooltip title="My profil">
            <Button className="rounded-[4px] p-[2px] ml-0" onClick={() => {}}>
              <Avatar
                style={{ background: "transparent" }}
                icon={<DashboardOutlined style={{ fontSize: 20 }} />}
              />
            </Button>
          </Tooltip>
        </Link>
        <Tooltip title="Notifications">
  <div className="relative" ref={notifRef}>
    <div className="relative">
      <Button
        className="rounded-[4px] p-[2px] ml-0"
        onClick={() => setIsNotificationOpen((prev) => !prev)}
      >
        <Avatar
          style={{ background: "transparent" }}
          icon={<BellOutlined style={{ fontSize: 20 }} />}
        />
      </Button>

      {count > 0 && (
        <span
          className="absolute -top-0 -right-0 z-10 flex items-center justify-center font-bold text-white bg-red-600 rounded-full"
          style={{
            minWidth: 20,
            height: 20,
            fontSize: 10,
            padding: '0 4px',
            lineHeight: '16px',
          }}
        >
          {count > 9 ? '9+' : count}
        </span>
      )}
    </div>

    {isNotificationOpen && (
  <div className="absolute top-full right-0 mt-2 w-64 bg-white text-black rounded shadow-lg z-50 p-3 max-h-96 overflow-y-auto">
    <p className="font-semibold border-b pb-2 mb-2">Notifications</p>
    <ul className="text-sm space-y-3">
      {notifications.length === 0 && (
        <li className="text-gray-500 italic">No notification</li>
      )}
      {notifications.map((notif: NotificationQuery) => (
        <li key={notif._id} className="border-b pb-2">
          {notif.mission_id ? (
            <>
              <p className="font-semibold">{notif.title}</p>
              <p className="text-xs text-gray-700 mb-1">{notif.description}</p>
              <p className="text-xs text-gray-400 mb-2 italic">
                {formatDate(notif.creation_date)}
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleAccept(notif)}
                  className="bg-green-500 text-white text-xs px-2 py-1 rounded hover:bg-green-600 cursor-pointer"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRefuse(notif)}
                  className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 cursor-pointer"
                >
                  Refuse
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => handleDismiss(notif._id)}
              className="text-left w-full hover:bg-gray-100 rounded px-1 py-1 cursor-pointer"
            >
              <p className="font-medium">{notif.title}</p>
              <p className="text-xs text-gray-700 mb-1">{notif.description}</p>
              <p className="text-xs text-gray-400 italic">{formatDate(notif.creation_date)}</p>
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
)}


  </div>
</Tooltip>


        <Link to="/profile">
          <Tooltip title="My profil">
            <Button className="rounded-[4px] p-[2px] ml-0" onClick={() => {}}>
              <Avatar
                style={{ background: "transparent" }}
                icon={<UserOutlined style={{ fontSize: 20 }} />}
              />
            </Button>
          </Tooltip>
        </Link>
        <Tooltip
          title={
            accountId /*|| metamaskId*/ ? `Disconnect wallet` : "Connect Wallet"
          }
        >
          <div className="relative">
            <Button
              className="rounded-[4px] p-[2px] ml-0"
              onClick={handleConnect}
            >
              <Avatar
                style={{ background: "transparent" }}
                icon={<WalletOutlined style={{ fontSize: 20 }} />}
              />
            </Button>

            <div
              className="absolute top-0 right-0 flex items-center justify-center"
              style={{
                backgroundColor: accountId /*|| metamaskId*/ ? "green" : "red",
                color: "white",
                width: 20,
                height: 20,
                borderRadius: "50%",
              }}
            >
              {accountId /*|| metamaskId*/ ? (
                <CheckOutlined style={{ fontSize: 10 }} />
              ) : (
                <CloseOutlined style={{ fontSize: 10 }} />
              )}
            </div>
          </div>
        </Tooltip>

        <Tooltip title="logout">
          <div className="relative">
            <Button
              className="rounded-[4px] p-[2px] ml-0"
              onClick={handleLogout}
            >
              <Avatar
                style={{ background: "transparent" }}
                icon={<LogoutOutlined style={{ fontSize: 20 }} />}
              />
            </Button>
          </div>
        </Tooltip>
      </div>

      {open && <WalletSelectionDialog setOpen={() => setOpen(false)} />}
    </header>
  );
}
