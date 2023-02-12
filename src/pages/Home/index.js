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
  const paths = pathname.split("/");

  const setRouteActive = (value) => {
    navigate(value, { replace: true });
  };

  const tabs = [
    {
      key: "index",
      title: "首页",
      icon: "icon-ind",
    },
    {
      key: "findHouse",
      title: "找房",
      icon: "icon-findHouse",
    },
    {
      key: "news",
      title: "资讯",
      icon: "icon-infom",
    },
    {
      key: "profile",
      title: "我的",
      icon: "icon-my",
    },
  ];
  return (
    <TabBar activeKey={paths[2]} onChange={(value) => setRouteActive(value)}>
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
            <Route path="index" element={<Index />} />
            <Route path="findHouse" element={<FindHouse />} />
            <Route path="news" element={<News />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="index" />}></Route>
          </Routes>
        </div>
        <div className="bottom">
          <Bottom />
        </div>
      </div>
    );
  }
}
