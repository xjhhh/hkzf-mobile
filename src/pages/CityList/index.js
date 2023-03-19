import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { NavBar, IndexBar, List } from "antd-mobile";
import "./index.scss";
const Nav = () => {
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };
  return (
    <NavBar
      className="navbar"
      backArrow={<i className="iconfont icon-back"></i>}
      onBack={onBack}
    >
      城市选择
    </NavBar>
  );
};

const City = (props) => {
  const city = props.city || [];
  const location = useLocation();
  if (city[0] && city[0].title != "#") {
    city.unshift({
      title: "#",
      items: [location.state.cityName],
    });
  }
  return (
    <IndexBar>
      {city.map((group) => {
        const { title, items } = group;
        if (!items.length) return null;
        return (
          <IndexBar.Panel
            index={title}
            title={title == "#" ? "当前定位" : title}
            key={title}
          >
            <List>
              {items.map((item, index) => (
                <List.Item key={index}>{item}</List.Item>
              ))}
            </List>
          </IndexBar.Panel>
        );
      })}
    </IndexBar>
  );
};

export default class CityList extends React.Component {
  state = {
    city: [],
  };
  componentDidMount() {
    this.getCity();
  }
  async getCity() {
    const city_res = await axios.get("http://localhost:8080/area/city?level=1");
    const ret = this.formatCityData(city_res.data.body);
    const hot_res = await axios.get("http://localhost:8080/area/hot");
    ret.unshift({
      title: "热门城市",
      items: hot_res.data.body.map((h) => h.label),
    });
    this.setState({
      city: ret,
    });
  }
  formatCityData(list) {
    const charOpNum = (ch, n) => String.fromCharCode(ch.charCodeAt(0) + n);
    const ret = [];
    list.forEach((ccc) => {
      const k = ccc.short[0];
      const i = k.charCodeAt(0) - "a".charCodeAt(0);
      if (!ret[i]) ret[i] = { title: charOpNum("A", i), items: [] };
      ret[i].items.push(ccc.label);
    });
    return ret;
  }
  render() {
    return (
      <div className="page">
        <Nav />
        <City city={this.state.city} />
      </div>
    );
  }
}
