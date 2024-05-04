import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import { SwimlaneDashboard } from './pages/swimlane-dashboard/SwimlaneDashboard';
import { store } from './stores/root';
import { Provider } from 'react-redux'


function App() {
  return (
    <div>
      <header></header>
      <main>
        <Provider store={store}>
          <SwimlaneDashboard />
        </Provider>
      </main>
    </div>
  );
}

export default App;
