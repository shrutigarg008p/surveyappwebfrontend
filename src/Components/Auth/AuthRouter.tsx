import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { BodyLayout, NavbarDefault, SideMenu } from '../../Layout';
import { PageNotFound } from '../../Shared';
import { LoginWithState } from './Login';
import { DocumentTitle } from '../../Shared/';
import { RegistrationWithState} from "./Registration";
import {BasicProfile} from "./BasicProfile";
import {VerifyOtpWithState} from "./VerifyOtp";
import {VerifyEmailWithState} from "./VerifyEmail";

export function AuthRouter() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/login`}>
        <DocumentTitle title="Login | Admin Panel" />
        <LoginWithState />
      </Route>

        <Route exact path={`${path}/signup`}>
            <DocumentTitle title="Login | Admin Panel" />
            <RegistrationWithState />
        </Route>

        <Route exact path={`${path}/confirmed-email`}>
            <DocumentTitle title="Login | Admin Panel" />
            <VerifyEmailWithState />
        </Route>

        <Route exact path={`${path}/basic-profile`}>
            <DocumentTitle title="Profile | Admin Panel" />
            <BasicProfile />
        </Route>

        <Route exact path={`${path}/verify-mobile`}>
            <DocumentTitle title="Verify | Admin Panel" />
            <VerifyOtpWithState />
        </Route>

      <Route>
        <DocumentTitle title="404 Page Not Found | Admin Panel" />
        <BodyLayout
          navbarItems={<NavbarDefault />}
          sideMenuItems={<SideMenu />}
        >
          <PageNotFound />
        </BodyLayout>
      </Route>
    </Switch>
  );
}
