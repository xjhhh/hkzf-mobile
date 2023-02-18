import React from "react";
import { Swiper } from "antd-mobile";
import "./index.css";
const imgs = [
  "AiyWuByWklrrUDlFignR",
  "TekJlZRVCjLFexlOCuWn",
  "IJOtIlfsYdTyaDTRVrLI",
];

const items = imgs.map((val, index) => (
  <Swiper.Item key={index}>
    <a
      key={val}
      href="http://itcast.cn"
      style={{ display: "inline-block", width: "100%", height: 212 }}
    >
      <img
        src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
        style={{ width: "100%", verticalAlign: "top" }}
      ></img>
    </a>
  </Swiper.Item>
));

export default class Index extends React.Component {
  render() {
    return (
      <div style={{ width: "100%" }}>
        <Swiper loop autoplay autoplayInterval={5000}>
          {items}
        </Swiper>
      </div>
    );
  }
}
