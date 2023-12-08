import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import styles from "./Sidebars.module.scss";
import { AiOutlineHome } from "react-icons/ai";
import { FaBoxOpen, FaUsers } from "react-icons/fa";
import { BsFillCartPlusFill, BsFillTelephoneFill } from "react-icons/bs";
import { RiLogoutCircleRFill } from "react-icons/ri";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import authAPI from "../../apis/auth/auth/requests/author.api";
import { useNavigate } from "react-router-dom";
import { removeAccessToken } from "../../utilities/token.util";
import { Alert } from "react-bootstrap";

function Sidebars() {
  const [avatar, setAvatar] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [isChange, setIsChange] = useState<boolean>(false);
  const [changeColor, setChangeColor] = useState<string>("home");

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [isChange]);

  const fetchData = async () => {
    try {
      const response = await authAPI.getAuth();

      setAvatar(response.profile);
      setUsername(response.username);
      setUserId(response.id);
    } catch (error) {
      alert(error);
      console.log(2, error);

      if (error) {
        navigate("/login");
      }
    }
  };

  const logoutUser = async () => {
    await removeAccessToken();
    await setIsChange(true);
  };

  const changeBg = (change: string) => {
    setChangeColor(change);
  };
  return (
    <div className={clsx(styles.wrapper)}>
      <Menu>
        <div className={styles.brand}>
          <h2>{username}</h2>
        </div>
        <MenuItem
          className={styles.manager}
          style={{
            backgroundColor: changeColor === "home" ? "black" : "initial",
          }}
        >
          <AiOutlineHome
            style={{ color: changeColor === "home" ? "white" : "initial" }}
          />
          <Link
            to="/"
            onClick={() => changeBg("home")}
            style={{ color: changeColor === "home" ? "white" : "initial" }}
          >
            Trang chủ
          </Link>
        </MenuItem>

        <MenuItem
          className={styles.manager}
          style={{
            backgroundColor: changeColor === "products" ? "black" : "initial",
          }}
        >
          <FaBoxOpen
            style={{ color: changeColor === "products" ? "white" : "initial" }}
          />
          <Link
            to="/admin/product"
            onClick={() => changeBg("products")}
            style={{ color: changeColor === "products" ? "white" : "initial" }}
          >
            Quản lí sản phẩm
          </Link>
        </MenuItem>

        <MenuItem
          className={styles.manager}
          style={{
            backgroundColor: changeColor === "users" ? "black" : "initial",
          }}
        >
          <FaUsers
            style={{ color: changeColor === "users" ? "white" : "initial" }}
          />
          <Link
            to="/admin/user"
            onClick={() => changeBg("users")}
            style={{ color: changeColor === "users" ? "white" : "initial" }}
          >
            Quản lí người dùng
          </Link>
        </MenuItem>

        <MenuItem className={styles.manager}>
          <div>
            <BsFillCartPlusFill />
            <Link to="/admin/order" onClick={() => changeBg("order")}>
              Quản lí đơn hàng
            </Link>
          </div>
        </MenuItem>
        <MenuItem className={styles.manager}>
          <BsFillTelephoneFill />
          <Link to="/admin/contact" onClick={() => changeBg("contact")}>
            {" "}
            Liên hệ
          </Link>
        </MenuItem>
        <MenuItem className={styles.manager}>
          <RiLogoutCircleRFill />
          <h2 onClick={logoutUser}>Đăng xuất</h2>
        </MenuItem>
      </Menu>
      ;
    </div>
  );
}

export default Sidebars;
