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
import $ from 'jquery';
import 'jquery-confirm';
import {log} from "fabric/fabric-impl";
import avatar from "../../assets/img/faces/marc1.jpg";
import {surveyDict} from "../../Languages/SurveyTranslations";
import {Show} from "../../Layout";
import moment from "moment";
import {Table} from "react-bootstrap";

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
    const [profileOverviewData, setProfileOverviewData] = useState<any>(null);
    const [error, setError] = useState<any>(false);
    const [userID, setUserID] = useState<String>('');

    useEffect(()=>{
        const { userId } = props.match.params;
        setUserID(userId);
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

        const url3 = process.env.REACT_APP_BASE_URL_API+'/api/v1/auth/user/respondentProfileOverview/'+userId;
        fetch(url3)
            .then(res=>res.json())
            .then(data=>{
                setProfileOverviewData(data.data);
            })
            .catch((err)=>{
                setError(true);
                console.log(err)
            });

    }, []);

    console.log('profileOverviewData--->', profileOverviewData)

    function TopHeading() {
        const unSubscriptionService = (dialoge, type) =>{
            const url = process.env.REACT_APP_BASE_URL_API+'/api/v1/auth/user/unSubscribeUser/'+userID;
            fetch(url, { method: 'POST' })
                .then(res=>res.json())
                .then((data)=>{
                    const url2 = process.env.REACT_APP_BASE_URL_API+'/api/v1/auth/user/get-user/'+userID;
                    fetch(url2)
                        .then(res=>res.json())
                        .then(data=>{
                            setProfileData(data);
                        })
                        .catch((err)=>{
                            setError(true);
                            console.log(err)
                        });
                    console.log(data)
                    $.alert(`You ${type} Successfully`, function(){
                        // window.location.reload();
                        dialoge.close()
                    });
                })
                .catch((err)=>{
                    $.alert("Something went wrong, please try again later");
                    console.error(err)
                })
        }
        const unsubscribe = (type) =>{
            $.confirm({
                title: 'Confirm!',
                content: `Are you sure, You want to ${type}?`,
                buttons: {
                    confirm: function () {
                        var dialoge = $.dialog({
                            title: 'Please wait..!',
                            content: `Please wait, While we ${type} you!`,
                        });
                        unSubscriptionService(dialoge, type);
                    },
                    cancel: function () {

                    }
                }
            });
        }


        const temporaryDeleted = (dialoge, type) =>{
            const url = process.env.REACT_APP_BASE_URL_API+'/api/v1/auth/user/temporaryDelete/'+userID;
            fetch(url, { method: 'POST' })
                .then(res=>res.json())
                .then((data)=>{
                    const url2 = process.env.REACT_APP_BASE_URL_API+'/api/v1/auth/user/get-user/'+userID;
                    fetch(url2)
                        .then(res=>res.json())
                        .then(data=>{
                            setProfileData(data);
                        })
                        .catch((err)=>{
                            setError(true);
                            console.log(err)
                        });
                    console.log(data)
                    $.alert(`You ${type} Successfully`, function(){
                        // window.location.reload();
                        dialoge.close()
                    });
                })
                .catch((err)=>{
                    $.alert("Something went wrong, please try again later");
                    console.error(err)
                })
        }
        const temporaryDelete = (type) =>{
            $.confirm({
                title: 'Confirm!',
                content: `Are you sure, You want to ${type}?`,
                buttons: {
                    confirm: function () {
                        var dialoge = $.dialog({
                            title: 'Please wait..!',
                            content: `Please wait, While we ${type} you!`,
                        });
                        temporaryDeleted(dialoge, type);
                    },
                    cancel: function () {

                    }
                }
            });
        }


        const permanentlyDeleted = (dialoge) =>{
            const url = process.env.REACT_APP_BASE_URL_API+'/api/v1/auth/user/permanentlyDelete/'+userID+'/admin';
            fetch(url, { method: 'POST' })
                .then(res=>res.json())
                .then((data)=>{
                    const url2 = process.env.REACT_APP_BASE_URL_API+'/api/v1/auth/user/get-user/'+userID;
                    fetch(url2)
                        .then(res=>res.json())
                        .then(data=>{
                            setProfileData(data);
                        })
                        .catch((err)=>{
                            setError(true);
                            console.log(err)
                        });
                    console.log(data)
                    $.alert(`Successfully Deleted`, function(){
                        // window.location.reload();
                        dialoge.close()
                    });
                })
                .catch((err)=>{
                    $.alert("Something went wrong, please try again later");
                    console.error(err)
                })
        }
        const permanentlyDelete = (type) =>{
            $.confirm({
                title: 'Confirm!',
                content: `Are you sure, You want to permanently delete?`,
                buttons: {
                    confirm: function () {
                        var dialoge = $.dialog({
                            title: 'Please wait..!',
                            content: `Please wait, While we permanently deleting!`,
                        });
                        permanentlyDeleted(dialoge);
                    },
                    cancel: function () {

                    }
                }
            });
        }
        const changePasswordService = (newPassword, dialoge) =>{
            const data = {
                userId: userID,
                password: newPassword
            };
            const url = process.env.REACT_APP_BASE_URL_API+'/api/v1/auth/user/change-password';
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res=>res.json())
                .then((data)=>{
                    console.log(data)
                    $.alert("Password Changed Successfully", function(){
                        // window.location.reload();
                        dialoge.close()
                    });
                })
                .catch((err)=>{
                    $.alert("Something went wrong, please try again later");
                    console.error(err)
                })
        }

        const changePassword = () =>{
            $.confirm({
                title: 'Change Password',
                content: '' +
                    '<form action="" class="changePasswordForm">' +
                    '<div class="form-group">' +
                    '<label for="newPassword">New Password:</label>' +
                    '<input type="password" id="newPassword" class="newPassword form-control" required />' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="confirmPassword">Confirm Password:</label>' +
                    '<input type="password" id="confirmPassword" class="confirmPassword form-control" required />' +
                    '</div>' +
                    '</form>',
                buttons: {
                    formSubmit: {
                        text: 'Change Password',
                        btnClass: 'btn-blue',
                        action: function (this:any) {
                            var newPassword = this.$content.find('.newPassword').val();
                            var confirmPassword = this.$content.find('.confirmPassword').val();


                            if (newPassword !== confirmPassword) {
                                $.alert('New password and confirm password do not match.');
                                return false;
                            } else {
                                var dialoge = $.dialog({
                                    title: 'Please wait..!',
                                    content: 'Please wait, While we are changing the password!',
                                });
                                changePasswordService(newPassword, dialoge);
                            }
                        }
                    },
                    cancel: function () {
                    },
                },
                onContentReady: function () {
                    var jc = this;
                    this.$content.find('.changePasswordForm').on('submit', function (e) {
                        e.preventDefault();
                        jc.$$formSubmit.trigger('click');
                    });
                }
            });
        }

        return <Card>
            <>
                <CardHeader color="primary">
                    <div className="d-flex align-items-center justify-content-between">
                        <h4>Panelist Details</h4>
                        <span className="align-items-right">
                {profileData.length !== 0 && profileData?.data.dataValues.unsubscribeDate === null ?
                    <button type="button" className="btn btn-info" onClick={() => unsubscribe('unsubscribe')}>Unubscribe </button>
                    :
                    <button type="button" className="btn btn-info" onClick={() => unsubscribe('Subscribe')}>Subscribe</button>
                }
                            <button type="button" className="btn btn-blue ml-1" onClick={changePassword}>Change Password</button>

                            {profileData.length !== 0 && profileData?.data.dataValues.deletedAt === null ?
                                <button type="button" className="btn btn-yellow ml-1" onClick={() => temporaryDelete('temporary delete')}>Temporary Delete </button>
                                :
                                <button type="button" className="btn btn-yellow ml-1" onClick={() => temporaryDelete('re-active')}>Re-Enable</button>
                            }
                            <button type="button" className="btn btn-red ml-1" onClick={permanentlyDelete}>Permanently Deleted</button>
                </span>
                    </div>
                </CardHeader>
            </>
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
                                    src={profile?.imagePath ? `${process.env.REACT_APP_BASE_URL_API}${profile?.imagePath}` : "https://e7.pngegg.com/pngimages/507/702/png-clipart-profile-icon-simple-user-icon-icons-logos-emojis-users-thumbnail.png"}
                                    alt="Profile"
                                    className="circle responsive-img"
                                    style={{ height: '250px', width: '250px' }}
                                />
                                <p className="flow-text">{profile?.firstName} {profile?.lastName}</p>
                            </div>
                        </div>
                        <div className="col s4">
                            <div className="row">
                                <div className="col s6">
                                    <strong className="mb-3 d-block">Email:</strong>
                                </div>
                                <div className="col s6">{ dataValues?.email } </div>
                            </div>
                            <div className="row">
                                <div className="col s6">
                                    <strong className="mb-3 d-block">Mobile:</strong>
                                </div>
                                <div className="col s6">{ dataValues?.phoneNumber}</div>
                            </div>
                            <div className="row">
                                <div className="col s6">
                                    <strong className="mb-3 d-block">Gender:</strong>
                                </div>
                                <div className="col s6">{profile?.gender}</div>
                            </div>
                            <div className="row">
                                <div className="col s6">
                                    <strong className="mb-3 d-block">Address Line 1:</strong>
                                </div>
                                <div className="col s6">{profile?.addressLine1}</div>
                            </div>
                            <div className="row">
                                <div className="col s6">
                                    <strong className="mb-3 d-block">Address Line 2:</strong>
                                </div>
                                <div className="col s6">{profile?.addressLine2}</div>
                            </div>
                        </div>
                        <div className="col s4">
                            <div className="row">
                                <div className="col s6">
                                    <strong className="mb-3 d-block">DOB:</strong>
                                </div>
                                <div className="col s6">{profile?.dateOfBirth}</div>
                            </div>
                            <div className="row">
                                <div className="col s6">
                                    <strong className="mb-3 d-block">Country:</strong>
                                </div>
                                <div className="col s6">{profile?.country}</div>
                            </div>
                            <div className="row">
                                <div className="col s6">
                                    <strong className="mb-3 d-block">City:</strong>
                                </div>
                                <div className="col s6">{profile?.city}</div>
                            </div>
                            <div className="row">
                                <div className="col s6">
                                    <strong className="mb-3 d-block">State:</strong>
                                </div>
                                <div className="col s6">{profile?.state}</div>
                            </div>
                            <div className="row">
                                <div className="col s6">
                                    <strong className="mb-3 d-block">Pin Code:</strong>
                                </div>
                                <div className="col s6">{profile?.pinCode}</div>
                            </div>
                            <div className="row">
                                <div className="col s6">
                                    <strong className="mb-3 d-block">Referral Source:</strong>
                                </div>
                                <div className="col s6">{profile?.referralSource}</div>
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

        const tempTags = [...tags];
        useEffect(()=>{
            const url = process.env.REACT_APP_BASE_URL_API+ "/api/v1/labels/getAll/50"
            fetch(url)
                .then(res=>res.json())
                .then((data)=>{
                    if(data && data.status === 1 && data.hasOwnProperty('data')){
                        const allTags =  data.data.map(item=>item.name);
                        tempTags.push(...allTags);
                        setTags(tempTags);
                    }
                })
                .catch((err)=>{
                    $.alert("Something went wrong, please try again later");
                    console.error(err)
                })
        },[]);

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

        const assignLabels = () =>{

        }

        return (
            <Card>
                <CardHeader color="info">
                    <div className="d-flex align-items-center justify-content-between">
                        <h4 className="text-center">Labels</h4>
                        <button className='btn btn-primary' onClick={assignLabels}>Assign Labels</button>
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
                                    label={profileOverviewData.overallAttemptedPercentage+"% Completed"}
                                    color="default"
                                    variant="outlined"
                                />
                            </h4>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Grid container spacing={5}>
                            {
                                profileOverviewData &&
                                profileOverviewData.result.map((data, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Card2>
                                            <CardHeader2
                                                title={<>
                                                    {data.name}
                                                    <Chip
                                                        label={parseInt(data.attemptedPercentage, 10) > 0 ? `${parseInt(data.attemptedPercentage, 10)}% Completed` : 'Not Started'}
                                                        style={{ marginLeft: '8px' }} // Adjust styling as needed
                                                    />
                                                </>}
                                                titleTypographyProps={{ style: { fontSize: '16px' } }}
                                                style={{ background: '#454545', color: 'white'}}
                                            />
                                            <CardContent>
                                                <img
                                                    src={`https://indiapolls.com:9000${data.image}`}
                                                    alt="Full Size Image"
                                                    style={{ width: '100%', height: '300px' }}
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
                                    Incomplete Surveys: {surveys.inCompletedCount}
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Paper className={classes.paper} elevation={3}>
                                    Surveys Not Started : {surveys.notStartedCount}
                                </Paper>
                            </Grid>
                        </Grid>
                        {/*{*/}
                        {/*    surveys.list && surveys.list.length === 0 ?  <Typography style={{marginTop:'20px'}}>No Rewards are available for this panalist right now</Typography> : ''*/}
                        {/*}*/}
                    </CardBody>


                    <div className="jumbotron bg-white p-3 border shadow-sm">
                    <Table responsive size="sm" bordered>
                        <thead>
                        <tr>
                            <th>{"S.No"}</th>
                            <th>{"Name"}</th>
                            <th>{"Status"}</th>
                            <th>{"Points"}</th>
                            <th>{"Expire Date"}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            surveys.list.map((info, index) => (
                                <Show when={info.survey}>
                                    <tr key={info.id}>
                                        <td>{index + 1}</td>
                                        <td>{info.survey ? info.survey.name : 'NA'}</td>
                                        <td>{info.status}</td>
                                        <td>{info.survey ? info.survey.ceggPoints : ''}</td>
                                        <td>{moment(info.createdAt).format('MM/DD/YYYY HH:mm A')}</td>
                                    </tr>
                                </Show>
                            ))
                        }
                        </tbody>
                    </Table>
                    </div>

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
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={4}>
                                <Paper className={classes.paper} elevation={3}>
                                    Earned By Survey : {rewards.earnedBySurvey}
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Paper className={classes.paper} elevation={3}>
                                    Earned By Referrals : {rewards.earnedByReferrals}
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Paper className={classes.paper} elevation={3}>
                                    Total Points: {rewards.totalLeftPoints}
                                </Paper>
                            </Grid>
                        </Grid>
                        {/*{*/}
                        {/*    rewards.list && rewards.list.length === 0 ?  <Typography style={{marginTop:'20px'}}>No Rewards are available for this panalist right now</Typography> : ''*/}
                        {/*}*/}
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
                                    Completed Referrals : {referrals.approvedCount}
                                </Paper>
                            </Grid>
                        </Grid>
                        {/*{*/}
                        {/*    referrals.list && referrals.list.length === 0 ?  <Typography style={{marginTop:'20px'}}>No Rewards are available for this panalist right now</Typography> : ''*/}
                        {/*}*/}
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
                                    Total Earned : {redemption.totalEarned}
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Paper className={classes.paper} elevation={3}>
                                    Completed Redeemed :  {redemption.totalRedeemed}
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Paper className={classes.paper} elevation={3}>
                                    Pending Redemptions:  {redemption.totalPendingRedeemed}
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Paper className={classes.paper} elevation={3}>
                                    Total Points : {redemption.totalLeft}
                                </Paper>
                            </Grid>
                        </Grid>
                        {/*{*/}
                        {/*    redemption.list && redemption.list.length === 0 ?  <Typography style={{marginTop:'20px'}}>No Rewards are available for this panalist right now</Typography> : ''*/}
                        {/*}*/}

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
                {penalistData.length !== 0 ?
                    <TopHeading />
                    : null }
                {
                    penalistData.length === 0  && profileData.length === 0 ? <Loading/> :
                        <React.Fragment>
                            <BasicProfile/>
                            <Label />
                            {profileOverviewData ?
                            <Profiles />: ''}
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
