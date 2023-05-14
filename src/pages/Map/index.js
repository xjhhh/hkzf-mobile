import React from "react";
import NavHeader from "../../components/NavHeader";
import "./index.scss";
export default class Map extends React.Component {
  componentDidMount() {
    const map = new window.BMapGL.Map("container");
    const point = new window.BMapGL.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
  }

  render() {
    return (
      <div className="map">
        {/* <div className="test">样式覆盖</div> */}
        <NavHeader>地图找房</NavHeader>
        <div id="container"></div>
      </div>
    );
  }
}
