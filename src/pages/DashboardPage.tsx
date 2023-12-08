import styles from "./DashboardPage.module.scss";
import Sidebars from "../components/partials/Sidebars";
import { useEffect, useState } from "react";
import moment from "moment";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import productAPI from "../apis/products/products.api";
import clsx from "clsx";
import OrderAPI from "../apis/orders/orders.api";
import UserApi from "../apis/users/users.api";
function DashboardPage() {
  const [totalProduct, setTotalProduct] = useState<number>(0);
  const [totalUser, setTotaUser] = useState<number>(0);
  const [totalOrder, setTotalOrder] = useState<number>(0);

  useEffect(() => {
    searchProducts();
    // fetchDataOrders();
    // fetchDataUsers();
  }, []);
  const navigate = useNavigate();
  const searchProducts = async () => {
    try {
      const response = await productAPI.SearchProduct("", 7, 1);

      if (response) {
        setTotalProduct(response[1]);
      } else {
        // navigate("/login");
      }
    } catch (err) {
      console.log(err);
      // navigate("/login");
    }
  };

  // const fetchDataOrders = async () => {
  //   try {
  //     const response = await OrderAPI.SearchOrder("", 7, 1);
  //     console.log(response);

  //     if (response) {
  //       setTotalOrder(response.result.totalOrders);
  //     } else {
  //       alert("Invalid response format");
  //     }
  //   } catch (err) {
  //     console.log(err);

  //     // navigate("/login");
  //   }
  // };
  // const fetchDataUsers = async () => {
  //   try {
  //     const response = await UserApi.SearchUser("", 7, 1);
  //     if (response) {
  //       setTotaUser(response.result.total);
  //     } else {
  //       alert("Invalid response format");
  //     }
  //   } catch (err) {
  //     // navigate("/login");
  //   }
  // };

  return (
    <div className={styles.wrapper}>
      <div className={styles.products}>product {totalProduct}</div>
      <div className={styles.users}>user {totalUser}</div>
      <div className={styles.orders}>order {totalOrder}</div>
    </div>
  );
}

export default DashboardPage;
