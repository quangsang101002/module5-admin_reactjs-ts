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

function Sidebars() {
  const [avatar, setAvatar] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await authAPI.getAuth();
      setAvatar(response.avatar);
      setUsername(response.username);
      setUserId(response.id);
    } catch (error) {}
  };
  const logoutUser = async () => {
    try {
      await authAPI.logout();
      localStorage.removeItem("Bearer"); // Không cần gán cho logouted
      navigate("/login");
    } catch (error) {
      console.error("Đã xảy ra lỗi khi đăng xuất:", error);
    }
  };

  return (
    <div className={clsx(styles.wrapper)}>
      <Menu>
        <div className={styles.brand}>
          <h2>Sang Rose</h2>
        </div>
        <MenuItem className={styles.manager}>
          <AiOutlineHome />
          <Link to="/">Trang chủ</Link>
        </MenuItem>

        <MenuItem className={styles.manager}>
          <div>
            <FaBoxOpen />
            <Link to="/admin/product">Quản lí sản phẩm</Link>{" "}
          </div>
        </MenuItem>
        <MenuItem className={styles.manager}>
          <div>
            <FaUsers />
            <Link to="/admin/user">Quản lí người dùng</Link>
          </div>
        </MenuItem>
        <MenuItem className={styles.manager}>
          <div>
            <BsFillCartPlusFill />
            <Link to="/admin/order">Quản lí đơn hàng</Link>
          </div>
        </MenuItem>
        <MenuItem className={styles.manager}>
          <BsFillTelephoneFill />
          <Link to="/admin/contact"> Liên hệ</Link>
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
