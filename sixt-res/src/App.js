import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Availability from './pages/Availability.js'

export default function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Switch>
            <Route path="/availability">
              <Availability />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}
