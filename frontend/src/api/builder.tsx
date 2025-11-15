import axios from "axios";
import type { CreateBuilder } from "../types/builder-types";
const api_url = import.meta.env.VITE_API_URL;

export const checkBuilderToken = (token: string) => {
  const configs = {
    headers: {
      authorization: token,
    },
  };

  return axios
    .get(api_url + "/api/v1/auth/builder/checkToken", configs)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err
    });
};

export const signupBuilder = (data : CreateBuilder)=>{
    return axios
      .post(api_url + "/api/v1/builder/signup", data)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err
      })
}


export const signinBuilder = (data: {wallet_id: string}) => {
  return axios
    .post(api_url + "/api/v1/builder/signin", data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err
    });
};


export const updateBuilder = ({token, id, data}: {token: string, id: string, data: unknown})=>{
    const configs = {
      headers: {
        authorization: token,
      },
    };

  return axios
    .put(api_url + "/api/v1/builder/updateById/"+id, data, configs)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err
    })
}

export const deleteBuilder =  ({token, id}: {token: string, id: string, organization_id: string})=>{
  const configs = {
      headers: {
        authorization: token,
      },
    };

  return axios
    .delete(api_url + `/api/v1/builder/delete/${id}`, configs)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err
    });
}


export const getBuilderByScId = (token: string, id: string) => {
  const configs = {
    headers: {
      authorization: token,
    },
  };

  return axios
    .get(api_url + "/api/v1/builder/getByScId/" + id, configs)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err
    });
};