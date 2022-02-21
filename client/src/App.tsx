import React from 'react';
import MainLayout from './components/MainLayout/MainLayout';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

const Routes = () => {
  let routes = useRoutes([
    {
      path: '/',
      element:
        <MainLayout>
        </MainLayout>
    }
  ]);

  return routes;
}

const App = () => {
  return (
    <Router>
      <Routes />
    </Router>
  )

}

export default App;
