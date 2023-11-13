import React from 'react';
import { Nav } from 'react-bootstrap';
import { withRouter } from 'react-router';

import {
  ProfileDropdownWithState,
} from 'Layout';

type State = {
};

type Props = {
  hideCategories?: boolean,
};

class NavbarDefault extends React.Component<Props, State> {
  static defaultProps = {
    hideCategories: false,
  };


  render() {
    return (
      <div className="nav-top">
        <Nav>
          <Nav.Link className="py-0 pr-0">
            <ProfileDropdownWithState />
          </Nav.Link>
        </Nav>
      </div>
    );
  }
}


export { NavbarDefault };
