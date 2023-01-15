import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import {
  DefaultColorPallet,
  getRandomColorPallet,
} from "./components/WaterTank/utils";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import WaterTankProblem from "./components/WaterTank/WaterTankProblem";
import MaximumProfitProblem from "./components/MaximumProfit/MaximumProfitProblem";
import CulinaryKitchen from "./components/CulinaryKitchen/CulinaryKitchen";

function Home() {
  return (
    <div className="p-3">
      <h1 className="h1">IO Factory - Assignment Solutions</h1>
      <ul>
        <li>
          <Link to={"/water-tank-sln"}>Water Tank Solution</Link>
        </li>
        <li>
          <Link to={"/maximum-profit-sln"}>Maximum Profit Solution</Link>
        </li>
        <li>
          <Link to={"/culinary-kitchen"}>CSS Assignment</Link>
        </li>
      </ul>
    </div>
  );
}

function App() {
  const [{ main, cover }, setColorPallet] = useState(DefaultColorPallet);
  const { pathname } = useLocation();
  const rootStyles = {
    backgroundColor: cover,
    color: main,
  };

  return (
    <div className="App" style={rootStyles}>
      <div className="d-flex">
        {pathname !== "/" ? (
          <Link to={"/"} className="btn btn-sm btn-secondary rounded-0">
            Go Back
          </Link>
        ) : null}
        <button
          className="btn btn-sm btn-primary ms-auto rounded-0"
          onClick={() => setColorPallet(getRandomColorPallet())}
        >
          Change Theme
        </button>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/water-tank-sln"
          element={<WaterTankProblem colorPallet={{ main, cover }} />}
        />
        <Route path="/maximum-profit-sln" element={<MaximumProfitProblem />} />
        <Route path="/culinary-kitchen" element={<CulinaryKitchen />} />
      </Routes>
    </div>
  );
}

export default App;
