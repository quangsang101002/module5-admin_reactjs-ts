import api from "../base.api";
import { BodyProduct } from "./products.interFace.api";
import { LoginResponse } from "../auth/auth/responses/login.response";
import { getAccessToken } from "../../utilities/token.util";
import { idText } from "typescript";

const SearchProduct = async (name: string, limit: number, page: number) => {
  const accessToken = getAccessToken();
  if (accessToken !== null) {
    const params = {
      keyword: name,
      limit: limit,
      page: page,
    };

    try {
      const response = await api.get("/product", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: params,
      });

      return response.data;
    } catch (error) {
      console.error("API Error", error);
      throw error;
    }
  }
};

const addProduct = async (bodyProducts: FormData) => {
  const accessToken = getAccessToken();
  if (accessToken !== null) {
    const param: LoginResponse = {
      token: accessToken,
    };
    try {
      const response = await api.postForm("/product", bodyProducts, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: param,
      });
      return response.data;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }
};
const updateProduct = async (id: any, bodyProducts: FormData) => {
  const accessToken = getAccessToken();

  if (accessToken !== null) {
    const param: LoginResponse = {
      token: accessToken,
    };
    try {
      const response = await api.putForm(`/product/${id}`, bodyProducts, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: param,
      });
      return response.data;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }
};

const deleteProduct = async (id: any) => {
  const accessToken = getAccessToken();
  if (accessToken !== null) {
    const param: LoginResponse = {
      token: accessToken,
    };
    return await api
      .delete(`/product/${id}`, {
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
  }
};

const getProductDetail = async (id: any) => {
  const accessToken = getAccessToken();
  if (accessToken !== null) {
    const param: LoginResponse = {
      token: accessToken,
    };
    try {
      const response = await api.get(`/product/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: param,
      });
      return response.data;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }
};
const productAPI = {
  SearchProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
};

export default productAPI;
