import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useNavigate, useLocation } from "react-router-dom";

import { changeIsLoading } from "../redux/load/loadReducer";
import Loader from "../components/molecules/Loader/Loader";

import { checkBuilderToken } from "../api/builder";
import { checkHederaAppToken } from "../api/hederaApp";
import { loginBuilder } from "../redux/builder/builderReducer";
import { loginHederaApp } from "../redux/hederaApp/hederaAppReducer";

import BuilderRoutes from "../navigation/builder-routes";
import HederaAppRoutes from "../navigation/hederaApp-routes";
import UnauthenticatedRoutes from "../navigation/unauthenticated-routes";

import { LS_ADJUVO_TOKEN } from "../helpers/constants";
import { fetchNotificationsAndDispatch } from "../helpers/fetchNotificationsAndDispatch";

export function AuthProvider() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const builder = useAppSelector((state) => state.builder);
  const hederaApp = useAppSelector((state) => state.hederaApp);

  const [tokenChecked, setTokenChecked] = useState(false);

  const token = window.localStorage.getItem(LS_ADJUVO_TOKEN);
  const role = window.localStorage.getItem(import.meta.env.VITE_LS_ROLE_KEY);
  const { pathname } = location;

  useEffect(() => {
    const handleAuth = async () => {
      try {
        if (pathname !== "/") {
          dispatch(changeIsLoading({ isLoading: true, message: "Loading" }));
        }

        if (token && role === "builder") {
          const res = await checkBuilderToken(token);
          if (res.status === 200) {
            dispatch(loginBuilder(res.content.builder));
            await fetchNotificationsAndDispatch({
              mode: role,
              token: token,
              smartContractId: res.content.builder.smartcontract_id,
              dispatch,
            });
          }
        } else if (token && role === "hederaApp") {
          const res = await checkHederaAppToken(token);
          if (res.status === 200) {
            dispatch(loginHederaApp(res.content.hederaApp ));
            await fetchNotificationsAndDispatch({
              mode: role,
              token: token,
              smartContractId: res.content.hederaApp.smartcontract_id,
              dispatch,
            });
          }
        }
      } catch (e) {
        console.warn("Auth error:", e);
      } finally {
        setTokenChecked(true);
        dispatch(changeIsLoading({ isLoading: false, message: null }));
      }
    };

    handleAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
  if (!tokenChecked) return;

  if (pathname !== "/") {
    if (role === "builder" && !builder.isLogged) {
      navigate("/signin");
    }

    if (role === "app" && !hederaApp.isLogged) {
      navigate("/signin");
    }
  }

  if (
    tokenChecked &&
    (pathname === "/signin" || pathname === "/signup") &&
    (builder.isLogged || hederaApp.isLogged)
  ) {
    navigate("/");
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [builder, hederaApp, pathname, tokenChecked]);

  if (!tokenChecked) {
    return (
      <div className="min-h-screen bg-[#f7fbfe] flex items-center justify-center">
        <Loader isOpen={true} message={"Checking session..."} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7fbfe]">
      <div>
        {builder.isLogged && role === "builder" && <BuilderRoutes />}
        {hederaApp.isLogged && role === "app" && <HederaAppRoutes />}
        {!builder.isLogged && !hederaApp.isLogged && <UnauthenticatedRoutes />}
      </div>
    </div>
  );
}
