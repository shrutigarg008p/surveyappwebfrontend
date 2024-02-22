import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Store from "@material-ui/icons/Store";
import Accessibility from "@material-ui/icons/Accessibility";
import GridItem from "../../Components/Grid/GridItem";
import GridContainer from "../../Components/Grid/GridContainer.js";
import Card from "../../Components/Card/Card.js";
import CardHeader from "../../Components/Card/CardHeader.js";
import CardIcon from "../../Components/Card/CardIcon.js";
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
            .then(() => SurveysAPI.userRespondentDashboardWeb(rest.userId, rest.language))
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
  }, [rest.language]);

  const cardHeight = {
    height : '120px'
  }
  return (
      <div>
        {/*<ReactStars count={5} value={5} size={24} activeColor="#ffd700"/>*/}


        <Show when={status === PageStatus.Loaded}>
          <div className="jumbotron bg-white p-3 border shadow-sm">
            {data ? data.overallAttemptedPercentage.points > 0 ?
                    rest.language === 'hi' ?
                        <p style={{color: 'red'}}>
                          आपकी प्रोफ़ाइल लंबित है, कृपया 50 आई-प्वाइंट प्राप्त करने के लिए इसे पूरा करें। प्रोफ़ाइल भरना शुरू करने के लिए
                          <strong><a className="mr-1 ml-1" onClick={() => rest.history.push('/panelist/profile-overview')}
                                     style={{fontWeight: 'bold', color: 'red'}}>यहां क्लिक करें</a></strong>
                        </p>
                        :
                        <p style={{color: 'red'}}>
                          Your profile is pending, please complete it to get 50 I-Points.
                          <strong><a className="mr-1 ml-1" onClick={() => rest.history.push('/panelist/profile-overview')}
                                     style={{fontWeight: 'bold', color: 'red'}}>Click Here</a></strong>
                          to start filling profile.
                        </p>
                    :
                    rest.language === 'hi' ?
                        <p style={{color: 'green'}}>
                          आपकी प्रोफ़ाइल पूरी हो गई है, अपना इनाम देखने के लिए
                          <strong><a className="mr-1 ml-1" onClick={() => rest.history.push('/panelist/my-rewards')}
                                     style={{fontWeight: 'bold', color: 'green'}}>यहां क्लिक करें</a></strong>
                        </p>
                        :
                        <p style={{color: 'green'}}>
                          Your profile is completed,
                          <strong><a className="mr-1 ml-1" onClick={() => rest.history.push('/panelist/my-rewards')}
                                     style={{fontWeight: 'bold', color: 'green'}}>click here</a></strong>
                          to view your reward.
                        </p>

                :
                rest.language === 'hi' ?
                    <p style={{color: 'red'}}>
                      आपकी प्रोफ़ाइल लंबित है, कृपया 50 आई-प्वाइंट प्राप्त करने के लिए इसे पूरा करें। प्रोफ़ाइल भरना शुरू करने के लिए
                      <strong><a className="mr-1 ml-1" onClick={() => rest.history.push('/panelist/profile-overview')}
                                 style={{fontWeight: 'bold', color: 'red'}}>यहां क्लिक करें</a></strong>
                    </p>
                    :
                    <p style={{color: 'red'}}>
                      Your profile is pending, please complete it to get 50 I-Points.
                      <strong><a className="mr-1 ml-1" onClick={() => rest.history.push('/panelist/profile-overview')}
                                 style={{fontWeight: 'bold', color: 'red'}}>Click Here</a></strong>
                      to start filling profile.
                    </p>
            }
          </div>
        </Show>

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
              <Card style={cardHeight}>
                <CardHeader color="info" stats icon>
                  <CardIcon color="warning">
                    <Icon>content_copy</Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>{data ? data.totalSurveys.name : ''}</p>
                  <h3 className={classes.cardTitle}>
                    {data ? data.totalSurveys.points : 0}<small></small>
                  </h3>
                </CardHeader>
                {/* <CardFooter stats/> */}
                  {/*<div className={classes.stats}> */}
                    {/*<Update /> */}

                  {/*</div> */}
                {/*</CardFooter> */}
              </Card>
            </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card style={cardHeight}>
              <CardHeader color="warning" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>{data ? data.completeSurveys.name: ''}</p>
                <h3 className={classes.cardTitle}>
                  {data ? data.completeSurveys.points: 0}<small></small>
                </h3>
              </CardHeader>
              {/* <CardFooter stats/> */}
                {/*<div className={classes.stats}> */}
                  {/*<Update /> */}

                {/*</div> */}
              {/*</CardFooter> */}
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card style={cardHeight}>
              <CardHeader color="success" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>{data ? data.incompleteSurveys.name : ''}</p>
                <h3 className={classes.cardTitle}>
                  {data ? data.incompleteSurveys.points: 0}<small></small>
                </h3>
              </CardHeader>
              {/* <CardFooter stats/> */}
                {/*<div className={classes.stats}> */}
                  {/* <DateRange /> */}
                {/*</div> */}
              {/*</CardFooter> */}
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card style={cardHeight}>
              <CardHeader color="danger" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>{data ? data.notStartedSurveys.name: ''}</p>
                <h3 className={classes.cardTitle}>
                  {data ? data.notStartedSurveys.points : 0}<small></small>
                </h3>
              </CardHeader>
              {/* <CardFooter stats/> */}
                {/*<div className={classes.stats}> */}
                  {/*<Update /> */}

                {/*</div> */}
              {/*</CardFooter> */}
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card style={cardHeight}>
              <CardHeader color="info" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>{data ? data.overallAttemptedPercentage.name : ''}</p>
                <h3 className={classes.cardTitle}>
                  {data ? data.overallAttemptedPercentage.points : 0}<small>%</small>
                </h3>
              </CardHeader>
              {/* <CardFooter stats/> */}
                {/*<div className={classes.stats}> */}
                  {/*<Update /> */}

                {/*</div> */}
              {/*</CardFooter> */}
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card style={cardHeight}>
              <CardHeader color="info" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>{data ? data.totalLeft.name : 0}</p>
                <h3 className={classes.cardTitle}>
                  {data ? data.totalLeft.points : 0}<small></small>
                </h3>
              </CardHeader>
              {/* <CardFooter stats/> */}
                {/*<div className={classes.stats}> */}
                  {/*<Update /> */}

                {/*</div> */}
              {/*</CardFooter> */}
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card style={cardHeight}>
              <CardHeader color="info" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>{data ? data.totalReferralsApproved.name : ''}</p>
                <h3 className={classes.cardTitle}>
                  {data ? data.totalReferralsApproved.points : 0}<small></small>
                </h3>
              </CardHeader>
              {/* <CardFooter stats/> */}
                {/*<div className={classes.stats}> */}
                  {/*<Update /> */}

                {/*</div> */}
              {/*</CardFooter> */}
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card style={cardHeight}>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>{data ? data.totalReferralsPoints.name : ''}</p>
                <h3 className={classes.cardTitle}>
                  {data ? data.totalReferralsPoints.points : 0}<small></small>
                </h3>
              </CardHeader>
              {/* <CardFooter stats/> */}
                {/*<div className={classes.stats}> */}
                  {/*<Update /> */}

                {/*</div> */}
              {/*</CardFooter> */}
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card style={cardHeight}>
              <CardHeader color="info" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>{data ? data.totalReferralsStatistics.name : ''}</p>
                <h3 className={classes.cardTitle}>
                  {data ? data.totalReferralsStatistics.points : 0}<small></small>
                </h3>
              </CardHeader>
              {/* <CardFooter stats/> */}
                {/*<div className={classes.stats}> */}
                  {/*<Update /> */}

                {/*</div> */}
              {/*</CardFooter> */}
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card style={cardHeight}>
              <CardHeader color="info" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>{data ? data.totalRewardPoints.name : ''}</p>
                <h3 className={classes.cardTitle}>
                  {data ? data.totalRewardPoints.points : 0}<small></small>
                </h3>
              </CardHeader>
              {/* <CardFooter stats/> */}
                {/*<div className={classes.stats}> */}
                  {/*<Update /> */}

                {/*</div> */}
              {/*</CardFooter> */}
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
    language: state.adminUser.adminUser.language,
  };
}

export default connect(mapStateToProps)(Dashboard);
