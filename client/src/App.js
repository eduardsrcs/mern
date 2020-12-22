import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import 'materialize-css'
import { useRoutes } from './routes';

function App() {
  const routes = useRoutes(false)
  return (
    <div className="container">
      <Router>
        {routes}
      </Router>
    </div>
  )
}
export default App;
