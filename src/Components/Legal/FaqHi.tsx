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


function FaqHi() {
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
                <Typography variant="h6">अक्सर पूछे जाने वाले प्रश्न</Typography>
            </Toolbar>
        </AppBar>
        <Container maxWidth="lg" className={classes.content}>
            <Paper className={classes.paper}>
                <img alt="Logo" src={Assets.Logo2} className={classes.logo} />
                <Typography variant="h4" gutterBottom>
                    अक्सर पूछे जाने वाले प्रश्न
                </Typography>
                <ResponsiveIframe url="https://onedrive.live.com/embed?resid=D3E7C876FD6A52A1%21126&authkey=!AP6AT9Uy4UNyZ8s&em=2"/>
            </Paper>

        </Container>
    </div>

    );
}

export default FaqHi;
