import axios from "axios";
import type { CreateHederaApp} from "../types/hederaApp-types";
const api_url = import.meta.env.VITE_API_URL;

export const checkHederaAppToken = (token: string) => {
  const configs = {
    headers: {
      authorization: token,
    },
  };

  return axios
    .get(api_url + "/api/v1/auth/hedera-app/checkToken", configs)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err
    });
};

export const signupHederaApp = (data: CreateHederaApp)=>{
    return axios
      .post(api_url + "/api/v1/hedera-app/signup", data)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err
      })
}


export const signinHederaApp  = (data: {wallet_id: string}) => {
  return axios
    .post(api_url + "/api/v1/hedera-app/signin", data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err
    });
};


export const updateHederaApp = ({token, id, data}: {token: string, id: string, data: unknown})=>{
    console.log("TOKEN", token)
    console.log("ID", id)
    const configs = {
      headers: {
        authorization: token,
      },
    };

  return axios
    .put(api_url + "/api/v1/hedera-app/updateById/"+id, data, configs)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err
    })
}

export const deleteHederaApp  =  ({token, id}: {token: string, id: string, organization_id: string})=>{
  const configs = {
      headers: {
        authorization: token,
      },
    };

  return axios
    .delete(api_url + `/api/v1/hedera-app/delete/${id}`, configs)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err
    });
}

export const getHederaAppByScId = (token: string, id: string) => {
  const configs = {
    headers: {
      authorization: token,
    },
  };

  return axios
    .get(api_url + "/api/v1/hedera-app/getByScId/" + id, configs)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err
    });
};