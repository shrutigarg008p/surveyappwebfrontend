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
import {SurveysAPI} from "../../API";
import {connect} from "react-redux";
import {Alert, Container, Spinner} from "react-bootstrap";
import {Show} from "../../Layout";
const useStyles = makeStyles(styles);

function Dashboard({...rest}) {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(PageStatus.None);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        Promise.resolve()
            .then(() => setStatus(PageStatus.Loading))
            .then(() => SurveysAPI.userRespondentDashboardWeb(rest.userId))
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
  }, []);

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
            <GridItem xs={12} sm={6} md={6}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
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
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="info">
                  <Icon>content_copy</Icon>
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
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="info">
                  <Icon>content_copy</Icon>
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
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="info">
                  <Icon>content_copy</Icon>
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
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
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
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Icon>content_copy</Icon>
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
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Icon>content_copy</Icon>
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
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Icon>content_copy</Icon>
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
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
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
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Icon>content_copy</Icon>
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
          </Show>
        </GridContainer>




        {/*<GridContainer>*/}
        {/*  <GridItem xs={12} sm={12} md={4}>*/}
        {/*    <Card chart>*/}
        {/*      <CardHeader color="success">*/}
        {/*        <ChartistGraph*/}
        {/*          className="ct-chart"*/}
        {/*          data={dailySalesChart.data}*/}
        {/*          type="Line"*/}
        {/*          options={dailySalesChart.options}*/}
        {/*          listener={dailySalesChart.animation}*/}
        {/*        />*/}
        {/*      </CardHeader>*/}
        {/*      <CardBody>*/}
        {/*        <h4 className={classes.cardTitle}>Daily Sales</h4>*/}
        {/*        <p className={classes.cardCategory}>*/}
        {/*          <span className={classes.successText}>*/}
        {/*            <ArrowUpward className={classes.upArrowCardCategory} /> 55%*/}
        {/*          </span>{" "}*/}
        {/*          increase in today sales.*/}
        {/*        </p>*/}
        {/*      </CardBody>*/}
        {/*      <CardFooter chart>*/}
        {/*        <div className={classes.stats}>*/}
        {/*          <AccessTime /> updated 4 minutes ago*/}
        {/*        </div>*/}
        {/*      </CardFooter>*/}
        {/*    </Card>*/}
        {/*  </GridItem>*/}
        {/*  <GridItem xs={12} sm={12} md={4}>*/}
        {/*    <Card chart>*/}
        {/*      <CardHeader color="warning">*/}
        {/*        <ChartistGraph*/}
        {/*          className="ct-chart"*/}
        {/*          data={emailsSubscriptionChart.data}*/}
        {/*          type="Bar"*/}
        {/*          options={emailsSubscriptionChart.options}*/}
        {/*          responsiveOptions={emailsSubscriptionChart.responsiveOptions}*/}
        {/*          listener={emailsSubscriptionChart.animation}*/}
        {/*        />*/}
        {/*      </CardHeader>*/}
        {/*      <CardBody>*/}
        {/*        <h4 className={classes.cardTitle}>Email Subscriptions</h4>*/}
        {/*        <p className={classes.cardCategory}>Last Campaign Performance</p>*/}
        {/*      </CardBody>*/}
        {/*      <CardFooter chart>*/}
        {/*        <div className={classes.stats}>*/}
        {/*          <AccessTime /> campaign sent 2 days ago*/}
        {/*        </div>*/}
        {/*      </CardFooter>*/}
        {/*    </Card>*/}
        {/*  </GridItem>*/}
        {/*  <GridItem xs={12} sm={12} md={4}>*/}
        {/*    <Card chart>*/}
        {/*      <CardHeader color="danger">*/}
        {/*        <ChartistGraph*/}
        {/*          className="ct-chart"*/}
        {/*          data={completedTasksChart.data}*/}
        {/*          type="Line"*/}
        {/*          options={completedTasksChart.options}*/}
        {/*          listener={completedTasksChart.animation}*/}
        {/*        />*/}
        {/*      </CardHeader>*/}
        {/*      <CardBody>*/}
        {/*        <h4 className={classes.cardTitle}>Completed Tasks</h4>*/}
        {/*        <p className={classes.cardCategory}>Last Campaign Performance</p>*/}
        {/*      </CardBody>*/}
        {/*      <CardFooter chart>*/}
        {/*        <div className={classes.stats}>*/}
        {/*          <AccessTime /> campaign sent 2 days ago*/}
        {/*        </div>*/}
        {/*      </CardFooter>*/}
        {/*    </Card>*/}
        {/*  </GridItem>*/}
        {/*</GridContainer>*/}
        {/*<GridContainer>*/}
        {/*  <GridItem xs={12} sm={12} md={6}>*/}
        {/*    <Card>*/}
        {/*      <CardHeader color="warning">*/}
        {/*        <h4 className={classes.cardTitleWhite}>Cases Statuses</h4>*/}
        {/*        <p className={classes.cardCategoryWhite}>*/}
        {/*          All cases of IndiaPolls platform*/}
        {/*        </p>*/}
        {/*      </CardHeader>*/}
        {/*      <CardBody>*/}
        {/*        <Table*/}
        {/*          tableHeaderColor="warning"*/}
        {/*          tableHead={["ID", "Name", "Rating", "Details"]}*/}
        {/*          tableData={[*/}
        {/*            ["1", "Dakota Rice", "04/05", "Details"],*/}
        {/*            ["2", "Minerva Hooper", "03/05", "Details"],*/}
        {/*            ["3", "Sage Rodriguez", "03/05", "Details"],*/}
        {/*            ["4", "Philip Chaney", "03/05", "Details"],*/}
        {/*          ]}*/}
        {/*        />*/}
        {/*      </CardBody>*/}
        {/*    </Card>*/}
        {/*  </GridItem>*/}
        {/*  <GridItem xs={12} sm={12} md={6}>*/}
        {/*    <Card>*/}
        {/*      <CardHeader color="warning">*/}
        {/*        <h4 className={classes.cardTitleWhite}>Cases Statuses</h4>*/}
        {/*        <p className={classes.cardCategoryWhite}>*/}
        {/*          All cases of IndiaPolls platform*/}
        {/*        </p>*/}
        {/*      </CardHeader>*/}
        {/*      <CardBody>*/}
        {/*        <Table*/}
        {/*          tableHeaderColor="warning"*/}
        {/*          tableHead={["ID", "Name", "Open", "Pending", "Completed"]}*/}
        {/*          tableData={[*/}
        {/*            ["1", "Dakota Rice", "03", "01", "02"],*/}
        {/*            ["2", "Minerva Hooper", "03", "01", "02"],*/}
        {/*            ["3", "Sage Rodriguez", "03", "01", "02"],*/}
        {/*            ["4", "Philip Chaney", "03", "01", "02"],*/}
        {/*          ]}*/}
        {/*        />*/}
        {/*      </CardBody>*/}
        {/*    </Card>*/}
        {/*  </GridItem>*/}
        {/*</GridContainer>*/}
      </div>
  );
}

function mapStateToProps(state) {
  return {
    userId: state.adminUser.adminUser.userId,
    role: state.adminUser.adminUser.role,
  };
}

export default connect(mapStateToProps)(Dashboard);
