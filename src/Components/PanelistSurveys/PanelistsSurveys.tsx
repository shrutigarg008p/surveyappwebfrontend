import React, { Component } from 'react';
import {
  Alert, Button, Spinner, Table,
} from 'react-bootstrap';

import { PageStatus } from 'enums';
import {Show} from "../../Layout";
import CardHeader from "../Card/CardHeader";
import GridContainer from "../Grid/GridContainer";
import Card from "../Card/Card";
import moment from "moment/moment";
import {SurveysAPI} from "../../API";
import {exportToExcel} from "../../Utils/ExportToExcel";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {PanelistDetails} from "./PanelistDetails";
import { surveyDict } from 'Languages/SurveyTranslations';
function filterByDaysRange(daysRange: any, currentDate: any, item: any){
  const itemDate: any = new Date(item.createdAt);
  const timeDifference = currentDate - itemDate;
  const daysDifference = Math.abs(timeDifference / (1000 * 3600 * 24))
  return daysDifference <= daysRange;
}


const MODAL_TYPES = {
  NONE: 'NONE',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  DETAILS: 'DETAILS',
};

type State = {
  status: PageStatus,
  error: string | null,
  formType: string,
  data: any[],
  id?: string | null,
  filteredData: any[],
  filters: {
    dateRange: any,
    name: '',
    client: '',
    publishDate: '',
    expiryDate: '',
    surveyName: '',
    surveyType: ''
  },
};

