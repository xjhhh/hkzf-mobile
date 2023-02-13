import React from "react";
import { TabBar, Badge } from "antd-mobile";
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./home.css";
import Index from "../Index";
import FindHouse from "../FindHouse";
import News from "../News";
import Profile from "../Profile";

const Bottom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value) => {
    navigate(value);
  };

  const tabs = [
    {
      key: "/home",
      title: "首页",
      icon: "icon-ind",
    },
    {
      key: "/home/findHouse",
      title: "找房",
      icon: "icon-findHouse",
    },
    {
      key: "/home/news",
      title: "资讯",
      icon: "icon-infom",
    },
    {
      key: "/home/profile",
      title: "我的",
      icon: "icon-my",
    },
  ];
  return (
    <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
      {tabs.map((item) => (
        <TabBar.Item
          key={item.key}
          icon={<i className={`iconfont ${item.icon}`} />}
          title={item.title}
          badge={item.badge}
        />
      ))}
    </TabBar>
  );
};
export default class Home extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="body">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/findHouse" element={<FindHouse />} />
            <Route path="/news" element={<News />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <div className="bottom">
          <Bottom />
        </div>
      </div>
    );
  }
}
