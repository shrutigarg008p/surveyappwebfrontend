import React from 'react';
import { Container, Card, CardHeader, Typography, CardContent, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    mainCard: {
        background: 'linear-gradient(to right, #ff7e5f, #feb47b)', // Example gradient background
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
        backgroundColor: '#eeeeee', // Grey background color
      },
    gridContainer: {
        marginTop: theme.spacing(2),
    },
    gridItem: {
        border: '1px solid #ccc', // Example border styling
        borderRadius: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2),
      },
}));

const MyRewards = () => {
    const classes = useStyles();

    return (
        <Container>
            <Card className={classes.mainCard}>
                <CardHeader
                    title="My Rewards"
                />
            </Card>
            <Card className={classes.nestedCard}>
      <CardContent>
        
        <Grid container spacing={2} className={classes.gridContainer}>
          
          <Grid item xs={6} sm={3} className={classes.gridItem}>
            <Typography variant="h4">0</Typography>
            <Typography variant="body1">Total Points Earn</Typography>
          </Grid>

          
          <Grid item xs={6} sm={3} className={classes.gridItem}>
            <Typography variant="h4">0</Typography>
            <Typography variant="body1">Earned via Surveys</Typography>
          </Grid>

          <Grid item xs={6} sm={3} className={classes.gridItem}>
            <Typography variant="h4">0</Typography>
            <Typography variant="body1">Earned via Sweepstakes</Typography>
          </Grid>

          <Grid item xs={6} sm={3} className={classes.gridItem}>
            <Typography variant="h4">0</Typography>
            <Typography variant="body1">Earned via Referrals</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>

            <Card className={classes.nestedCard}>
                <CardHeader
                    title="Reward Summary"
                    className={classes.cardHeader}
                />
                <CardContent>
                    <Typography variant="body1">No Reward Summary Available</Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default MyRewards;
