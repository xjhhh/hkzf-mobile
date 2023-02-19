import React from "react";
import { Swiper } from "antd-mobile";
import axios from "axios";

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
  render() {
    return (
      <div style={{ width: "100%" }}>
        <Swiper loop autoplay autoplayInterval={5000}>
          {this.renderSwipers()}
        </Swiper>
      </div>
    );
  }
}
