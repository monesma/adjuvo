import { getNotificationForBuilder, getNotificationForHederaApp } from "../api/notification";
import type { AppDispatch } from "../redux";
import { setNotifications } from "../redux/notifications/notificationsReducer";

export const fetchNotificationsAndDispatch = async ({
  mode,
  token,
  smartContractId,
  dispatch,
}: {
  mode: string;
  token: string;
  smartContractId: string;
  dispatch: AppDispatch;
}) => {
  try {
    let res;
    if (mode === "builder") {
      res = await getNotificationForBuilder({ token, id: smartContractId });
    } else {
      res = await getNotificationForHederaApp({ token, id: smartContractId });
    }
    if (res.status === 200 && res.content?.notification) {
      dispatch(setNotifications(res.content.notification));
    }
  } catch (err) {
    console.error("Erreur lors de la récupération des notifications :", err);
  }
};
