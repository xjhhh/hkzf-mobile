import React from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "antd-mobile";
import "./index.scss";
import styles from "./index.module.css";
import PropTypes from "prop-types";

NavHeader.propTypes = {
  children: PropTypes.string.isRequired,
  onLeftClick: PropTypes.func,
};
export default function NavHeader({ children, onLeftClick }) {
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };
  return (
    <NavBar
      className={styles.navBar}
      backArrow={<i className="iconfont icon-back"></i>}
      onBack={onLeftClick || onBack}
    >
      {children}
    </NavBar>
  );
}
