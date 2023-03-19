import axios from "axios";
export const getCurrentCity = () => {
  const local = JSON.parse(localStorage.getItem("hkzf_city"));
  if (!local) {
    return new Promise((resolve, reject) => {
      const myCity = new window.BMapGL.LocalCity();
      myCity.get(async (city) => {
        try {
          const res = await axios.get(
            `http://localhost:8080/area/info?name=${city.name}`
          );
          localStorage.setItem("hkzf_city", JSON.stringify(res.data.body));
          resolve(res.data.body);
        } catch (e) {
          reject(e);
        }
      });
    });
  }
  return Promise.resolve(local);
};
