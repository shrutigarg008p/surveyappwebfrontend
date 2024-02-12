import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Paper,
    Divider
} from '@material-ui/core';
import { Assets } from 'enums';
import ResponsiveIframe from './ResponsiveIframe';
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

function PrivacyPolicyHi() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6">गोपनीयता नीति</Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" className={classes.content}>
                <Paper className={classes.paper}>
                    <img alt="Logo" src={Assets.Logo2} className={classes.logo} />
                    <Typography variant="h4" gutterBottom>
                        गोपनीयता नीति
                    </Typography>
                    <Divider />
                    <ResponsiveIframe url="https://onedrive.live.com/embed?resid=CAE33E44DD3C57EE%2153598&authkey=!ABLr7KO9zDbsdRs&em=2" />
                </Paper>
            </Container>
        </div>
    );
}

export default PrivacyPolicyHi;
