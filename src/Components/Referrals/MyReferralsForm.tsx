import React from 'react';
import {
    Field,
    reduxForm,
} from 'redux-form';
import {Alert, Button, Modal, Spinner} from 'react-bootstrap';
import { withRouter } from 'react-router';
import csvtojson from 'csvtojson';
import { Show } from 'Layout';
import {Operands, PageStatus, VoucherType} from 'enums';
import {AuthAPI, RedemptionModeAPI, SecAPI} from "../../API";
import { referralModalDict } from 'Languages/ReferralTranslations';
export type FormValue = {
    "name": string,
};


type State = {
    status: string,
    error: string | null,
    country: any,
    name: string,
};

class Form extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            status: PageStatus.None,
            error: null,
            isActive: 1,
            points: 0,
            mode: "",
            importedData: { users: [] },
            name: "",
            email: "",
            referralStatus: "Invited",
            referralMethod: "Manual",
            phoneNumber: ""
        };
    }


    formValues() {
        return {
            name: this.state.name,
            email: this.state.email,
            userId: this.props.userId,
            referralStatus: "Invited",
            referralMethod: "Manual",
            phoneNumber: this.state.phoneNumber
        };
    }

    create() {
        const valuesIn = this.formValues()
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Submitting }))
            .then(() => AuthAPI.createReferralRequest(valuesIn, this.props.language))
            .then((country) => {
                this.props.onSubmit(this.props.userId);
                return this.setState({ status: PageStatus.Submitted });
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }


    createBulk() {
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Submitting }))
            .then(() => AuthAPI.createBulkReferralRequest(this.state.importedData, this.props.language))
            .then((country) => {
                this.props.onSubmit(this.props.userId);
                return this.setState({ status: PageStatus.Submitted });
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }

    reset() {
        return this.setState({
            points: '',
            mode: ''
        });
    }

    isValidPoints() {
        const remaining = this.props.totalLeft - this.state.points
        return remaining >= 100
    }

    downloadFile = () => {
        const downloadUrl = `https://indiapolls.com:9000/Images/Sample.csv`;
        window.open(downloadUrl, '_blank');
    };

    handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const jsonData = await this.convertCsvToJson(file);
                const transformedData = jsonData.map(this.modifiedConvertedJson);
                this.setState({ importedData: { users: transformedData } })
                console.log(transformedData);
            } catch (error) {
                console.error('Error converting CSV to JSON:', error);
            }
        }
    };

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

    modifiedConvertedJson = (obj) => {
            return {
                name: obj.Name,
                email: obj.Email,
                phoneNumber: obj.Mobile,
                userId: this.props.userId,
                referralStatus: "Invited",
                referralMethod: "File",
            };
    }

    render() {
        const lang = this.props.language ?? 'en';
        return (
            <Modal
            centered
            size="xl"
            backdrop="static"
            onHide={this.props.onClose}
            show={this.props.show}
            style={{ zIndex: 1201 }}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {referralModalDict[lang]["Referral"] || "Referral"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '78vh', overflow: 'auto' }}>
                <Show when={this.state.status === PageStatus.Loading}>
                    <div className="d-flex justify-content-center w-100 p-5">
                        <Spinner animation="border" variant="primary" />
                    </div>
                </Show>

                <div className="jumbotron bg-white p-3 border shadow-sm">
                    <div><b>{referralModalDict[lang]["Refer with link"] || "Refer with link"}</b></div>
                    <hr />
                    <br />
                    <p>
                    {referralModalDict[lang]["Referral Link Description"] || "Referral Link Description"}: <a href={`https://panel.indiapolls.com/#/referrals/view/${this.props.userId}`}>
                        <b>{`https://panel.indiapolls.com/#/referrals/view/${this.props.userId}`}</b>
                        </a>.
                    </p>
                </div>

                <div className="jumbotron bg-white p-3 border shadow-sm">
                    <div><b>{referralModalDict[lang]["Upload From a CSV list"] || "Upload From a CSV list"}</b></div>
                    <hr />
                    <br />
                    <div>
                    {referralModalDict[lang]["CSV Description"] || "CSV Description"}
                <a onClick={this.downloadFile} className="link-display" style={{color: 'orange'}}> {referralModalDict[lang]["Download"] || "Download"} </a>

                        <div>
                            <input className="mt-1" type="file" accept=".csv" onChange={(e) => this.handleFileChange(e)} />
                        </div>
                        <div>
                            <Button
                                onClick={() => this.createBulk()}
                                variant="primary"
                                disabled={this.state.importedData.users.length === 0}
                                className="mt-3"
                                size="sm"
                            >
                                {referralModalDict[lang]["Import"] || "Import"}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="jumbotron bg-white p-3 border shadow-sm">
                    <div><b>{referralModalDict[lang]["Refer a friend"] || "Refer a friend"}</b></div>
                    <hr />
                    <br />
                    <div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="title">{referralModalDict[lang]["Name"] || "Name"}*</label>
                                <input
                                    className="form-control"
                                    name="name"
                                    onChange={(e) => this.setState({ name: e.target.value })}
                                    value={this.state.name}
                                    placeholder={referralModalDict[lang]["Enter here"] || "Enter here"}
                                    title={referralModalDict[lang]["Enter here"] || "Enter here"}
                                    required
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="email">{referralModalDict[lang]["Email"] || "Email"}*</label>
                                <input
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    onChange={(e) => this.setState({ email: e.target.value })}
                                    value={this.state.email}
                                    title={referralModalDict[lang]["Enter here"] || "Enter here"}
                                    placeholder={referralModalDict[lang]["Enter.."] || "Enter.."}
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="Mobile">{referralModalDict[lang]["Mobile"] || "Mobile"}</label>
                                <input
                                    className="form-control"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                                    value={this.state.phoneNumber}
                                    title={referralModalDict[lang]["Enter here"] || "Enter here"}
                                    placeholder={referralModalDict[lang]["Enter.."] || "Enter.."}
                                />
                            </div>
                        </div>
                        <div>
                            <Button
                                onClick={() => this.create()}
                                variant="primary"
                                disabled={!this.state.name || !this.state.email}
                                className="mt-3 mb-2"
                                size="sm"
                            >
                                {referralModalDict[lang]["Refer"] || "Refer"}
                            </Button>
                        </div>
                    </div>
                    <Alert variant="danger" show={this.state.status === PageStatus.Error}>
                        {this.state.error}
                    </Alert>

                </div>
            </Modal.Body>
        </Modal>

        );
    }
}

export { Form as Form };
