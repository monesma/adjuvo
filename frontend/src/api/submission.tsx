import axios from "axios";
import type { CreateNewSubmission } from "../types/submission-types";
const api_url = import.meta.env.VITE_API_URL;

export const createNewSubmission = ({token, data}: {token: string, data: CreateNewSubmission})=>{
    const configs = {
        headers: {
          authorization: token,
        },
      };

    return axios
      .post(api_url + "/api/v1/submission/add", data, configs)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      })
}

export const listSubmissions = ({token}: {token: string})=>{
    const configs = {
        headers: {
          authorization: token,
        },
      };

    return axios
      .get(api_url + "/api/v1/submission/all", configs)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      })
}

export const getSubmissionById = ({token, id}: {token: string, id: string})=>{
  const configs = {
      headers: {
        authorization: token,
      },
    };
    
  return axios
    .get(api_url + "/api/v1/submission/getById/"+id, configs)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err
    }); 
}

export const getSubmissionByBuilderId = ({token, id}: {token: string, id: string})=>{
  const configs = {
      headers: {
        authorization: token,
      },
    };
    
  return axios
    .get(api_url + "/api/v1/submission/getScSubmissionForBuilder/"+id, configs)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err
    }); 
}

export const deleteSubmission = ({token, id}: {token: string, id: string})=>{
  const configs = {
      headers: {
        authorization: token,
      },
    };
    
  return axios
    .delete(api_url + "/api/v1/submission/delete/"+id, configs)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err
    }); 
}