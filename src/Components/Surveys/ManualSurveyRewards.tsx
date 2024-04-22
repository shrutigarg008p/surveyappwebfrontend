import React from 'react';
import { withRouter } from 'react-router';
import {Alert, Button, Modal, Spinner} from 'react-bootstrap';

import { PageStatus } from 'enums';
import { Show } from 'Layout';
import {Confirmation} from "../../Shared/Confirmation";
import csvtojson from "csvtojson";
import {AuthAPI, SurveysAPI} from "../../API";

type State = {
    survey: any | null,
    status: string,
    error: string | null,
};


class ManualSurveyRewards extends React.Component<any, any> {
    static defaultProps = {
        languageId: null,
        hideMenu: false,
        onUpdate: () => null,
    };

    constructor(props) {
        super(props);
        this.state = {
            survey: null,
            status: PageStatus.None,
            error: null,
            bulkImportData: []
        };
    }


    modifiedConvertedJson = (obj) => {
        return {
            userId: obj.userId,
            points: obj.points,
        };
    }

    convertCsvToJson = (file: File): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                const csvContent: any = reader.result

                if (!csvContent.trim()) {
                    reject(new Error('CSV content is empty.'));
                    return;
                }

                csvtojson()
                    .fromString(csvContent)
                    .then(jsonData => resolve(jsonData))
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsText(file);
        });
    };

    approvedActionsBulkManual(): Promise<void> {
        return Promise.resolve()
            .then(() => this.setState({status: PageStatus.Loading}))
            .then(() => SurveysAPI.uploadBulkRewards({bulkImportData: this.state.bulkImportData, surveyId: this.props.surveyId}))
            .then((users) => {
                alert('Manual Rewards Successfully Uploaded')
                return this.setState({ status: PageStatus.Loaded, bulkImportData: []});
            })
            .catch((error) => {
                this.setState({error: error.message, status: PageStatus.Error});
            });
    }


    handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const jsonData = await this.convertCsvToJson(file);
                const transformedData = jsonData.map(this.modifiedConvertedJson);
                this.setState({ bulkImportData:  transformedData  })
                console.log(transformedData);
            } catch (error) {
                console.error('Error converting CSV to JSON:', error);
            }
        }
    };

    render() {
        console.log('this---->', this.state.bulkImportData)
        return (
            <>
                <Modal
                    centered
                    size="lg"
                    backdrop="static"
                    onHide={this.props.onClose}
                    show
                    style={{ zIndex: 1201 }}
                >
                    <Modal.Header closeButton>
                        <h5 className="mb-0 mt-1">Manual Rewards</h5>
                    </Modal.Header>
                    <Modal.Body style={{ maxHeight: '78vh', overflow: 'auto' }}>

                        <Show when={this.state.status === PageStatus.Loading}>
                            <div className="d-flex justify-content-center w-100 p-5">
                                <Spinner animation="border" variant="primary" />
                            </div>
                        </Show>

                        <Show when={!!this.props.surveyId}>

                            <div>
                                <input className="mt-2" type="file" accept=".csv" onChange={(e) => this.handleFileChange(e)} />
                            </div>

                            <div>
                                <Confirmation onAction={() => this.approvedActionsBulkManual()} body="Are you sure want to upload rewards ?">
                                    <Button
                                        variant="primary"
                                        disabled={this.state.bulkImportData.length === 0}
                                        className="mt-3"
                                        size="sm"
                                    >
                                        Upload Rewards
                                    </Button>
                                </Confirmation>
                            </div>


                            <Alert
                                variant="danger"
                                show={this.state.status === PageStatus.Error}
                            >
                                {this.state.error}
                            </Alert>
                        </Show>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

const ManualSurveyRewardsWithRouter = withRouter(ManualSurveyRewards);

export { ManualSurveyRewardsWithRouter as ManualSurveyRewards };
