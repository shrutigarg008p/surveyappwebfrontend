import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import './sass/Main.scss';

import {connect} from "react-redux";

import NetworkDetector from "./Layout/NetworkDetector";
import Admin from "./Layout/Admin";
import {PrivateRouteWithRedux} from "./PrivateRoute";
import {VerificationEmailScreens} from "./Components/Auth/VerificationEmailScreen";
import {AuthRouter} from "./Components/Auth/AuthRouter";
import {RedemptionRouter} from "./Components/Redemptions";
import PrivacyPolicy from "./Components/PrivacyPolicy/privacyPolicy";
import ResetPasswordForm from "./Components/Auth/UpdateResetPasswordForm";
import Terms from "./Components/Legal/Terms";
class App extends React.Component<any, any> {

  render() {
    return (
      <Router basename='/'>
        <NetworkDetector />
        <Switch>
            <Route path="/auth" component={AuthRouter} />
            <Route path="/verify-screen" component={VerificationEmailScreens} />
            <Route path='/privacy-policy' component={PrivacyPolicy} />
            <Route path='/terms' component={Terms} />
            <Route path='/reset-password/:token' component={ResetPasswordForm} />

            <PrivateRouteWithRedux path="/admin" component={Admin} />
            <PrivateRouteWithRedux path="/" component={Admin} />
        </Switch>
      </Router>
    );
  }
}

const AppWithState = connect(null)(App);

export { AppWithState as App }
