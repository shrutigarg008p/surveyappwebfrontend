import React, { useState, useEffect } from 'react'
import GridContainer from '../../Components/Grid/GridContainer'
import Card from '../../Components/Card/Card'
import CardHeader from '../../Components/Card/CardHeader'
import CardBody from '../../Components/Card/CardBody'
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Card as Card2, CardHeader as CardHeader2, CardContent, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(4), 
      fontSize: '16px',
      textAlign: 'center'
    },
  }));

export default function PenalistDetails(props:any) {

const [penalistData, setPenalistData] = useState<any>([]);
const [profileData, setProfileData] = useState<any>([]);
const [error, setError] = useState<any>(false); 
useEffect(()=>{
    const { userId } = props.match.params;
    console.log(userId); 
    const url = process.env.REACT_APP_BASE_URL_API+'/api/v1/auth/user/panelistProfile/'+userId;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        setPenalistData(data);
    })
    .catch((err)=>{
        setError(true);
        console.log(err)
    }); 
    const url2 = process.env.REACT_APP_BASE_URL_API+'/api/v1/auth/user/get-user/'+userId;
    fetch(url2)
    .then(res=>res.json())
    .then(data=>{
        setProfileData(data);
    })
    .catch((err)=>{
        setError(true);
        console.log(err)
    }); 
}, []); 
 
function TopHeading() {
    return <Card>
        <CardHeader color="primary">
            <div className="d-flex align-items-center justify-content-between">
                <h4>Penalist Details</h4>
            </div>
        </CardHeader>
    </Card>
}

function BasicProfile() {
    if(!profileData.hasOwnProperty('data')) return <></>; 
    const { profile, dataValues } = profileData?.data; 
    return (
        <Card>
            <CardHeader color="info">
                <div className="d-flex align-items-center justify-content-between">
                    <h4 className="text-center">Basic Profile</h4>
                </div>
            </CardHeader>
            <CardBody>
                <div className="row">
                    <div className="col s4 center-align">
                        <div style={{ textAlign: 'center' }}>
                            <img
                                src="https://placekitten.com/200/200"
                                alt="Profile"
                                className="circle responsive-img"
                            />
                            <p className="flow-text">{profile.firstName} {profile.lastName}</p>
                        </div>
                    </div>
                    <div className="col s4">
                        <div className="row">
                            <div className="col s6">
                                <strong className="mb-3 d-block">Email:</strong>
                            </div>
                            <div className="col s6">{ dataValues.email } </div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <strong className="mb-3 d-block">Mobile:</strong>
                            </div>
                            <div className="col s6">{ dataValues.phoneNumber}</div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <strong className="mb-3 d-block">Gender:</strong>
                            </div>
                            <div className="col s6">{profile.gender}</div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <strong className="mb-3 d-block">Address Line 1:</strong>
                            </div>
                            <div className="col s6">{profile.addressLine1}</div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <strong className="mb-3 d-block">Address Line 2:</strong>
                            </div>
                            <div className="col s6">{profile.addressLine2}</div>
                        </div>
                    </div>
                    <div className="col s4">
                        <div className="row">
                            <div className="col s6">
                                <strong className="mb-3 d-block">DOB:</strong>
                            </div>
                            <div className="col s6">{profile.dateOfBirth}</div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <strong className="mb-3 d-block">Country:</strong>
                            </div>
                            <div className="col s6">{profile.country}</div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <strong className="mb-3 d-block">City:</strong>
                            </div>
                            <div className="col s6">{profile.city}</div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <strong className="mb-3 d-block">State:</strong>
                            </div>
                            <div className="col s6">{profile.state}</div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <strong className="mb-3 d-block">Pin Code:</strong>
                            </div>
                            <div className="col s6">{profile.pinCode}</div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <strong className="mb-3 d-block">Referral Source:</strong>
                            </div>
                            <div className="col s6">{profile.referralSource}</div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}


function Label() {
    const [inputValue, setInputValue] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (inputValue && inputValue !== '') {
                const newTags = inputValue.split(',').map((tag) => tag.trim());
                setTags((prevTags) => [...prevTags, ...newTags]);
                setInputValue('');
            }

        }
    };

    const handleTagCloseClick = (index) => {
        setTags((prevTags) => {
            const updatedTags = [...prevTags];
            updatedTags.splice(index, 1);
            return updatedTags;
        });
    };


    return (
        <Card>
            <CardHeader color="info">
                <div className="d-flex align-items-center justify-content-between">
                    <h4 className="text-center">Labels</h4>
                    <button className='btn btn-primary'>Assign Labels</button>
                </div>
            </CardHeader>
            <CardBody>
                <TextField
                    style={{ width: '100%' }}
                    className="form-control"
                    label="Label Name"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleInputKeyPress}
                />
                <br />
                <br />
                <div>
                    {tags.map((tag, index) => (
                        <span key={index} className="tag">
                            <Chip label={tag} onDelete={handleTagCloseClick} color="primary" />&nbsp;
                        </span>
                    ))}
                </div>
            </CardBody>
        </Card>

    )
}

