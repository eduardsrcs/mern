import React from 'react'
import 'materialize-css'
import { useRoutes } from './routes';

function App() {
  const routes = useRoutes()
  return (
    <div className="container">
      <h1>Hello client!!!</h1>
    </div>
  )
}
export default App;
