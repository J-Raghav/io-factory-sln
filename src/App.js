import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaterTankProblem from './components/WaterTankProblem';
import { useState } from 'react';
import { getRandomColorPallet } from './components/utils';

function App() {
  const [{main, cover}, setColorPallet] = useState(getRandomColorPallet())

  return (
    <div className="App">
      <WaterTankProblem colorPallet={{main, cover}}/>
    </div>
  );
}

export default App;
