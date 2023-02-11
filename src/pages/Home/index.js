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
import News from "../News";

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
      key: "home",
      title: "首页",
      icon: <i className="iconfont icon-ind" />,
    },
    {
      key: "search",
      title: "找房",
      icon: <i className="iconfont icon-findHouse" />,
    },
    {
      key: "message",
      title: "资讯",
      icon: <i className="iconfont icon-infom" />,
    },
    {
      key: "me",
      title: "我的",
      icon: <i className="iconfont icon-my" />,
    },
  ];
  return (
    <TabBar activeKey={paths[2]} onChange={(value) => setRouteActive(value)}>
      {tabs.map((item) => (
        <TabBar.Item
          key={item.key}
          icon={item.icon}
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
      <div>
        <Routes>
          <Route path="news" element={<News />} />
        </Routes>
        <div className="app">
          <div className="body">
            <Routes>
              <Route path="home" element={<Home0 />} />
              <Route path="search" element={<Search />} />
              <Route path="message" element={<Message />} />
              <Route path="me" element={<PersonalCenter />} />
              <Route path="*" element={<Navigate to="me" />}></Route>
            </Routes>
          </div>
          <div className="bottom">
            <Bottom />
          </div>
        </div>
      </div>
    );
  }
}
function Home0() {
  return <div>首页0</div>;
}
function Search() {
  return <div>待办</div>;
}
function Message() {
  return <div>消息</div>;
}
function PersonalCenter() {
  return <div>我的</div>;
}