class PanelistSurveys extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      status: PageStatus.None,
      error: null,
      formType: MODAL_TYPES.NONE,
      data: [],
      id: null,
      filteredData: [],
      filters: {
        dateRange: '',
        name: '',
        client: '',
        publishDate: '',
        expiryDate: '',
        surveyName: '',
        surveyType: ''
      },
    };
    this.fetchList = this.fetchList.bind(this);
  }

  componentDidMount() {
    this.fetchList()
  }

  fetchList(): Promise<void> {
    return Promise.resolve()
      .then(() => this.setState({ status: PageStatus.Loading }))
      .then(() => SurveysAPI.panelistSurveys(this.props.userId))
      .then((countries) => {
        this.setState({ data: countries, filteredData: countries,  status: PageStatus.Loaded });
      })
      .catch((error) => {
        this.setState({ error: error.message, status: PageStatus.Error });
      });
  }

  isShowDetailModal(): boolean {
    return this.state.formType === MODAL_TYPES.DETAILS
        || this.state.formType === MODAL_TYPES.DELETE;
  }


  handleFilterChange = (e) => {
    const { name, value } = e.target;
    this.setState(
        (prevState) => ({
          filters: {
            ...prevState.filters,
            [name]: value,
          },
        }),
    );
  };

  applyFilters = () => {
    const { data } = this.state;
    const { filters } = this.state;
    if(filters.dateRange){
      this.applyDateRange()
    } else {
      const filteredData = data.filter((user) => {
        return Object.keys(filters).every((key) => {
          if (filters[key] === '') return true;
          if (key === 'publishDate' || key === 'expiryDate') {
            return new Date(user[key]).toDateString() === new Date(filters[key]).toDateString();
          }
          return String(user[key]).toLowerCase().includes(String(filters[key]).toLowerCase());
        });
      });
      this.setState({filteredData});
    }
  };


  applyDateRange() {
    const currentDate = new Date();
    const { filters, data } = this.state;
    const selectedDaysRange = filters.dateRange;
    let filteredArray;
    if (selectedDaysRange === "30 Days") {
      filteredArray = data.filter(item => filterByDaysRange(30, currentDate, item));
      this.setState({ filteredData: filteredArray });
    } else if (selectedDaysRange === "60 Days") {
      filteredArray = data.filter(item => filterByDaysRange(60, currentDate, item));
      this.setState({ filteredData: filteredArray });
    } else if (selectedDaysRange === "90 Days") {
      filteredArray = data.filter(item => filterByDaysRange(90, currentDate, item));
      this.setState({ filteredData: filteredArray });
    } else if (selectedDaysRange === 'Last Year') {
      const lastYearStartDate = new Date();
      lastYearStartDate.setFullYear(lastYearStartDate.getFullYear() - 1);
      lastYearStartDate.setHours(0, 0, 0, 0);
      console.log('last---->', lastYearStartDate)
      filteredArray = data.filter(item => new Date(item.createdAt) >= lastYearStartDate);
      this.setState({ filteredData: filteredArray });
    } else {
      filteredArray = filters;
      this.setState({ filteredData: filteredArray });
    }
  }
  clearFilter = () => {
    this.setState({filters: {
        client: '',
        publishDate: '',
        name: '',
        expiryDate: '',
        surveyName: '',
        surveyType: '',
        dateRange: ''
      },
    })
    this.fetchList()
  }

  handleExport(){
    exportToExcel(this.state.filteredData, 'surveys');
  };

  
  render() {
    const { filteredData, filters } = this.state;
    const lang = this.props.language;
    return (
      <>
    <GridContainer>
        <Card>
            <CardHeader color="primary">
                <div className="d-flex align-items-center justify-content-between">
                    <h4>{surveyDict[lang]["Surveys"] || "Surveys"}</h4>
                </div>
            </CardHeader>
        </Card>
    </GridContainer>

    <div className="jumbotron bg-white p-3 border shadow-sm">
        <Alert variant="danger" show={this.state.status === PageStatus.Error}>
            {this.state.error}
        </Alert>

        <Show when={this.state.status === PageStatus.Loading}>
            <div className="d-flex justify-content-center w-100 p-5">
                <Spinner animation="border" variant="primary" />
            </div>
        </Show>

        <Show when={this.state.status === PageStatus.Loaded}>
            <Show when={!this.state.filteredData.length}>
                <Alert variant="info" show={!this.state.filteredData.length}>
                    {surveyDict[lang]["No Data Available"] || "At the current moment data is not available, Click button for add."}
                </Alert>
            </Show>

            <Show when={!!this.state.filteredData.length}>
                <Show when={this.isShowDetailModal()}>
                    <PanelistDetails
                        id={this.state.id}
                        onClose={() => this.setState({
                            formType: MODAL_TYPES.NONE,
                            id: null,
                        })}
                        onUpdate={() => {
                            this.setState({
                                formType: MODAL_TYPES.UPDATE,
                            });
                        }}
                        onDelete={(id) => {
                            this.fetchList();
                            this.setState({
                                formType: MODAL_TYPES.NONE,
                                id: null,
                            });
                        }}
                    />
                </Show>

                <Table responsive size="sm" bordered>
                    <thead>
                        <tr>
                            <th>{surveyDict[lang]["S.No"] || "S.No"}</th>
                            <th>{surveyDict[lang]["Name"] || "Name"}</th>
                            <th>{surveyDict[lang]["Status"] || "Status"}</th>
                            <th>{surveyDict[lang]["Points"] || "Points"}</th>
                            <th>{surveyDict[lang]["Expire Date"] || "Expire Date"}</th>
                            <th>{surveyDict[lang]["Starts"] || "Starts"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.filteredData.map((info, index) => (
                                <tr key={info.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <span
                                            aria-label="button"
                                            role="button"
                                            tabIndex={0}
                                            className="text-primary"
                                            onKeyPress={() => null}
                                            onClick={() => {
                                                this.setState({
                                                    formType: MODAL_TYPES.DETAILS,
                                                    id: info.id,
                                                });
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: info.survey.name || 'Title',
                                            }}
                                        />
                                    </td>
                                    <td>{info.status}</td>
                                    <td>{info.survey.ceggPoints}</td>
                                    <td>{moment(info.createdAt).format('MM/DD/YYYY HH:mm A')}</td>
                                    <td>
                                        <a href={info?.temporarySurveyLink} target="_blank" rel="noopener noreferrer">
                                            {surveyDict[lang]["Click Here to start survey"] || "Click here to start survey"}
                                        </a>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Show>
        </Show>
    </div>
</>

    );
  }
}


const mapStateToProps = (state: { adminUser: { adminUser: { phoneNumber: any, email: any, userId: any; token: any; loading: any; error: any; role: any, language:any }; }; }) => {
  return {
    userId: state.adminUser.adminUser.userId,
    language: state.adminUser.adminUser.language
  };
};

const PanelistSurveysWithRouter = withRouter(connect(mapStateToProps) (PanelistSurveys));

export {PanelistSurveysWithRouter as PanelistSurveys };
