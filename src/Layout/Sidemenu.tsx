import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import * as PropTypes from 'prop-types';

import { Show } from './Show';

import { SIDE_MENU_ITEMS } from 'enums';

export function SideMenu(props) {
  const sideMenuLink = (title, svgName, link, itemName) => {
    return (
      <div className="p-0">
        <Link className="nav-list" to={link}>
          <FontAwesomeIcon icon={['fas', svgName]} className="mr-3" />
          <span>
            {title}
          </span>
          <FontAwesomeIcon icon={['fas', 'angle-down']} className="mr-2" />
        </Link>
        <Show when={itemName === props.itemName}>
          <div className="collapse-menu">
            {props.children}
          </div>
        </Show>
      </div>
    );
  };

  return (
    <>
      <div className="font-weight-bold h6 text-info">Main</div>
      {sideMenuLink(
        'More',
        'plus-circle',
        '/more',
        SIDE_MENU_ITEMS.MORE,
      )}
    </>
  );
}

SideMenu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
    PropTypes.elementType,
  ]),
  itemName: PropTypes.string,
};

SideMenu.defaultProps = {
  itemName: '',
  children: null,
};
