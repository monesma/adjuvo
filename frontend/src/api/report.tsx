import axios from "axios";
import type { CreateNewCancellation } from "../types/cancellation-types";
const api_url = import.meta.env.VITE_API_URL;

export const createNewReport = ({token, data}: {token: string, data: CreateNewCancellation})=>{
    const configs = {
        headers: {
          authorization: token,
        },
      };

    return axios
      .post(api_url + "/api/v1/report/add", data, configs)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      })
}

export const getReportById = ({token, id}: {token: string, id: string})=>{
  const configs = {
      headers: {
        authorization: token,
      },
    };
    
  return axios
    .get(api_url + "/api/v1/report/getById/"+id, configs)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err
    }); 
}

export const updateReport = ({token, id, data}: {token: string, id: string; data: {status: string;}})=>{
    const configs = {
        headers: {
          authorization: token,
        },
      };

    return axios
      .put(api_url + "/api/v1/report/updateById/" + id, data, configs)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      })
}