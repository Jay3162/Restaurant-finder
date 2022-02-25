import { React } from 'react'
import logo from './logo.svg';
import './App.css';
import { LandingPage } from './landingPage/landingPage'
import { Switch, Route } from 'react-router-dom'
import { Map } from './map/map'
import { Search } from './search/search'



function App() {
  return (
    <Switch>
      <Route path='/search' component={Search}/>
      <Route path='/' component={LandingPage}/>
      <Route path='/map' component={Map}/>
    </Switch>

      

  );
}

export default App;
