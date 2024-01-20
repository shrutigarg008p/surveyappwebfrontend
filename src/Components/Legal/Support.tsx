import React from 'react';
// import { makeStyles } from '@material-ui/styles';
import { Box, Link, Card, CardContent } from '@material-ui/core';
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
    // card: {
    //     marginBottom: 16, // Adjust the margin as needed
    // },
}));


function ContactUs() {
    const classes = useStyles();
    const address = "123 Main Street, Anytown, AT 12345";
    const email = "contact@example.com";
    const mapSrc = "https://www.google.com/maps/embed?..."; // Your Google Maps embed link

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6"> Support</Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" className={classes.content}>
                <Paper className={classes.paper}>
                    <img alt="Logo" src={Assets.Logo2} className={classes.logo} />
                    <Typography variant="h4" gutterBottom>
                        Support
                    </Typography>
                    {/* <Typography variant="h6">Address:</Typography>
                    <Typography>{address}</Typography> */}
                    <p>For any assistance or support queries, our dedicated team is here to help you. Please feel free to reach out to us anytime, and we'll ensure a swift and helpful response.</p>
                    <Typography variant="h6">Email:</Typography>
                    <Link href={`mailto:${email}`}>{email}</Link>

                    {/* <Typography variant="h6">Find Us:</Typography>
                            <Box>
                                <iframe
                                    src={mapSrc}
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                            </Box> */}
                </Paper>
            </Container>
        </div>
    );
}

export default ContactUs;
