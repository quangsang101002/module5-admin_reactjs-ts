// Header.tsx
import React from "react";
import styles from "./Header.module.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import authAPI from "../../apis/auth/auth/requests/author.api";
import { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";

interface HeaderProps {
  isHideSidebar: boolean;
  setIsHideSidebar: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isHideSidebar, setIsHideSidebar }) => {
  const handleHideSide = () => {
    setIsHideSidebar(!isHideSidebar);
  };
  const [avatar, setAvatar] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const fetchData = async () => {
    try {
      const response = await authAPI.getAuth();
      setAvatar(response.avatar);
      setUsername(response.username);
      setUserId(response.id);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <header className={styles.wrapper}>
      <div className={styles.menu}>
        {isHideSidebar ? (
          <GrClose onClick={handleHideSide} />
        ) : (
          <GiHamburgerMenu onClick={handleHideSide} />
        )}
      </div>

      <div className={styles.infoAdmin}>
        <div className={styles.avatar}>
          <img
            src="https://as1.ftcdn.net/v2/jpg/01/88/77/70/1000_F_188777023_l0BzfxSZL3QfXa24dHX3SbxZUBOx0chb.jpg"
            alt="avatar"
          ></img>
        </div>
        <div className={styles.user}>{username}</div>
      </div>
    </header>
  );
};

export default Header;
