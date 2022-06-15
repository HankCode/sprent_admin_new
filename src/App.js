import React, {useState, useEffect, Suspense} from "react";
import { hot } from 'react-hot-loader/root';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from './Login';
import Navigation from './Navigation';
import Header from './Header';
import HousingRequests from './HousingRequests';
import MatchFinder from './MatchFinder'
import Landlords from './Landlords'
import BecomeAHost from './BecomeAHost'
import RequestHousing from './RequestHousing'

// loading component for suspense fallback
const Loader = () => (
  <div className="App">
    <div>loading...</div>
  </div>
)

function Page() {
  const [loggedIn, setLoggedIn] = useState(undefined); // undefined, true, false

  const authListener = () => {
    firebase
      .auth()
      .onAuthStateChanged((user) => {
        // note: This function will be called many times!
        // bang-bang returns true or false depending on if the value (user) is true:ish or false:ish
        setLoggedIn(!!user);
      });
  }

  const callback = (res) => setLoggedIn(res);

  // equivalent to componentDidMount (only called once
  // because the values inside the array in second argument wont change)
  // useEffect(attachAuthStateChangedListener, []); 
  useEffect(authListener, []); 

  if(loggedIn === undefined) {
    return <Loader />
  }

  if (!loggedIn) {
    return (
      <Login
        callback={callback}
      />
    )
  }

  return (
    <Router>
      <Header>
        <Navigation />
      </Header>
      <div className="p-5 bg-grey-200 content">
        <Switch>
          <Route exact path="/" children={<HousingRequests />} />
          <Route exact path="/landlords" children={<Landlords />} />

          <Route exact path="/become-a-host/" children={<BecomeAHost />} />
          <Route exact path="/request-housing/" children={<RequestHousing />} />

          <Route exact path="/match/:tenant/" children={<MatchFinder />} />
        </Switch>
      </div>
      <div className="foot"></div>
    </Router>
  )
}

const App = () => (
  <Suspense fallback={<Loader />}>
    <Page />
  </Suspense>
)

export default hot( App );
