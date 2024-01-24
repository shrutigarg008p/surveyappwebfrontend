import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';

export function Footer() {
  return (
    <footer className="footer-main">
      <div className="footer">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-md-6">
              <div className="contacts">
                <h3>IndiaPolls PANEL</h3>
                <ul>
                  <li>
                    <FontAwesomeIcon
                      icon={['fas', 'globe']}
                    />
                    <span>
                      Noida, Block E, <br />
                      India
                    </span>
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={['fas', 'phone']}
                    />
                    +1 123-45-678
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={['fas', 'envelope']}
                    />
                    IndiaPolls@gmail.com
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-3">
              <div className="navigations">
                <h3>Navigations</h3>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/#">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq">
                      FAQs Page
                    </Link>
                  </li>
                  <li>
                    <Link to="/#">
                      Checkout
                    </Link>
                  </li>
                  <li>
                    <Link to="/#">
                      Contact
                    </Link>
                  </li>
                  <li className="">
                    <Link to="/#">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-3">
              <div className="help">
                <h3>Help</h3>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/#">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link to="/#">
                      Live Chat
                    </Link>
                  </li>
                  <li>
                    <Link to="/#">Mail Us</Link>
                  </li>
                  <li>
                    <Link to="/#">Contact</Link>
                  </li>
                  <li>
                    <Link to="/#">Blog</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copy-rights">
        <p className="mb-0 text-a-d-4">
          © 2022 IndiaPolls.
          Version
          {' '}
          {process.env.REACT_APP_VERSION}
          .
        </p>
      </div>
    </footer>
  );
}
