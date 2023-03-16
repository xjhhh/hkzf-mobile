import React from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "antd-mobile";
import "./index.scss";
const Nav = () => {
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };
  return (
    <NavBar
      className="navbar"
      backArrow={<i className="iconfont icon-back"></i>}
      onBack={onBack}
    >
      城市选择
    </NavBar>
  );
};
export default class CityList extends React.Component {
  render() {
    return (
      <div>
        <Nav></Nav>
      </div>
    );
  }
}
