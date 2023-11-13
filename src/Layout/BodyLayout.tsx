import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import './BodyLayout.scss';

import logoImg from '../images/logo.png';

import { Show } from './Show';
import { Footer } from './Footer';

export class BodyLayout extends React.Component<any, {
  isBarClosed: boolean,
}> {
  menuRef: any;
  menuWrapperRef: any;
  props: any;

  static propTypes: any;
  static defaultProps: any;

  constructor(props) {
    super(props);
    this.state = {
      isBarClosed: false,
    };

    this.menuRef = React.createRef();
    this.menuWrapperRef = React.createRef();
  }


  toggleBar() {
    this.setState((state) => {
      return { isBarClosed: !state.isBarClosed };
    });
  }

  render() {
    return (
      <>
        <main className="main-content">
          <div className="container-fluid">
            <div className="row">
              <Show when>
                <div className="side-panel-main">
                  <Link
                    to="/"
                    className="navbar-brand"
                  >
                    <img className="logo-img" src={logoImg} alt="" />
                    <span className="text-a-1 h4">
                      IndiaPolls
                    </span>
                  </Link>
                  <div className={'px-2 py-3'
                    + ' side-panel scroll-bar-dark-2'}
                  >
                    {this.props.sideMenuItems}
                  </div>
                </div>
                <div className="right-panel">
                  <header className="header-navbar p-0">
                    <Navbar className="py-1 py-md-0 bg-white h-70p">
                      <button
                        type="button"
                      >
                        <FontAwesomeIcon
                          icon={['fas', 'bars']}
                          className="w-25p h-25p"
                        />
                      </button>
                      <>
                        {this.props.navbarItems}
                      </>
                    </Navbar>
                  </header>
                  <div className={`${this.props.className} help_body`}>
                    {this.props.children}
                    <Show when={this.props.showFooter}>
                      <Footer />
                    </Show>
                  </div>
                </div>
              </Show>
              <Show when={!this.props.showSideMenu}>
                <div className={`${this.props.className} col-12 w-100`}>
                  {this.props.children}
                  <Show when={this.props.showFooter}>
                    <Footer />
                  </Show>
                </div>
              </Show>
            </div>
          </div>
        </main>
      </>
    );
  }
}

BodyLayout.propTypes = {
  navbarItems: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.number,
    PropTypes.elementType,
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
  sideMenuItems: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.number,
    PropTypes.elementType,
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.number,
    PropTypes.elementType,
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
  showSideMenu: PropTypes.bool,
  showFooter: PropTypes.bool,
  className: PropTypes.string,
};

BodyLayout.defaultProps = {
  showSideMenu: true,
  showFooter: true,
  className: 'p-2',
};
