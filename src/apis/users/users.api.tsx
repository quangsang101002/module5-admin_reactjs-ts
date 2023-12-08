import api from "../base.api";
import { LoginResponse } from "../auth/auth/responses/login.response";
import { getAccessToken } from "../../utilities/token.util";

const SearchUser = async (name: string, limit: number, page: number) => {
  const accessToken = getAccessToken();
  if (accessToken !== null) {
    const parama = {
      token: accessToken,
    };

    const param = {
      keyword: name,
      limit: limit,
      page: page,
    };

    try {
      const response = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: param,
      });
      return response.data;
    } catch (error) {
      console.error("API Error", error);
      throw error;
    }
  } else {
    console.error("Access token is null.");
    throw new Error("Access token is null.");
  }
};
const deleteUser = async (id: any) => {
  const accessToken = getAccessToken();
  if (accessToken !== undefined) {
    const param = {
      token: accessToken,
    };

    return await api
      .delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: param,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("API Error", error);
        throw error;
      });
  } else {
    console.error("Access token is null.");
    throw new Error("Access token is null.");
  }
};
const AddUser = async (requestBody: any) => {
  const accessToken = getAccessToken();
  if (accessToken !== null) {
    const param = {
      token: accessToken,
    };
    try {
      await api
        .postForm("/users", requestBody, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: param,
        })
        .then((response) => {
          return response.data;
        });
    } catch (error) {
      console.error("API Error", error);
      throw error;
    }
  } else {
    console.error("Access token is null.");
    throw new Error("Access token is null.");
  }
};
const addAvatar = async (id: number, avatar: FormData) => {
  const accessToken = getAccessToken();
  if (accessToken !== null) {
    const param = {
      token: accessToken,
    };
    try {
      return await api
        .putForm(`/avatar/${id}`, avatar, { headers: param })
        .then((response) => {
          return response.data;
        });
    } catch (error) {
      console.error("API Error", error);
      throw error;
    }
  } else {
    console.error("Access token is null.");
    throw new Error("Access token is null.");
  }
};

const getDetailUser = async (id: any) => {
  const accessToken = getAccessToken();
  if (accessToken !== null) {
    const param = {
      token: accessToken,
    };
    return await api
      .get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: param,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("API Error", error);
        throw error;
      });
  } else {
    console.error("Access token is null.");
    throw new Error("Access token is null.");
  }
};

const updateUser = async (id: any, body: any) => {
  const accessToken = getAccessToken();

  if (accessToken !== null) {
    const param = {
      token: accessToken,
    };
    return await api
      .put(`/users/${id}`, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: param,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("API Error", error);
        throw error;
      });
  } else {
    console.error("Access token is null.");
    throw new Error("Access token is null.");
  }
};

const lockUser = async (id: number) => {
  const accessToken = getAccessToken();
  if (accessToken !== null) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const data = {
      token: accessToken,
    };
    try {
      const response = await api.post(`/users/${id}`, data, { headers });
      return response.data;
    } catch (error) {
      console.error("API Error", error);
      throw error;
    }
  } else {
    console.error("Access token is null.");
    throw new Error("Access token is null.");
  }
};
const openUser = async (id: number) => {
  const accessToken = getAccessToken();
  if (accessToken !== null) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const data = {
      token: accessToken,
    };
    try {
      const response = await api.put(`/users/openlock/${id}`, data, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error("API Error", error);
      throw error;
    }
  } else {
    console.error("Access token is null.");
    throw new Error("Access token is null.");
  }
};
const UserApi = {
  SearchUser,
  deleteUser,
  AddUser,
  addAvatar,
  getDetailUser,
  updateUser,
  lockUser,
  openUser,
};
export default UserApi;
