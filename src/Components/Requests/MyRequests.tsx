import React from 'react';
import { Container, Card, CardHeader, Typography, CardContent, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    mainCard: {
        background: 'linear-gradient(to right, #4CAF50, #87C438)',
        padding: theme.spacing(1),
        marginBottom: theme.spacing(3),
        borderRadius: theme.spacing(1),
    },
    nestedCard: {
        background: '#ffffff',
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),
        marginBottom: theme.spacing(3),
    },
    cardHeader: {
        backgroundColor: '#eeeeee', 
      },
    gridContainer: {
        marginTop: theme.spacing(2),
    },
    gridItem: {
        border: '1px solid #ccc', 
        borderRadius: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2),
      },
}));

const MyRequests = () => {
    const classes = useStyles();

    return (
        <Container>
            <Card className={classes.mainCard}>
                <CardHeader
                    title="My Requests"
                />
            </Card>
            <Card className={classes.nestedCard}>
      <CardContent>
        
        <Grid container spacing={2} className={classes.gridContainer}>
          
          <Grid item xs={6} sm={3} className={classes.gridItem}>
            <Typography variant="h4">0</Typography>
            <Typography variant="body1"> Points Earn</Typography>
          </Grid>

          
          <Grid item xs={6} sm={3} className={classes.gridItem}>
            <Typography variant="h4">0</Typography>
            <Typography variant="body1">Points Redeemed</Typography>
          </Grid>

          <Grid item xs={6} sm={3} className={classes.gridItem}>
            <Typography variant="h4">0</Typography>
            <Typography variant="body1">Pending Redemptions </Typography>
          </Grid>

          <Grid item xs={6} sm={3} className={classes.gridItem}>
            <Typography variant="h4">0</Typography>
            <Typography variant="body1">Points Left</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>

            <Card className={classes.nestedCard}>
                <CardHeader
                    title="Redemptions Request Summary"
                    className={classes.cardHeader}
                />
                <CardContent>
                    <Typography variant="body1">No Redemptions Request are available for you</Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default MyRequests;
