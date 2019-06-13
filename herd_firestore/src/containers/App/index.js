import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Route
} from 'react-router-dom';
import LandingPage from '../../components/Landing';
import SignUpPage from '../../components/SignUp';
import SignInPage from '../../components/SignIn';
import PasswordForgetPage from '../../components/PasswordForget';
import HomePage from '../../components/Home';
import AccountPage from '../../components/Account';
import AdminPage from '../../components/Admin';
import Navigation from '../../components/Navigation'
import { withFirebase } from '../../components/Firebase';

import * as ROUTES from '../../constants/routes';

function App(props) {
  
  const [appAuthUser, setAuthUser] = useState(null);

  useEffect(() => {
    props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? setAuthUser(authUser)
        : setAuthUser(null);
    })
  })

  return(
    <Router>
      <div>
        <Navigation authUser={appAuthUser} />

        <hr />

        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
      </div>
    </Router>
  )
};

export default withFirebase(App);