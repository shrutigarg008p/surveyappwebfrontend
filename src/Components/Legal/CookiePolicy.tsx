import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Paper,
} from '@material-ui/core';

import { Assets } from 'enums';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        marginBottom: theme.spacing(3),
    },
    content: {
        padding: theme.spacing(3),
        textAlign: 'left',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        maxWidth: '400px', // Adjust the maximum width as needed
    },
}));

function CookiePolicy() {
    const classes = useStyles();
    const headingStyle = { color: '#5a5a5a', fontSize: '22.5pt' };
    const subHeadingStyle = { color: '#5a5a5a', fontSize: '13pt' };
    const emphasizedStyle = {}; //{ color: '#5a5a5a', backgroundColor: '#ffff00', fontSize: '13pt' };
    const strongHeadingStyle = { color: '#5a5a5a', fontSize: '16.5pt' };
    const listStyle = { listStyleType: 'disc', color: '#5a5a5a', fontSize: '13pt' };
    return (
        <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6">Privacy Policy</Typography>
            </Toolbar>
        </AppBar>
        <Container maxWidth="lg" className={classes.content}>
            <Paper className={classes.paper}>
                <img alt="Logo" src={Assets.Logo2} className={classes.logo} />
                <Typography variant="h4" gutterBottom>
                    Cookie Policy
                </Typography>
               <div>
               <div className="c12 doc-content"><p className="c14"><span className="c15">DATAXING COOKIE NOTICE JAN 2024</span></p><h4 className="c1"><span className="c13" /></h4><h4 className="c4"><span className="c13">WHAT IS A COOKIE?</span></h4><h4 className="c1"><span className="c13" /></h4><p className="c3"><span className="c0">An HTTP/HTTPS cookie (usually just called a cookie) is a simple computer file made of text that is saved to your device using your browser, which allows sites to recognize you and store preferences and other information if you return to the site using the same device and browser. The information stored in cookies can be used to personalize the experience when using a website. A website can use cookies to find out if someone has visited a website before and record information (data) about what they did.&nbsp;</span><span className="c16"><a className="c9" href="https://simple.wikipedia.org/wiki/HTTP_cookie">See Wikipedia Definition</a></span></p><p className="c17"><span className="c0">&nbsp;</span></p><h4 className="c4"><span className="c13">WHAT COOKIES DO WE USE ON OUR SITE?</span></h4><p className="c1"><span className="c19" /></p><p className="c3"><span className="c0">Our site uses cookies to distinguish you from other users of our site and estimate visits and click-throughs for specific campaigns. This helps us to provide you with a good experience when you browse our site and also allows us to improve our site. These cookies expire when your browsing session ends. By continuing to browse the site, you are agreeing to our use of cookies.</span></p><p className="c3"><span className="c0">A cookie is a small file of letters and numbers that we store on your browser or the hard drive of your computer if you agree. Cookies contain information that is transferred to your computer's hard drive.</span></p><p className="c3"><span className="c0">For detailed information on the cookies we use and the purposes for which we use them, see our Cookie Policy below:</span></p><p className="c3 c11"><span className="c0" /></p><p className="c3"><span className="c0">We use the following cookies:&nbsp;</span></p><ul className="c10 lst-kix_list_10-0 start"><li className="c2 li-bullet-0"><span className="c5">Strictly necessary cookies.</span><span className="c0">&nbsp;These are cookies that are required for the operation of our site. They include, for example, cookies that enable you to log into secure areas of our site, use a shopping cart or make use of e-billing services.</span></li><li className="c2 li-bullet-0"><span className="c5">Analytical/performance cookies. </span><span className="c0">They allow us to recognize and count the number of visitors and to see how visitors move around our site when they are using it. This helps us to improve the way our website works, for example, by ensuring that users are finding what they are looking for easily.</span></li><li className="c2 li-bullet-0"><span className="c5">Functionality cookies.</span><span className="c0">&nbsp;</span><span className="c5">These are used to recognise you when you return to our site. This enables us to personalise our content for you, greet you by name and remember your preferences (for example, your choice of language or region).</span></li><li className="c2 li-bullet-0"><span className="c5">Targeting cookies.</span><span className="c0">&nbsp;These cookies record your visit to our site, the pages you have visited and the links you have followed. We will use this information to make our site and the advertising displayed on it more relevant to your interests. We may also share this information with third parties for this purpose.</span></li></ul><p className="c3 c11"><span className="c0" /></p><p className="c3"><span className="c0">You can find more information about the individual cookies we use and the purposes for which we use them in the table below: </span><span className="c0 c6">{'{'}</span><span className="c0 c6">THE LIST IS COPIED FROM SOME PAGE, PLEASE ADD OUR COOKIES LIST AND SOME DETAILS BELOW{'}'}</span></p><ul className="c10 lst-kix_list_10-0"><li className="c2 li-bullet-0"><span className="c0">gac</span></li><li className="c2 li-bullet-0"><span className="c0">gac_gid</span></li><li className="c2 li-bullet-0"><span className="c0">SC</span></li><li className="c2 li-bullet-0"><span className="c0">UTC</span></li><li className="c2 li-bullet-0"><span className="c0">_ga</span></li><li className="c2 li-bullet-0"><span className="c0">_gid</span></li><li className="c2 li-bullet-0"><span className="c0">NSC</span></li><li className="c2 li-bullet-0"><span className="c0">AC</span></li><li className="c2 li-bullet-0"><span className="c0">CXC</span></li><li className="c2 li-bullet-0"><span className="c0">PRC</span></li><li className="c2 li-bullet-0"><span className="c0">RVIDExtId</span></li><li className="c2 li-bullet-0"><span className="c0">TCC</span></li><li className="c2 li-bullet-0"><span className="c0">WRC</span></li><li className="c2 li-bullet-0"><span className="c0">Ratest</span></li></ul><p className="c3 c11"><span className="c0" /></p><p className="c3"><span className="c0">Please note that third parties (including, for example, advertising networks and providers of external services like web traffic analysis services) may also use cookies, over which we have no control. These cookies are likely to be analytical/performance cookies or targeting cookies.</span></p><h4 className="c1"><span className="c8" /></h4><h4 className="c4"><span className="c13">How do I change my cookie settings?</span></h4><p className="c3 c11"><span className="c7" /></p><p className="c3"><span className="c0">You block cookies by activating the setting on your browser that allows you to refuse the setting of all or some cookies. However, if you use your browser settings to block all cookies (including essential cookies) you may not be able to access all or parts of our site.</span></p><p className="c3"><span className="c0">Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit&nbsp;</span><span className="c0"><a className="c9" href="https://www.aboutcookies.org/">www.aboutcookies.org</a></span></p><p className="c3"><span className="c0">To opt out of being tracked by Google Analytics across all sites, visit&nbsp;</span><span className="c0"><a className="c9" href="https://tools.google.com/dlpage/gaoptout">http://tools.google.com/dlpage/gaoptout</a></span></p><p className="c3"><span className="c0">Except for essential cookies, all cookies will expire after 365 days.</span></p><p className="c3 c11"><span className="c0" /></p></div>

               </div>
            </Paper>
           
        </Container>
    </div>
    
    );
}

export default CookiePolicy;
