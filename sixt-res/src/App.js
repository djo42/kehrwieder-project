//import logo from './logo.svg'
import './App.css'
import { getVehicles } from './services'

function App() {
  let abfrage
  let piclink = ''
  /*   ;(

    return display(abfrage)
  })()

  function display(result) {


    const link = result[0]['ImageUrl']

    console.log(link) */

  //console.log(link)

  //const link =

  ;(async () => {
    abfrage = await getVehicles()
    
    piclink = abfrage.Result.Cars.ImageUrl

  })()

  console.log(JSON.stringify(abfrage))
  console.log(piclink)

  return (
    <div className="App">
      <header className="App-header">
        <img src={piclink} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
