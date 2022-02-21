import React from 'react';
import MainLayout from './components/MainLayout/MainLayout';
import NewsBlock from './components/News/NewsBlock';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

const Routes = () => {
  let routes = useRoutes([
    {
      path: '/',
      element:
        <MainLayout>
          <NewsBlock />
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
