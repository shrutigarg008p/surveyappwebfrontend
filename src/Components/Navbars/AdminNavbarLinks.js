import React, {useEffect, useState} from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import Person from "@material-ui/icons/Person";
import Button from "../../Components/CustomButtons/Button.js";
import styles from "../../assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { useHistory } from 'react-router-dom';
import {Notifications} from "@material-ui/icons";
import {connect} from "react-redux";
import {PageStatus} from "../../enums";
import {AuthAPI, SurveysAPI} from "../../API";
import { menuDict } from "Languages/ProfileTranslations.js";
const useStyles = makeStyles(styles);

function AdminNavbarLinks(props) {
  const history = useHistory();
  const classes = useStyles();
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(PageStatus.None);
  const [error, setError] = useState('');
  const lang = props.language;

  useEffect(() => {
    const fetchData = async () => {
      try {
        Promise.resolve()
            .then(() => setStatus(PageStatus.Loading))
            .then(() => AuthAPI.userNotifications(rest.userId))
            .then((response) => {
              console.log('response--->', response)
              if(response) {
                setData(response)
                setStatus(PageStatus.Loaded)
              }
            })
            .catch((error) => {
              setStatus(PageStatus.Error)
              setError(error.message)
            });
      } catch (error) {
        setError(error);
      } finally {
        setStatus(PageStatus.Loaded);
      }
    };

    fetchData();
  }, []);


  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };

  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };

  const handleCloseProfile = () => {
    localStorage.clear();
    window.location.href = '/';
    setOpenProfile(null);
  };

  const handleClickSettings = () => {
    history.push('/panelist/settings')
    setOpenProfile(null);
  }

  const handleClickProfiles = () => {
    history.push('/panelist/profile-overview')
    setOpenProfile(null);
  }

  return (
    <div>
      {/*<div className={classes.searchWrapper}>*/}
      {/*  <CustomInput*/}
      {/*    formControlProps={{*/}
      {/*      className: classes.margin + " " + classes.search,*/}
      {/*    }}*/}
      {/*    inputProps={{*/}
      {/*      placeholder: "Search",*/}
      {/*      inputProps: {*/}
      {/*        "aria-label": "Search",*/}
      {/*      },*/}
      {/*    }}*/}
      {/*  />*/}
      {/*  <Button color="white" aria-label="edit" justIcon round>*/}
      {/*    <Search />*/}
      {/*  </Button>*/}
      {/*</div>*/}
      {/*<Button*/}
      {/*  color={window.innerWidth > 959 ? "transparent" : "white"}*/}
      {/*  justIcon={window.innerWidth > 959}*/}
      {/*  simple={!(window.innerWidth > 959)}*/}
      {/*  aria-label="Dashboard"*/}
      {/*  className={classes.buttonLink}*/}
      {/*>*/}
      {/*  <Dashboard className={classes.icons} />*/}
      {/*  <Hidden mdUp implementation="css">*/}
      {/*    <p className={classes.linkText}>Dashboard</p>*/}
      {/*  </Hidden>*/}
      {/*</Button>*/}
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openNotification ? "notification-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={classes.buttonLink}
        >
          <Notifications className={classes.icons} />
          <span className={classes.notifications}>{data.length}</span>
          <Hidden mdUp implementation="css">
            <p onClick={handleCloseNotification} className={classes.linkText}>
              Notification
            </p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openNotification }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    {data && data.length > 0 ? data.map((info, index) => (
                    <MenuItem
                      key={info.id}
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      {info.message}
                    </MenuItem>
                    )) : ''}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
    <ClickAwayListener>
        <MenuList role="menu">
            <MenuItem
                onClick={() => handleClickProfiles()}
                className={classes.dropdownItem}
            >
                {menuDict[lang]["Profile"] || "Profile"}
            </MenuItem>
            <MenuItem
                onClick={() => handleClickSettings()}
                className={classes.dropdownItem}
            >
                {menuDict[lang]["Settings"] || "Settings"}
            </MenuItem>
            <Divider light />
            <MenuItem
                onClick={() => handleCloseProfile()}
                className={classes.dropdownItem}
            >
                {menuDict[lang]["Logout"] || "Logout"}
            </MenuItem>
        </MenuList>
    </ClickAwayListener>
</Paper>

            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userId: state.adminUser.adminUser.userId,
    role: state.adminUser.adminUser.role,
    language: state.adminUser.adminUser.language,
  };
}

export default connect(mapStateToProps)(AdminNavbarLinks);
