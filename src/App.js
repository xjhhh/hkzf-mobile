import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import CityList from "./pages/CityList";
import Map from "./pages/Map";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home/*" element={<Home />} />
          <Route path="/citylist" element={<CityList />} />
          <Route path="/map" element={<Map />} />
          <Route path="/" element={<Navigate to="home" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
