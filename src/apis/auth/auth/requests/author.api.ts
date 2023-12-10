import api from "../../../base.api";
import { LoginRequest } from "./login-request";
import { getAccessToken } from "../../../../utilities/token.util";
import { LoginResponse } from "../responses/login.response";

const accessToken = getAccessToken(); // Gọi hàm để lấy giá trị accessToken

const login = async (param: LoginRequest) => {
  const requestBody: LoginRequest = {
    username: param.username,
    password: param.password,
    type: param.type,
  };
  try {
    const response = await api.post("/login", requestBody);
    return response.data;
  } catch (error: any) {
    return Promise.reject(error.response.data.message);
  }
};

const getAuth = async () => {
  const accessToken = getAccessToken(); // Gọi hàm để lấy giá trị accessToken

  if (accessToken !== null) {
    const param: LoginResponse = {
      token: accessToken,
    };

    return await api
      .get("/auth", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: param,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  } else {
    // Xử lý khi accessToken là null
    return await Promise.reject("Access token is null  1.");
  }
};

const logout = async () => {
  const accessToken = getAccessToken();

  if (accessToken !== null) {
    const param: LoginResponse = {
      token: accessToken,
    };
    return await api
      .post("/logout", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: param,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  } else {
    return Promise.reject("Access token is null  2.");
  }
};
const authAPI = {
  login,
  getAuth,
  logout,
};

export default authAPI;
