import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import Accessibility from "@material-ui/icons/Accessibility";
import GridItem from "../../Components/Grid/GridItem";
import GridContainer from "../../Components/Grid/GridContainer.js";
import Card from "../../Components/Card/Card.js";
import CardHeader from "../../Components/Card/CardHeader.js";
import CardIcon from "../../Components/Card/CardIcon.js";
import CardFooter from "../../Components/Card/CardFooter.js";
import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import {PageStatus} from "../../enums";
import {PartnersAPI, SurveysAPI} from "../../API";
import {connect} from "react-redux";
import {Alert, Button, Container, Spinner} from "react-bootstrap";
import {Show} from "../../Layout";
import {exportToExcel} from "../../Utils/ExportToExcel";
const useStyles = makeStyles(styles);
import Select from 'react-select';

function AdminDashboard({...rest}) {
    const classes = useStyles();
    const [data, setData] = useState(null);
    const [partnerUsers, setUsersData] = useState(null);
    const [status, setStatus] = useState(PageStatus.None);
    const [error, setError] = useState('');
    const [isExporting, setExporting] = useState(false);
    const [partners, setPartners] = useState([]);
    const [selectPartners, setSelectPartners] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                Promise.resolve()
                    .then(() => setStatus(PageStatus.Loading))
                    .then(() => SurveysAPI.adminRespondentDashboardWeb())
                    .then((response) => {
                        console.log('response--->', response)
                        if(response) {
                            setData(response)
                            setStatus(PageStatus.Loaded)
                        }
                    })
                    .catch((error) => {
                        setStatus(PageStatus.Error)
                        setError(error.message)
                    });
            } catch (error) {
                setError(error);
            } finally {
                setStatus(PageStatus.Loaded);
            }
        };

        fetchData();
        fetchPartners()
    }, []);


    const fetchPartners = () => {
        Promise.resolve()
            .then(() => {
                return PartnersAPI.getPartners(10000);
            })
            .then((survey) => {
                const options = survey.map((item) => ({
                    label: item.name,
                    value: item.id,
                }));
                setPartners(options);
            })
            .catch((error) => {
                setError(error);
            });
    }


    const calculateTime = (createdAt, updatedAt) => {
        const created = new Date(createdAt);
        const updated = new Date(updatedAt);
        const timeDifferenceInMilliseconds = updated - created;
        return timeDifferenceInMilliseconds / 1000;
    }
    const fetchPartnerUsers = async () => {
        try {
            if(selectPartners) {
                Promise.resolve()
                    .then(() => setExporting(true))
                    .then(() => SurveysAPI.partnerSurveyUsers(selectPartners.value))
                    .then((response) => {
                        if (response.length > 0) {
                            setUsersData(response)
                            const transformedData = response.map(item => ({
                                "Survey ID of the Project": item.survey_id,
                                "Country": item.country,
                                "India Polls respondent ID": item.rid,
                                "Vendor Respondent ID": item.rid,
                                "Status": item.status,
                                "Start IP": item.ip,
                                "End IP": item.ip,
                                "Start Time": item.createdAt,
                                "End Time": item.updatedAt,
                                "LOI (seconds)": calculateTime(item.createdAt, item.updatedAt),
                                "Survey Name": item.surveyName,
                                "Partner Name": item.partnerName
                            }));
                            if (transformedData.length > 0) {
                                exportToExcel(transformedData, 'PartnerUsers');
                                setExporting(false)
                            }
                        }
                        setExporting(false)
                    })
                    .catch((error) => {
                        setExporting(false)
                        setError(error.message)
                    });
            }
        } catch (error) {
            setError(error);
        } finally {
            setExporting(false)
        }
    };


   const handlePartnersChange = (selectedPartnerOption) => {
       setSelectPartners(selectedPartnerOption);
    };

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? 'white' : 'black',
        }),
    };

    return (
        <div>
            {/*<ReactStars count={5} value={5} size={24} activeColor="#ffd700"/>*/}
            <GridContainer>

                <Show when={status === PageStatus.Loading}>
                    <Container className="d-flex justify-content-center mt-5">
                        <Spinner animation="border" variant="primary" />
                    </Container>
                </Show>

                <Alert
                    variant="danger"
                    show={status === PageStatus.Error}
                >
                    {error}
                </Alert>


                <Show when={status === PageStatus.Loaded && !!data}>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <CardHeader color="info" stats icon>
                                <CardIcon color="warning">
                                    <Icon>content_copy</Icon>
                                </CardIcon>
                                <p className={classes.cardCategory}>{data ? data.totalSurveys.name : ''}</p>
                                <h3 className={classes.cardTitle}>
                                    {data ? data.totalSurveys.points : 0}<small></small>
                                </h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    <Update />
                                    Just Updated
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <CardHeader color="warning" stats icon>
                                <CardIcon color="success">
                                    <Store />
                                </CardIcon>
                                <p className={classes.cardCategory}>{data ? data.completeSurveys.name: ''}</p>
                                <h3 className={classes.cardTitle}>
                                    {data ? data.completeSurveys.points: 0}<small></small>
                                </h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    <Update />
                                    Just Updated
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <CardHeader color="success" stats icon>
                                <CardIcon color="danger">
                                    <Icon>info_outline</Icon>
                                </CardIcon>
                                <p className={classes.cardCategory}>{data ? data.incompleteSurveys.name : ''}</p>
                                <h3 className={classes.cardTitle}>
                                    {data ? data.incompleteSurveys.points: 0}<small></small>
                                </h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    <DateRange />
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <CardHeader color="danger" stats icon>
                                <CardIcon color="info">
                                    <Accessibility />
                                </CardIcon>
                                <p className={classes.cardCategory}>{data ? data.notStartedSurveys.name: ''}</p>
                                <h3 className={classes.cardTitle}>
                                    {data ? data.notStartedSurveys.points : 0}<small></small>
                                </h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    <Update />
                                    Just Updated
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <CardHeader color="info" stats icon>
                                <CardIcon color="warning">
                                    <Icon>content_copy</Icon>
                                </CardIcon>
                                <p className={classes.cardCategory}>{data ? data.overallAttemptedPercentage.name : ''}</p>
                                <h3 className={classes.cardTitle}>
                                    {data ? data.overallAttemptedPercentage.points : 0}<small>%</small>
                                </h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    <Update />
                                    Just Updated
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <CardHeader color="info" stats icon>
                                <CardIcon color="success">
                                    <Store />
                                </CardIcon>
                                <p className={classes.cardCategory}>{data ? data.totalLeft.name : 0}</p>
                                <h3 className={classes.cardTitle}>
                                    {data ? data.totalLeft.points : 0}<small></small>
                                </h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    <Update />
                                    Just Updated
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <CardHeader color="info" stats icon>
                                <CardIcon color="danger">
                                    <Icon>info_outline</Icon>
                                </CardIcon>
                                <p className={classes.cardCategory}>{data ? data.totalReferralsApproved.name : ''}</p>
                                <h3 className={classes.cardTitle}>
                                    {data ? data.totalReferralsApproved.points : 0}<small></small>
                                </h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    <Update />
                                    Just Updated
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <CardHeader color="info" stats icon>
                                <CardIcon color="info">
                                    <Accessibility />
                                </CardIcon>
                                <p className={classes.cardCategory}>{data ? data.totalReferralsPoints.name : ''}</p>
                                <h3 className={classes.cardTitle}>
                                    {data ? data.totalReferralsPoints.points : 0}<small></small>
                                </h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    <Update />
                                    Just Updated
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <CardHeader color="info" stats icon>
                                <CardIcon color="warning">
                                    <Icon>content_copy</Icon>
                                </CardIcon>
                                <p className={classes.cardCategory}>{data ? data.totalReferralsStatistics.name : ''}</p>
                                <h3 className={classes.cardTitle}>
                                    {data ? data.totalReferralsStatistics.points : 0}<small></small>
                                </h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    <Update />
                                    Just Updated
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <CardHeader color="info" stats icon>
                                <CardIcon color="success">
                                    <Store />
                                </CardIcon>
                                <p className={classes.cardCategory}>{data ? data.totalRewardPoints.name : ''}</p>
                                <h3 className={classes.cardTitle}>
                                    {data ? data.totalRewardPoints.points : 0}<small></small>
                                </h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    <Update />
                                    Just Updated
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                        <Card>
                            <CardHeader color="info" stats icon>
                                <CardIcon color="danger">
                                    <Icon>info_outline</Icon>
                                </CardIcon>
                                <Select
                                    name='partners'
                                    id='partners'
                                    className="ql-color-red"
                                    onChange={handlePartnersChange}
                                    value={selectPartners}
                                    options={partners}
                                    styles={customStyles}
                                />
                                <div>Partners</div>
                                <p className={classes.cardCategory}>Partners Reports</p>
                                    <Button
                                    onClick={() => fetchPartnerUsers()}
                                    disabled={isExporting === true}
                                    >
                                        Download
                                    </Button>
                                <Show when={isExporting === true}>
                                    <Spinner size="sm" animation="border" variant="primary" />
                                </Show>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    <Update />
                                    Just Updated
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </Show>
            </GridContainer>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        userId: state.adminUser.adminUser.userId,
        role: state.adminUser.adminUser.role,
    };
}

export default connect(mapStateToProps)(AdminDashboard);
