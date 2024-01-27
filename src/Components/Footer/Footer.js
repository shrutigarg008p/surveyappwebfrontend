/*eslint-disable*/
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";
import {connect} from "react-redux";

const useStyles = makeStyles(styles);

function Footer(props) {
  console.log('proooo--->', props)
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            {props.language === 'hi' ?
                <ListItem className={classes.inlineBlock}>
                  <a href="/#/faq-hi" className={classes.block} style={{fontSize : '15px'}}>
                    अक्सर पूछे जाने वाले प्रश्न
                  </a>
                </ListItem>
                :
                <ListItem className={classes.inlineBlock}>
                  <a href="/#/faq" className={classes.block} style={{fontSize : '15px'}}>
                    FAQ
                  </a>
                </ListItem>
            }

            {/*<ListItem className={classes.inlineBlock}>*/}
            {/*  <a href="#company" className={classes.block}>*/}
            {/*    Company*/}
            {/*  </a>*/}
            {/*</ListItem>*/}
            {/*<ListItem className={classes.inlineBlock}>*/}
            {/*  <a href="#portfolio" className={classes.block}>*/}
            {/*    Portfolio*/}
            {/*  </a>*/}
            {/*</ListItem>*/}
            {/*<ListItem className={classes.inlineBlock}>*/}
            {/*  <a href="#blog" className={classes.block}>*/}
            {/*    Blog*/}
            {/*  </a>*/}
            {/*</ListItem>*/}
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
              IndiaPolls
          </span>
        </p>
      </div>
    </footer>
  );
}


function mapStateToProps(state) {
  return {
    userId: state.adminUser.adminUser.userId,
    role: state.adminUser.adminUser.role,
    language: state.adminUser.adminUser.language,
  };
}

export default connect(mapStateToProps)(Footer);
