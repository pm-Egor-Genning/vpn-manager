import { Provider } from 'react-redux';
import React from 'react';
import './App.css';
import { OverlayDialog } from './OverlayDialog';
import { store } from './root';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './Home';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <div id="dialog-container"/>
        <Router>
          <Route exact path="/" component={Home}/>
          <Route path="/add" component={OverlayDialog}/>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
