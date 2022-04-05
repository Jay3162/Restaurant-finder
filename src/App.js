import { React } from 'react'
import './App.css';
import { LandingPage } from './landingPage/landingPage'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Map } from './map/map'
import { Search } from './search/search'



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
