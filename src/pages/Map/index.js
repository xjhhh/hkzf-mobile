import React from "react";
import NavHeader from "../../components/NavHeader";
import styles from "./index.module.css";
import { getCurrentCity } from "../../utils";
const BMapGL = window.BMapGL;
const labelStyle = {
  cursor: "pointer",
  border: "opx solid rgb(255,0 , 0)",
  padding: "opx",
  whiteSpace: "nowrap",
  fontsize: "12px",
  color: "rgb(255,255,255)",
  textAlign: "center",
};

export default class Map extends React.Component {
  async componentDidMount() {
    const { label, value } = await getCurrentCity();
    //创建地址解析器实例
    const myGeo = new BMapGL.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      label,
      (point) => {
        if (point) {
          const map = new BMapGL.Map("container");
          map.centerAndZoom(point, 11);
          // map.addOverlay(new BMapGL.Marker(point, { title: label }));
          map.enableScrollWheelZoom(true); //鼠标滚轮控制地图缩放
          // 添加比例尺控件
          map.addControl(
            new BMapGL.ScaleControl({
              // offset: new BMapGL.Size(150, 150),
            })
          );
          // 添加缩放控件
          map.addControl(
            new BMapGL.ZoomControl({
              // offset: new BMapGL.Size(150, 150),
            })
          );
          console.log(point);
          console.log(new BMapGL.Point(116.2787, 40.0492));
          const opts = {
            position: point, // 指定文本标注所在的地理位置
            offset: new BMapGL.Size(-35, -35), // 设置文本偏移量
          };
          // 创建文本标注对象
          const label = new BMapGL.Label("", opts);
          // 设置房源覆盖物内容
          label.setContent(`
            <div class="${styles.bubble}">
              <p class="${styles.name}">浦东</p>
              <p>99套</p>
            </div>`);
          // 设置样式
          label.setStyle(labelStyle);
          // 添加单击事件
          label.addEventListener("click", () => {
            console.log("房源覆盖物被点击了");
          });
          map.addOverlay(label);
        } else {
          alert("您选择的地址没有解析到结果！");
        }
      },
      label
    );
  }

  render() {
    return (
      <div className={styles.map}>
        {/* <div className="test">样式覆盖</div> */}
        <NavHeader>地图找房</NavHeader>
        <div id="container" className={styles.container}></div>
      </div>
    );
  }
}
