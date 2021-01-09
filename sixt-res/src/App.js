import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Availability from './pages/Availability.js'
import AvailabilityDetails from './pages/AvailabilityDetails.js'
import Aromanize from "aromanize/base"


export default function App() {
  return (
    <>
    <div>{Aromanize.hangulToLatin('희주')}</div>
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
