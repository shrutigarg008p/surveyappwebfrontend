import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { BodyLayout, NavbarDefault, SideMenu } from '../../Layout';
import { PageNotFound } from '../../Shared';
import { DocumentTitle } from '../../Shared/';
import {List} from "./List";

export function RedemptionRouter() {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}/list`}>
                <DocumentTitle title="Redemption | Admin Panel" />
                <BodyLayout
                    navbarItems={<NavbarDefault />}
                    sideMenuItems={<SideMenu />}
                >
                <List />
                </BodyLayout>
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
