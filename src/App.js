import { React } from 'react'
import './App.css';
import { LandingPage } from './landingPage/landingPage.js'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Map } from './map/map.js'
import { Search } from './search/search.js'


function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path='/search' component={Search}/>
          <Route path='/' component={LandingPage}/>
          <Route path='/map' component={Map}/>
        </Switch>
    </BrowserRouter>


      

  );
}

export default App;
