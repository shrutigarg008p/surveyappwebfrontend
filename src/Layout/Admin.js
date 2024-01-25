import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../Components/Navbars/Navbar";
import Footer from "../Components/Footer/Footer.js";
import Sidebar from "../Components/Sidebar/Sidebar.js";
import routesIn from "../routes.js";
import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle.js";
import bgImage from "../assets/img/sidebar-2.jpg";
import logo from "../assets/img/logo.jpeg";
import {connect} from "react-redux";

let ps;
let role;

const switchRoutes = (role, routesIn) => (
  <Switch>
    {routesIn.map((prop, key) => {
      if (prop.layout === "/admin" && role === 'admin') {
          return (
          <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
          />
        );
        } else if(prop.layout === "/master" && role === 'admin') {
        return (
            <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
            />
        )
      } else if(prop.layout === "/panelist" && role === 'panelist') {
        return (
            <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
            />
        )
      }
    })}
    <Redirect from="/" to="/admin/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

function Admin({ ...rest }) {
  role = rest.role || 'admin'
  let routes = [];
  if (role === 'panelist') {
    routes = routesIn.filter((item) => item.layout === '/panelist' || item.type === 'panelist');
  }
  if (role === 'admin') {
    routes = routesIn.filter((item) => item.layout !== '/panelist' && item.type !== 'panelist');
  }

  const classes = useStyles();
  const mainPanel = React.createRef();
  const [image] = React.useState(bgImage);
  const [color] = React.useState("blue");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  // console.log(routes);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        // language={rest.language}
        logoText={role === 'admin' ? "IndiaPolls Admin" : "IndiaPolls"}
        logo={logo}
        image=""
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes(role, routes)}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes(role, routes)}</div>
        )}
        {getRoute() ? <Footer /> : null}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    todos: state,
    role: state.adminUser.adminUser.role,
    language: state.adminUser.adminUser.language,
  };
}

export default connect(mapStateToProps)(Admin);
