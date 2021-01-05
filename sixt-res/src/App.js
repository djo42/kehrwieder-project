import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Availability from './pages/Availability.js'
import AvailabilityDetails from './pages/AvailabilityDetails.js'


export default function App() {
  return (
    <>
    <div>Welcome to the world of Sixt. We hope you will find the rental car of your dreams.</div>
    <Router>
      <div className="App">
        <main>
          <Switch>
            <Route path="/availability">
              <Availability />
            </Route>
            <Route path="/availabilitydetails/:avrw">
              <AvailabilityDetails />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
    </>
  )
}
