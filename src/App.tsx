import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './sass/Main.scss';
import {connect} from "react-redux";
import NetworkDetector from "./Layout/NetworkDetector";
import Admin from "./Layout/Admin";
import {PrivateRouteWithRedux} from "./PrivateRoute";
import { VerificationEmailScreensWithState} from "./Components/Auth/VerificationEmailScreen";
import {AuthRouter} from "./Components/Auth/AuthRouter";
import ResetPasswordForm from "./Components/Auth/UpdateResetPasswordForm";
import Terms from "./Components/Legal/Terms";
import Privacy from "./Components/Legal/Privacy";
import Faq from "./Components/Legal/Faq";
import Support from "./Components/Legal/Support";
import SurveyCompletedCallBackPage from "./Components/SurveyCallbackPages/SurveyCompletedCallBackPage";
import SurveyOverQuotaCallbackPage from "./Components/SurveyCallbackPages/SurveyOverQuotaCallbackPage";
import SurveyTerminatedCallbackPage from "./Components/SurveyCallbackPages/SurveyTerminatedCallbackPage";
import SurveyQualityTerminatedCallbackPage from "./Components/SurveyCallbackPages/SurveyQualityTerminatedCallbackPage";
import {LinkViewWithState} from "./Components/Referrals/LinkView";
import { requestForToken, foreGroundMessage } from './firebase';
import PartnerSurvey from "./Components/Partners/PartnerSurvey";

requestForToken();
foreGroundMessage();
class App extends React.Component<any, any> {

  render() {
    return (
      <Router basename='/'>
        <NetworkDetector />
        <Switch>
            <Route path='/surveys/completed' component={SurveyCompletedCallBackPage} />
            <Route path='/surveys/overquota' component={SurveyOverQuotaCallbackPage} />
            <Route path='/surveys/terminate' component={SurveyTerminatedCallbackPage} />
            <Route path='/surveys/qualityterminate' component={SurveyQualityTerminatedCallbackPage} />
            <Route path='/partner' component={PartnerSurvey} />
            <Route path='/referrals/view/:userId' component={LinkViewWithState} />
            <Route path="/auth" component={AuthRouter} />
            <Route path="/verify-screen" component={VerificationEmailScreensWithState} />
            {/* <Route path='/privacy-policy' component={PrivacyPolicy} /> */}
            <Route path='/terms' component={Terms} />
            <Route path='/privacy-policy' component={Privacy} />
            <Route path='/faq' component={Faq} />
            <Route path='/support' component={Support} />
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
