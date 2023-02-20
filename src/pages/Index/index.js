import React from "react";
import { Swiper } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav1 from "../../assets/images/nav-1.png";
import Nav2 from "../../assets/images/nav-2.png";
import Nav3 from "../../assets/images/nav-3.png";
import Nav4 from "../../assets/images/nav-4.png";
import "./index.css";

const navs = [
  { id: 1, img: Nav1, title: "整租", path: "/home/findHouse" },
  { id: 2, img: Nav2, title: "合租", path: "/home/findHouse" },
  { id: 3, img: Nav3, title: "地图找房", path: "/map" },
  { id: 4, img: Nav4, title: "去出租", path: "/rent" },
];
export default class Index extends React.Component {
  state = {
    swipers: [],
  };

  async getSwipers() {
    const res = await axios.get("http://localhost:8080/home/swiper");
    this.setState({
      swipers: res.data.body,
    });
  }
  componentDidMount() {
    this.getSwipers();
  }

  onNavClick() {
    // const navigate = useNavigate();
    // navigate("/home/findHouse");
  }

  renderSwipers() {
    if (!this.state.swipers.length) {
      return <Swiper.Item></Swiper.Item>;
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
          ></img>
        </a>
      </Swiper.Item>
    ));
  }

  renderNavs() {
    return (
      //使用tabbar重写
      <div className="nav">
        {navs.map((item) => (
          <div className="navitem" key={item.id} onClick={this.onNavClick}>
            <img src={item.img} />
            <h2>{item.title}</h2>
          </div>
        ))}
      </div>
    );
  }
  render() {
    return (
      <div style={{ width: "100%" }}>
        <Swiper loop autoplay autoplayInterval={5000}>
          {this.renderSwipers()}
        </Swiper>
        {this.renderNavs()}
      </div>
    );
  }
}
