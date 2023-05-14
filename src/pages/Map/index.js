import React from "react";
import NavHeader from "../../components/NavHeader";
import styles from "./index.module.css";
import { getCurrentCity } from "../../utils";
const BMapGL = window.BMapGL;
export default class Map extends React.Component {
  async componentDidMount() {
    const { label, value } = await getCurrentCity();
    //创建地址解析器实例
    var myGeo = new BMapGL.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      label,
      (point) => {
        if (point) {
          const map = new BMapGL.Map("container");
          map.centerAndZoom(point, 11);
          // map.addOverlay(new BMapGL.Marker(point, { title: label }));

          //控件
          map.addControl(
            new BMapGL.ScaleControl({
              // offset: new BMapGL.Size(150, 150),
            })
          ); // 添加比例尺控件
          map.addControl(
            new BMapGL.ZoomControl({
              // offset: new BMapGL.Size(150, 150),
            })
          ); // 添加缩放控件
          // map.addControl(new BMapGL.CityListControl()); // 添加城市列表控件
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
