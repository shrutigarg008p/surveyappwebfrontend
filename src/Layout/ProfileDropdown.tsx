import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router';

import { OverlayMenu } from "../Shared";
import {connect} from "react-redux";

type State = {
  formType: string | null,
};

type Props = {
  history: {
    push: (url: string) => void,
  },
  fullName: string,
  id: string | null,

  showForm?: () => void,
  authLogout?: () => void,
  showChangePasswordForm?: () => void,
};

class ProfileDropdown extends React.Component<Props, State> {
  static defaultProps = {
    fullName: 'Jitendra',
  };

  userDetails(userId) {
    return this.props.history.push(`/users/${userId}`);
  }

  render() {
    const profileToggle = (
      <span className="btn btn-secondary text-white">
        <span className="d-none d-sm-none d-md-none d-lg-inline d-xl-inline">
          {this.props.fullName.split(' ')[0] }
        </span>
        <FontAwesomeIcon icon={['fas', 'caret-down']} className="ml-2" />
      </span>
    );
    return (
      <>
        <OverlayMenu toggle={profileToggle} className="navbar-items poppins">
          <ListGroup variant="flush" className="rounded-lg">
            <ListGroup.Item
              className="header-menu-item poppins"
              onClick={() => this.userDetails(this.props.id)}
            >
              {this.props.fullName}
            </ListGroup.Item>
            <ListGroup.Item
              className="header-menu-item poppins"
            >
             Edit
            </ListGroup.Item>
            <ListGroup.Item
              className="header-menu-item poppins"
            >
             Change Password
            </ListGroup.Item>
            <ListGroup.Item
              className="header-menu-item poppins"
              onClick={this.props.authLogout}
              action
            >
             Logout
            </ListGroup.Item>
          </ListGroup>
        </OverlayMenu>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  // fullName: state.user.user.fullName,
  // pictureUrl: state.user.user.pictureUrl,
  // id: state.user.user.id,
});

const ProfileDropdownWithState = withRouter<any, any>(connect(
    mapStateToProps ,
)(ProfileDropdown));

export { ProfileDropdownWithState };
