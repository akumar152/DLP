import React from 'react';
import './App.css';
import GridLayout from './GridLayout';
import Table from './Table';
import LineChart from './AreaGraph';
import WorldMap from './Map';
import MarketTable from './MarketTable';

function App() {
  return (
    <div className="App">
      {/* Header with title */}
      <header className="App-header">
        <h1>DLP Observability</h1>
      </header>

      {/* Main layout with sidebar and content */}
      <div className="App-container">
        <nav className="App-sidebar">
          <ul>
            <li><a href="#home"><i className="fas fa-home"></i> Home</a></li>
            <li><a href="#pipeline"><i className="fas fa-project-diagram"></i> Pipeline</a></li>
            <li><a href="#admin"><i className="fas fa-user-shield"></i> Admin</a></li>
            <li><a href="#history"><i className="fas fa-history"></i> History</a></li>
          </ul>
        </nav>
        <div className="App-content">
          <GridLayout />
          {/* <MarketTable /> */}
          <Table />
          {/* <MapComponent /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