function Profiles() {
    if(!penalistData.hasOwnProperty('data') || penalistData.data === null) return <></>; 
    const notCompletedStyle = { backgroundColor: '#FFFFE0', color: 'black', fontSize: '12px', marginTop: '10px' }
    // const completedStyle =  { backgroundColor: '#28a745', color: 'black', fontSize: '12px', marginTop: '10px' }
    const { profile, profilesTotalPercentage } = penalistData.data; 
    return (
        <>
            <Card>
                <CardHeader color="info">
                    <div className="d-flex align-items-center justify-content-between">
                        <h4 className="text-center">Profiles &nbsp;
                            <Chip
                                label={profilesTotalPercentage+" Completed"}
                                color="default"
                                variant="outlined"
                            />
                        </h4>
                    </div>
                </CardHeader>
                <CardBody>
                <Grid container spacing={4}>
                {
                    profile &&
                    Object.keys(profile).length > 0 &&
                    Object.keys(profile).map((value, key) => (
                    <Grid item xs={12} sm={4} key={key}>
                        <Card2>
                        <CardHeader2
                            title={value.toUpperCase()}
                            titleTypographyProps={{ style: { fontSize: '16px' } }}
                            style={{ background: '#454545', color: 'white'}}
                            action={
                            <Chip
                                label={profile[value]}
                                style={notCompletedStyle}
                            />
                            }
                        />
                        <CardContent>
                            <img
                            src={"https://picsum.photos/400/"+Math.round((140+key))} 
                            alt="Full Size Image"
                            style={{ width: '100%', height: 'auto' }}
                            />
                        </CardContent>
                        </Card2>
                    </Grid>
                    ))
                }
                </Grid>
                </CardBody>
            </Card>
        </>
    )
}

function DataGridTable(columns:any, rows:any) {
    function CustomToolbar() {
        return (
          <GridToolbarContainer>
            <GridToolbarExport />
          </GridToolbarContainer>
        );
    }  
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
      autoHeight
        rows={rows}
        columns={columns}
        checkboxSelection
        components={{
            Toolbar: CustomToolbar,
          }}
      />
    </div>
  );
}

function Surveys(){
    if(!penalistData.hasOwnProperty('data') || penalistData.data === null) return <></>; 
    const classes = useStyles();
    const {surveys} = penalistData.data; 
    return(
        <>
        <Card>
            <CardHeader color="info">
                <div className="d-flex align-items-center justify-content-between">
                    <h4 className="text-center">Surveys</h4>
                </div>
            </CardHeader>
            <CardBody>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper} elevation={3}>
                            Total Surveys : {surveys.totalCount}
                        </Paper>   
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper} elevation={3}>
                            Completed Surveys : {surveys.completedCount}
                        </Paper>   
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper} elevation={3}>
                            Incomplete Surveys: {surveys.totalCount}
                        </Paper>   
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper} elevation={3}>
                            Surveys Not Started : {surveys.totalCount}
                        </Paper>   
                    </Grid>
                </Grid>
                {
                    surveys.list && surveys.list.length === 0 ?  <Typography style={{marginTop:'20px'}}>No Rewards are available for this panalist right now</Typography> : ''
                }
            </CardBody>
        </Card>
        </>
    )
}

