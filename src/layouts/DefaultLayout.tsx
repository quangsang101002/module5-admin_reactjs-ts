import { Outlet } from "react-router-dom";
import styles from "./DefaultLayout.module.scss";
import clsx from "clsx";
import Header from "../components/partials/Header";
import Footer from "../components/partials/Footer";
import Sidebar from "../components/partials/Sidebars";
import { useState } from "react";

const DefaultLayout: React.FC = () => {
  const [isHideSidebar, setIsHideSidebar] = useState(false);
  return (
    <div className={clsx(styles.wrapper, "row")}>
      <Header
        isHideSidebar={isHideSidebar}
        setIsHideSidebar={setIsHideSidebar}
      />
      <div
        className={clsx(
          styles.content,
          styles.content_dashboard,
          isHideSidebar ? "col-2" : ""
        )}
      >
        {isHideSidebar ? <Sidebar /> : ""}
      </div>
      <div
        className={clsx(
          styles.content_dashboard,
          isHideSidebar ? "col-10" : ""
        )}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
