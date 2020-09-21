import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { PlaceData } from './assets/PlaceData/PlaceData';
import Booking from './Components/booking/Booking';
import Destination from './Components/Destination/Destination';
import Home from './Components/Home/Home';
import Login from './Components/login/Login';
import NotFound from './Components/NotFound/NotFound';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import SignUp from './Components/signup/SignUp';

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
            <Route path="/destination">
              <Booking />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/destination-details">
              <Destination />
            </PrivateRoute>
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
