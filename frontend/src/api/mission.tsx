import axios from "axios";
import type { CreateNewMission } from "../types/mission-types";
const api_url = import.meta.env.VITE_API_URL;

export const createNewMission = ({token, data}: {token: string, data: CreateNewMission})=>{
    const configs = {
        headers: {
          authorization: token,
        },
      };

    return axios
      .post(api_url + "/api/v1/mission/createMission", data, configs)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      })
}

export const listMissions = ({token}: {token: string})=>{
    const configs = {
        headers: {
          authorization: token,
        },
      };

    return axios
      .get(api_url + "/api/v1/mission/all", configs)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      })
}

export const getMissionById = ({token, id}: {token: string, id: string})=>{
  const configs = {
      headers: {
        authorization: token,
      },
    };
    
  return axios
    .get(api_url + "/api/v1/mission/getById/"+id, configs)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err
    }); 
}

export const getMissionForBuilder = ({token, id}: {token: string, id: string})=>{
  const configs = {
      headers: {
        authorization: token,
      },
    };
    
  return axios
    .get(api_url + "/api/v1/mission/getScMissionForBuilder/"+id, configs)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err
    }); 
}

export const getMissionForHederaApp = ({token, id}: {token: string, id: string})=>{
  const configs = {
      headers: {
        authorization: token,
      },
    };
    
  return axios
    .get(api_url + "/api/v1/mission/getScMissionForApp/"+id, configs)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err
    }); 
}

export const updateMission = ({token, id, data}: {token: string, id: string, data: CreateNewMission})=>{
    const configs = {
      headers: {
        authorization: token,
      },
    };

  return axios
    .put(api_url + "/api/v1/mission/updateById/"+id, data, configs)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err
    })
}

export const deleteMission = ({token, id}: {token: string, id: string})=>{
    const configs = {
      headers: {
        authorization: token,
      },
    };

  return axios
    .delete(api_url + "/api/v1/mission/delete/"+id, configs)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err
    })
}