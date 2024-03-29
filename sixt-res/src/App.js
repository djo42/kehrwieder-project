// import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Availability from './pages/Availability.js'
import AvailabilityDetails from './pages/AvailabilityDetails.js'
//import Aromanize from 'aromanize/base'
import { Header, Main} from './components/Components.js'
import { slide as Menu } from 'react-burger-menu'
import { logRoles } from '@testing-library/react'
import logo from "./files/logo.png"

export default function App() {
  console.log(JSON.parse(process.env.REACT_APP_PRODUCTS))
  return (
    <>
      {/* <div>{Aromanize.hangulToLatin('희주')}</div> */}
      <Header>
        <Menu width={280}>
          <a id="home" className="menu-item" href="/">
            Home
          </a>
          <a id="availability" className="menu-item" href="/availability">
            Create Offer
          </a>
        </Menu>
        <img src={logo} className="logo"/>               
      </Header>
      <Router>
          <Main>
            <Switch>
              <Route path="/availability">
                <Availability />
              </Route>
              <Route path="/availabilitydetails/:avrw">
                <AvailabilityDetails />
              </Route>
            </Switch>
          </Main>
      </Router>
    </>
  )
}
