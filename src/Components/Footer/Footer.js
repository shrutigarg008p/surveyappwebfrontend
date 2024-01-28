/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";
import { connect }  from "react-redux";
const useStyles = makeStyles(styles);

function Footer(props) {
  const classes = useStyles();
  const link = props.language === 'hi' ? '/#/faq-hi' : '/#/faq' ;
  return (
    <footer className={`${classes.stickyFooter}`}>
    <div className={classes.container}>
        <strong><a href={link} className={classes.link}>
          { props.language === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'FAQ' }
        </a>
        </strong>
       {/* <span style={{'textAlign' : 'right'}}> &copy; {new Date().getFullYear()} IndiaPolls</span> */}
    </div>
  </footer>
  
  );
}

const mapStateToProps = (state) => {
  return {
      userId: state.adminUser.adminUser.userId,
      language: state.adminUser.adminUser.language,
  };
};

export default connect(mapStateToProps)(Footer);