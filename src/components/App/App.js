import React from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css';
import AuthRoutes from '../Routes/AuthRoutes';
import WebRoutes from '../Routes/WebRoutes';

const App = () => {

  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
      <div className="wrapper">
        <HashRouter>
          <Switch>            
            {isLoggedIn ? <WebRoutes/> : <AuthRoutes/>}
          </Switch>
        </HashRouter>
      </div>
  );
}

export default App;