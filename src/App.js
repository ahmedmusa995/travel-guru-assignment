import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PlaceData } from './assets/PlaceData/PlaceData';
import Booking from './Components/booking/Booking';
import Destination from './Components/Destination/Destination';
import Home from './Components/Home/Home';
import Login from './Components/login/Login';
import NotFound from './Components/NotFound/NotFound';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import './assets/fontAwesomeIcons/FontAwesomeIcons'
import News from './Components/NavigationLinks/News';
import Destiny from './Components/NavigationLinks/Destiny';
import Blog from './Components/NavigationLinks/Blog';
import Contacts from './Components/NavigationLinks/Contacts';

export const placeContext = createContext();
export const userContext = createContext();


function App() {
  const [place, setPlace] = useState(PlaceData[0]);
  const [signedUser, setSignedUser] = useState({});


  return (
    <placeContext.Provider value={[place, setPlace]}>
      <userContext.Provider value={[signedUser, setSignedUser]}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/destination/:targetPlace">
              <Booking />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/destination-details/:targetPlace">
              <Destination />
            </PrivateRoute>
            <Route path="/news">
              <News />
            </Route>
            <Route path="/destiny">
              <Destiny />
            </Route>
            <Route path="/blog">
              <Blog />
            </Route>
            <Route path="/contact">
              <Contacts />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </userContext.Provider>
    </placeContext.Provider >
  );
}

export default App;