function Rewards(){
    const classes = useStyles();
    if (!penalistData.hasOwnProperty('data') || penalistData.data === null) return <></>;
    const { rewards } = penalistData.data;
    return(
        <>
       
        <Card>
        <CardHeader color="info">
            <div className="d-flex align-items-center justify-content-between">
            <h4 className="text-center">Rewards</h4>
            </div>
        </CardHeader>
        <CardBody>
            <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
                <Paper className={classes.paper} elevation={3}>
                Total Rewards : {rewards.totalCount}
                </Paper>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Paper className={classes.paper} elevation={3}>
                Completed Rewards : {rewards.completedCount}
                </Paper>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Paper className={classes.paper} elevation={3}>
                Incomplete Rewards: {rewards.inCompletedCount}
                </Paper>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Paper className={classes.paper} elevation={3}>
                Incomplete Rewards: {rewards.notStartedCount}
                </Paper>
            </Grid>
            </Grid>
            {
                rewards.list && rewards.list.length === 0 ?  <Typography style={{marginTop:'20px'}}>No Rewards are available for this panalist right now</Typography> : ''
            }
        </CardBody>
        </Card>
        </>
    )
}

function Referrals(){
    const classes = useStyles();
    if (!penalistData.hasOwnProperty('data') || penalistData.data === null) return <></>;
    const { referrals } = penalistData.data;
    return(
        <>
        <Card>
            <CardHeader color="info">
                <div className="d-flex align-items-center justify-content-between">
                    <h4 className="text-center">Referrals</h4>
                </div>
            </CardHeader>
            <CardBody>
                <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper} elevation={3}>
                            Total Referrals : {referrals.totalCount}
                        </Paper>   
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper} elevation={3}>
                            Completed Referrals : {referrals.completedCount}
                        </Paper>   
                    </Grid>
                </Grid>
                {
                    referrals.list && referrals.list.length === 0 ?  <Typography style={{marginTop:'20px'}}>No Rewards are available for this panalist right now</Typography> : ''
                }
            </CardBody>
        </Card>
        </>
    )
}

function Redemptions(){
    const classes = useStyles();
    if (!penalistData.hasOwnProperty('data') || penalistData.data === null) return <></>;
    const { redemption } = penalistData.data;
    return(
        <>
        <Card>
            <CardHeader color="info">
                <div className="d-flex align-items-center justify-content-between">
                    <h4 className="text-center">Redemptions</h4>
                </div>
            </CardHeader>
            <CardBody>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper} elevation={3}>
                            Total Redemptions :  {redemption.completedCount}
                        </Paper>   
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper} elevation={3}>
                            Completed Redemptions :  {redemption.completedCount}
                        </Paper>   
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper} elevation={3}>
                            Incomplete Redemptions:  {redemption.completedCount}
                        </Paper>   
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper} elevation={3}>
                            Redemptions Not Started : {redemption.completedCount}
                        </Paper>   
                    </Grid>
                </Grid>
                {
                    redemption.list && redemption.list.length === 0 ?  <Typography style={{marginTop:'20px'}}>No Rewards are available for this panalist right now</Typography> : ''
                }
               
            </CardBody>
        </Card>
        </>
    )
}

function Loading(){
    if(error) return <>Something went wrong, and data could not be fetched</> 
    return(
        <>
        Please wait
        </>
    )
}   
     if (!penalistData.hasOwnProperty('data') || penalistData.data === null) return <>
     <TopHeading />
     No Penalist Found
     </>;
    return (
        <>
            <GridContainer>
                <TopHeading />
                {
                    penalistData.length === 0  && profileData.length === 0 ? <Loading/> : 
                    <React.Fragment>
                        <BasicProfile/>
                        <Label />
                        <Profiles />
                        <Surveys/>
                        <Rewards/>
                        <Referrals/>
                        <Redemptions/>
                    </React.Fragment>
                }
                
            </GridContainer>
        </>
    )
}
