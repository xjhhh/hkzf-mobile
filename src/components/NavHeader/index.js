import React from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "antd-mobile";
import "./index.scss";

export default function NavHeader({ children, onLeftClick }) {
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };
  return (
    <NavBar
      className="navbar"
      backArrow={<i className="iconfont icon-back"></i>}
      onBack={onLeftClick || onBack}
    >
      {children}
    </NavBar>
  );
}
