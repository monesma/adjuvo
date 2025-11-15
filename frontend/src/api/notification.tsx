import axios from "axios";
import type { CreateNewNotification } from "../types/notification-types";
const api_url = import.meta.env.VITE_API_URL;

export const createNewNotification = ({token, data}: {token: string, data: CreateNewNotification})=>{
    const configs = {
        headers: {
          authorization: token,
        },
      };

    return axios
      .post(api_url + "/api/v1/notification/add", data, configs)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      })
}

export const listNotifications = ({token}: {token: string})=>{
    const configs = {
        headers: {
          authorization: token,
        },
      };

    return axios
      .get(api_url + "/api/v1/notification/all", configs)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      })
}

export const getNotificationById = ({token, id}: {token: string, id: string})=>{
  const configs = {
      headers: {
        authorization: token,
      },
    };
    
  return axios
    .get(api_url + "/api/v1/notification/getById/"+id, configs)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err
    }); 
}

export const getNotificationForBuilder = ({token, id}: {token: string, id: string})=>{
  const configs = {
      headers: {
        authorization: token,
      },
    };
    
  return axios
    .get(api_url + "/api/v1/notification/builder/"+id, configs)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err
    }); 
}

export const getNotificationForHederaApp = ({token, id}: {token: string, id: string})=>{
  const configs = {
      headers: {
        authorization: token,
      },
    };
    
  return axios
    .get(api_url + "/api/v1/notification/app/"+id, configs)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err
    }); 
}

export const updateNotification = ({token, id, data}: {token: string, id: string, data: CreateNewNotification})=>{
    const configs = {
      headers: {
        authorization: token,
      },
    };

  return axios
    .put(api_url + "/api/v1/notification/updateById/"+id, data, configs)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err
    })
}

export const deleteNotification = ({token, id}: {token: string, id: string})=>{
    const configs = {
      headers: {
        authorization: token,
      },
    };

  return axios
    .delete(api_url + "/api/v1/notification/delete/"+id, configs)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err
    })
}