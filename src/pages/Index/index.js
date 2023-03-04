import React from "react";
import { TabBar, Swiper, Grid, Space, Button } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav1 from "../../assets/images/nav-1.png";
import Nav2 from "../../assets/images/nav-2.png";
import Nav3 from "../../assets/images/nav-3.png";
import Nav4 from "../../assets/images/nav-4.png";
import "./index.scss";

const Navs = () => {
  const tabs = [
    { id: 1, img: Nav1, title: "整租", path: "/home/findHouse" },
    { id: 2, img: Nav2, title: "合租", path: "/home/findHouse" },
    { id: 3, img: Nav3, title: "地图找房", path: "/map" },
    { id: 4, img: Nav4, title: "去出租", path: "/rent" },
  ];

  const navigate = useNavigate();
  const setRouteActive = (id) => {
    navigate(tabs[id - 1].path);
  };

  return (
    <TabBar
      activeKey={null}
      className="nav"
      onChange={(key) => setRouteActive(key)}
    >
      {tabs.map((item) => (
        <TabBar.Item
          key={item.id}
          icon={<img src={item.img} alt="" />}
          title={<h2>{item.title}</h2>}
        />
      ))}
    </TabBar>
  );
};
export default class Index extends React.Component {
  state = {
    swipers: [],
    groups: [],
  };

  async getSwipers() {
    const res = await axios.get("http://localhost:8080/home/swiper");
    this.setState({
      swipers: res.data.body,
    });
  }

  async getGroups() {
    const res = await axios.get("http://localhost:8080/home/groups", {
      params: {
        area: "AREA%7C88cff55c-aaa4-e2e0",
      },
    });
    this.setState({ groups: res.data.body });
  }

  componentDidMount() {
    this.getSwipers();
    this.getGroups();
  }

  renderSwipers() {
    if (!this.state.swipers.length) {
      return <Swiper.Item style={{ height: 212 }}></Swiper.Item>;
    }
    return this.state.swipers.map((item) => (
      <Swiper.Item key={item.id}>
        <a
          key={item.id}
          href="http://itcast.cn"
          style={{ display: "inline-block", width: "100%", height: 212 }}
        >
          <img
            src={`http://localhost:8080${item.imgSrc}`}
            style={{ width: "100%", verticalAlign: "top" }}
            alt=""
          ></img>
        </a>
      </Swiper.Item>
    ));
  }

  renderGroups() {
    return (
      <Grid style={{ paddingBottom: "15px" }} columns={2} gap={10}>
        {this.state.groups.map((item) => (
          <Grid.Item key={item.id}>
            <Button className="group-item" block fill="none">
              <Space justify="around">
                <div className="desc">
                  <p className="title">{item.title}</p>
                  <span className="info">{item.desc}</span>
                </div>
                <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
              </Space>
            </Button>
          </Grid.Item>
        ))}
      </Grid>
    );
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        <Swiper loop autoplay autoplayInterval={5000}>
          {this.renderSwipers()}
        </Swiper>
        <Navs />
        <div className="group">
          <h3 className="group-title">
            租房小组 <span className="more">更多</span>
          </h3>
          {this.renderGroups()}
        </div>
      </div>
    );
  }
}
