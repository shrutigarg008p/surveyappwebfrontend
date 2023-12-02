import React, { useState } from 'react'
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
                            <p className="flow-text">John Doe</p>
                        </div>
                    </div>
                    <div className="col s4">
                        <div className="row">
                            <div className="col s6">
                                <strong className="mb-3 d-block">Email:</strong>
                            </div>
                            <div className="col s6">john.doe@example.com</div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <strong className="mb-3 d-block">Mobile:</strong>
                            </div>
                            <div className="col s6">123-456-7890</div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <strong className="mb-3 d-block">Gender:</strong>
                            </div>
                            <div className="col s6">Male</div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <strong className="mb-3 d-block">Address Line 1:</strong>
                            </div>
                            <div className="col s6">123 Main St</div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <strong className="mb-3 d-block">Address Line 2:</strong>
                            </div>
                            <div className="col s6">Apt 4B</div>
                        </div>
                    </div>
                    <div className="col s4">
                        <div className="row">
                            <div className="col s6">
                                <strong className="mb-3 d-block">DOB:</strong>
                            </div>
                            <div className="col s6">01/01/1990</div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <strong className="mb-3 d-block">Country:</strong>
                            </div>
                            <div className="col s6">United States</div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <strong className="mb-3 d-block">City:</strong>
                            </div>
                            <div className="col s6">Cityville</div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <strong className="mb-3 d-block">State:</strong>
                            </div>
                            <div className="col s6">CA</div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <strong className="mb-3 d-block">Pin Code:</strong>
                            </div>
                            <div className="col s6">12345</div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <strong className="mb-3 d-block">Referral Source:</strong>
                            </div>
                            <div className="col s6">Friend</div>
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
    const data = [
        {
            name : "About", 
            status : "93% completed"
        }, 
        {
            name : "Personal Finance", 
            status : "93% completed"
        }, 
        {
            name : "Shopping", 
            status : "93% completed"
        }, 
        {
            name : "Travek", 
            status : "93% completed"
        }, 
        {
            name : "Media", 
            status : "93% completed"
        }, 
        {
            name : "Household", 
            status : "Completed"
        }, 
        {
            name : "Health", 
            status : "Completed"
        }, 
        {
            name : "Professional", 
            status : "Completed"
        }, 
        {
            name : "Electronics", 
            status : "Completed"
        }
        
    ]
    const notCompletedStyle = { backgroundColor: '#FFFFE0', color: 'black', fontSize: '12px', marginTop: '10px' }
    const completedStyle =  { backgroundColor: '#28a745', color: 'black', fontSize: '12px', marginTop: '10px' }
    return (
        <>
            <Card>
                <CardHeader color="info">
                    <div className="d-flex align-items-center justify-content-between">
                        <h4 className="text-center">Profiles &nbsp;
                            <Chip
                                label="73% Completed"
                                color="default"
                                variant="outlined"
                            />
                        </h4>
                    </div>
                </CardHeader>
                <CardBody>
                <Grid container spacing={4}>
                {
                    data &&
                    data.length > 0 &&
                    data.map((value, key) => (
                    <Grid item xs={12} sm={4} key={key}>
                        <Card2>
                        <CardHeader2
                            title={value.name}
                            titleTypographyProps={{ style: { fontSize: '16px' } }}
                            style={{ background: '#454545', color: 'white'}}
                            action={
                            <Chip
                                label={value.status}
                                style={(value.status === 'Completed') ? completedStyle : notCompletedStyle}
                            />
                            }
                        />
                        <CardContent>
                            <img
                            src="https://placekitten.com/400/100" // Replace with the actual image URL
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

function DataGridTable() {
    function CustomToolbar() {
        return (
          <GridToolbarContainer>
            <GridToolbarExport />
          </GridToolbarContainer>
        );
      }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'firstName',
          headerName: 'First name',
          width : 200
        },
        {
          field: 'lastName',
          headerName: 'Last name',
          width : 200
        },
        {
          field: 'age',
          headerName: 'Age',
          width : 200,
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          width : 200,
          valueGetter: (params) =>
            `${params.getValue(params.id, 'firstName') || ''} ${
              params.getValue(params.id, 'lastName') || ''
            }`,
        },
      ];
      
      const rows:any = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 26 },
        { id: 6, lastName: 'Melisandre', firstName: 'Harley', age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ];
      
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
    const classes = useStyles();
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
                            Total Surveys : 11
                        </Paper>   
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper} elevation={3}>
                            Completed Surveys : 1
                        </Paper>   
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper} elevation={3}>
                            Incomplete Surveys: 7
                        </Paper>   
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper} elevation={3}>
                            Surveys Not Started : 3
                        </Paper>   
                    </Grid>
                </Grid>
                 <DataGridTable/>
            </CardBody>
        </Card>
        </>
    )
}

function Rewards(){
    const classes = useStyles();
   
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
                            Total Surveys : 11
                        </Paper>   
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper className={classes.paper} elevation={3}>
                            Completed Surveys : 1
                        </Paper>   
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper className={classes.paper} elevation={3}>
                            Incomplete Surveys: 7
                        </Paper>   
                    </Grid>
                </Grid>
                <Typography style={{marginTop:'20px'}}>No Rewards are available for this panalist right now</Typography>
            </CardBody>
        </Card>
        </>
    )
}

function Referrals(){
    const classes = useStyles();
   
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
                            Total Surveys : 11
                        </Paper>   
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper} elevation={3}>
                            Completed Surveys : 1
                        </Paper>   
                    </Grid>
                </Grid>
                <Typography style={{marginTop:'20px'}}>No Rewards are available for this panalist right now</Typography>
            </CardBody>
        </Card>
        </>
    )
}

function Redemptions(){
    const classes = useStyles();
   
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
                            Total Surveys : 11
                        </Paper>   
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper} elevation={3}>
                            Completed Surveys : 1
                        </Paper>   
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper} elevation={3}>
                            Incomplete Surveys: 7
                        </Paper>   
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper} elevation={3}>
                            Surveys Not Started : 3
                        </Paper>   
                    </Grid>
                </Grid>
                <Typography style={{marginTop:'20px'}}>No Rewards are available for this panalist right now</Typography>
            </CardBody>
        </Card>
        </>
    )
}


export default function PenalistDetails() {
    return (
        <>
            <GridContainer>
                <TopHeading />
                <BasicProfile />
                <Label />
                <Profiles />
                <Surveys/>
                <Rewards/>
                <Referrals/>
                <Redemptions/>
            </GridContainer>
        </>
    )
}
