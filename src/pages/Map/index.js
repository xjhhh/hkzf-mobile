import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
  state = {
    houseList: [],
  };
  async componentDidMount() {
    this.initMap();
  }

  async initMap() {
    const { label, value } = await getCurrentCity();
    const myGeo = new BMapGL.Geocoder(); //创建地址解析器实例
    myGeo.getPoint(
      label,
      async (point) => {
        if (point) {
          const map = new BMapGL.Map("container");
          // ......
          this.map = map;
          map.centerAndZoom(point, 11); // 将地址解析结果显示在地图上，并调整地图视野
          // map.addOverlay(new BMapGL.Marker(point, { title: label }));
          map.enableScrollWheelZoom(true); //鼠标滚轮控制地图缩放
          map.addControl(
            // 添加比例尺控件
            new BMapGL.ScaleControl({
              // offset: new BMapGL.Size(150, 150),
            })
          );
          map.addControl(
            // 添加缩放控件
            new BMapGL.ZoomControl({
              // offset: new BMapGL.Size(150, 150),
            })
          );
          this.renderOverlays(value);
        } else {
          alert("您选择的地址没有解析到结果！");
        }
      },
      label
    );
  }

  async renderOverlays(id) {
    const { type, nextZoom } = this.getTypeAndRoom();
    const res = await axios.get(`http://localhost:8080/area/map?id=${id}`);
    console.log(res.data.body);
    res.data.body.forEach((area) => {
      this.createOverlays(area, type, nextZoom);
    });
  }

  createOverlays(area, type, zoom) {
    const {
      coord: { longitude, latitude },
      label: areaName,
      count,
      value,
    } = area;
    const areaPoint = new BMapGL.Point(longitude, latitude);
    let mapSize, labelContent, labelClick;
    const map = this.map;
    if (map.getZoom() === 15) {
      //小区
      mapSize = new BMapGL.Size(-50, -28);
      labelContent = `
      <div class="${styles.rect}">
        <span class="${styles.housename}">${areaName}</span>
        <span class="${styles.housenum}">${count}套</span>
        <i class="${styles.arrow}"></i>
      </div>`;
      labelClick = async () => {
        const res = await axios.get(
          `http://localhost:8080/houses?cityId=${value}`
        );
        this.setState({ houseList: res.data.body.list });
      };
    } else {
      mapSize = new BMapGL.Size(-35, -35);
      labelContent = `
      <div class="${styles.bubble}">
        <p class="${styles.name}">${areaName}</p>
        <p>${count}套</p>
      </div>`;
      labelClick = () => {
        map.clearOverlays();
        map.centerAndZoom(areaPoint, Math.min(map.getZoom() + 2, 15));
        this.renderOverlays(value);
      };
    }
    const label = new BMapGL.Label("", {
      position: areaPoint, // 指定文本标注所在的地理位置
      offset: mapSize, // 设置文本偏移量
    });
    // label.id = value;
    label.setContent(labelContent); // 设置房源覆盖物内容
    label.setStyle(labelStyle); // 设置（文本标注对象）样式
    label.addEventListener("click", labelClick);
    map.addOverlay(label);
  }

  getTypeAndRoom() {
    const zoom = this.map.getZoom(); //区11，镇13，小区15
    const type = {
      11: "circle",
      13: "rect",
    }[zoom];
    const nextZoom = Math.min(zoom + 2, 15);
    return { type, nextZoom };
  }

  renderHouseList() {
    return this.state.houseList.map((house) => {
      return (
        <div className={styles.house} key={house.houseCode}>
          <div className={styles.imgWrap}>
            <img
              className={styles.img}
              src={`http://localhost:8080${house.houseImg}`}
              alt=""
            />
          </div>
          <div className={styles.content}>
            <h3 className={styles.title}>{house.title}</h3>
            <div className={styles.desc}>{house.desc}</div>
            <div>
              {house.tags.map((tag) => {
                return (
                  <span
                    key={tag}
                    className={[styles.tag, styles.tag1].join(" ")}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
            <div className={styles.price}>
              <span className={styles.priceNum}>{house.price}</span> 元/月
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <div className={styles.map}>
        {/* <div className="test">样式覆盖</div> */}
        <NavHeader>地图找房</NavHeader>
        <div id="container" className={styles.container}></div>

        {/* 小区房源列表 */}
        {/* ??? */}
        <div
          className={[
            styles.houseList,
            this.map && this.map.getZoom() === 15 ? styles.show : "",
          ].join(" ")}
        >
          <div className={styles.titleWrap}>
            <h1 className={styles.listTitle}>房屋列表</h1>
            <Link className={styles.titleMore} to="/home/list">
              更多房源
            </Link>
          </div>
          <div className={styles.houseItems}>{this.renderHouseList()}</div>
        </div>
      </div>
    );
  }
}
