import { Route , Routes } from 'react-router-dom';
import WeatherPage from './ui/WeatherPage';
import CitiesTable from './ui/CitesTable';
import './App.css';

function App() {
  return (
    <div className="App">
   <Routes>
        <Route path="/" element={<CitiesTable />} />
        <Route path="/weather/:name" element={<WeatherPage />} />
    </Routes>
  </div>
  );
}

export default App;
