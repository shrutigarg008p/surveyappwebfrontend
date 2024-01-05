import React from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {authRegistration} from "../Auth/auth.actions";

class LinkView extends React.Component<any, any> {
    componentDidMount() {
        const { match } = this.props;
        const userId = match.params.userId;
        const queryParams = {
            referralId: userId,
        };
        const queryString = Object.keys(queryParams)
            .map(key => `${key}=${encodeURIComponent(queryParams[key])}`)
            .join('&');
        const loginUrl = `/auth/signup?${queryString}`;
        if(!this.props.isAuth && userId) {
            this.props.history.push(loginUrl);
        } else {
            window.location.href = `/`;
        }
    }

    render() {
        return (
            <div>
                <p></p>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isAuth: state.adminUser.adminUser.isAuthenticated,
        token: state.adminUser.adminUser.token,
        isLoading: state.adminUser.adminUser.loading,
        error: state.adminUser.adminUser.error,
    };
};

const LinkViewWithState = withRouter(connect(mapStateToProps)(LinkView));

export {
    LinkView,
    LinkViewWithState,
};
