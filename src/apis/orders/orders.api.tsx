import api from "../base.api";
import { getAccessToken } from "../../utilities/token.util";

const SearchOrder = async (name: string, limit: number, page: number) => {
  const accessToken = getAccessToken();
  if (accessToken !== null) {
    const parama = {
      token: accessToken,
    };

    const param = {
      name: name,
      limit: limit,
      page: page,
    };

    try {
      const response = await api.get("/order", {
        params: param,
        headers: parama,
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

const deleteOrder = async (id: number) => {
  const accessToken = getAccessToken();
  if (accessToken !== null) {
    const param = {
      token: accessToken,
    };

    return await api
      .delete(`/order/${id}`, { params: param })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("API Error", error);
        throw error;
      });
  }
};

const updateStatus = async (id: number, statusValue: any) => {
  const formData = new FormData();
  formData.append("status", statusValue);
  const accessToken = getAccessToken();
  if (accessToken !== null) {
    const param = {
      token: accessToken,
    };
    try {
      const response = await api.putForm(`/order/${id}`, formData, {
        headers: param,
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

const OrderAPI = {
  SearchOrder,
  deleteOrder,
  updateStatus,
};

export default OrderAPI;
