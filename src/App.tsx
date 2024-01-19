import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './sass/Main.scss';
import {connect} from "react-redux";
import NetworkDetector from "./Layout/NetworkDetector";
import Admin from "./Layout/Admin";
import {PrivateRouteWithRedux} from "./PrivateRoute";
import {VerificationEmailScreens} from "./Components/Auth/VerificationEmailScreen";
import {AuthRouter} from "./Components/Auth/AuthRouter";
import PrivacyPolicy from "./Components/PrivacyPolicy/privacyPolicy";
import ResetPasswordForm from "./Components/Auth/UpdateResetPasswordForm";
import Terms from "./Components/Legal/Terms";
import SurveyCompletedCallBackPage from "./Components/SurveyCallbackPages/SurveyCompletedCallBackPage";
import SurveyOverQuotaCallbackPage from "./Components/SurveyCallbackPages/SurveyOverQuotaCallbackPage";
import SurveyTerminatedCallbackPage from "./Components/SurveyCallbackPages/SurveyTerminatedCallbackPage";
import SurveyQualityTerminatedCallbackPage from "./Components/SurveyCallbackPages/SurveyQualityTerminatedCallbackPage";
import {LinkViewWithState} from "./Components/Referrals/LinkView";
import { requestForToken, foreGroundMessage } from './firebase';
import PartnerSurvey from "./Components/Partners/PartnerSurvey";
import VerifyOtp from "./Components/Auth/VerifyOtp";

requestForToken();
foreGroundMessage();
class App extends React.Component<any, any> {

  render() {
    return (
      <Router basename='/'>
        <NetworkDetector />
        <Switch>
            <Route path='/surveys/:surveyId/:userId/completed' component={SurveyCompletedCallBackPage} />
            <Route path='/surveys/:surveyId/:userId/overquota' component={SurveyOverQuotaCallbackPage} />
            <Route path='/surveys/:surveyId/:userId/terminate' component={SurveyTerminatedCallbackPage} />
            <Route path='/surveys/:surveyId/:userId/qualityterminate' component={SurveyQualityTerminatedCallbackPage} />
            <Route path='/partner' component={PartnerSurvey} />
            <Route path='/referrals/view/:userId' component={LinkViewWithState} />
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
