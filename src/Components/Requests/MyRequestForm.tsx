import React from 'react';
import {
    Field,
    reduxForm,
} from 'redux-form';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router';

import { Show } from 'Layout';
import {Operands, PageStatus, VoucherType} from 'enums';
import {RedemptionModeAPI, SecAPI} from "../../API";
import { redeemPointsDict } from 'Languages/MyRequestsTranslations';
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
            modes: [],
            mode: "",
        };
    }


    componentDidMount() {
            this.fetchModes();
    }

    fetchModes = () => {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => RedemptionModeAPI.redemptionList(10000))
            .then((surveyData: any) => {
                if (!!surveyData) {
                    const options = surveyData.map((item) => ({
                        label: item.name,
                        value: item.name,
                    }));
                    this.setState({
                        modes: options,
                        status: PageStatus.Loaded
                    });
                }
            })
            .catch((err) => {
                this.setState({ error: err.message, status: PageStatus.Error });
            });
    };

    formValues() {
        return {
            pointsRequested: parseInt(this.state.points, 10),
            redemptionModeTitle: this.state.mode,
            redemptionModeId: 'a8a39cc6-d3ab-48e7-aab2-564a267476c7', //Temp
            userId: this.props.userId,
            redemptionRequestStatus: 'New',
            notes: 'NA',
            pointsRedeemed: 0,
        };
    }

    onSubmit() {
        if (!this.props.id) {
            return this.create();
        }
    }

    create() {
        const valuesIn = this.formValues()
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Submitting }))
            .then(() => RedemptionModeAPI.createRedemptionRequest(valuesIn))
            .then((country) => {
                this.props.onSubmit(country.id);
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
    render() {
        console.log('---->', this.isValidPoints())
        const lang = this.props.language ?? 'en';
        return (
            <Modal
            centered
            size="lg"
            backdrop="static"
            onHide={this.props.onClose}
            show={this.props.show}
            style={{ zIndex: 1201 }}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {redeemPointsDict[lang]["Redeem Points"] || "Redeem Points"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '78vh', overflow: 'auto' }}>
                <Show when={this.state.status === PageStatus.Loading}>
                    <div className="d-flex justify-content-center w-100 p-5">
                        <Spinner animation="border" variant="primary" />
                    </div>
                </Show>
        
                <Alert variant="danger" show={this.state.status === PageStatus.Error}>
                    {this.state.error}
                </Alert>
        
                <form onSubmit={this.props.handleSubmit((event) => this.onSubmit())}>
                    <div className="form-group">
                        <label htmlFor="titleEng">
                            {redeemPointsDict[lang]["Points"] || "Points"}*
                        </label>
                        <input
                            className="form-control"
                            onChange={(e) => this.setState({ points: e.target.value })}
                            value={this.state.points}
                            type="number"
                            placeholder="Enter..."
                            required
                        />
                        <label htmlFor="titleEng">
                            {redeemPointsDict[lang]["Description"] || "Description"}*
                        </label>
                        <select
                            name='mode'
                            id='mode'
                            value={this.state.mode}
                            required
                            onChange={(e) => this.setState({ mode: e.target.value })}
                            style={{
                                width: '100%',
                                display: 'block',
                                height: '40px',
                                lineHeight: '1.5',
                                color: '#495057',
                                backgroundColor: '#fff',
                                backgroundClip: 'padding-box',
                                border: '1px solid #ced4da',
                                borderRadius: '5px',
                                transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
                            }}
                        >
                            <option value=''>--Choose--</option>
                            {this.state.modes.length > 0 ? this.state.modes.map((item) => (
                                <option value={item.value}>{item.label}</option>
                            )) : ''}
                        </select>
                    </div>
                    <hr />
                    <Alert variant="danger" show={!!this.state.error} className="mt-2">
                        {this.state.error}
                    </Alert>
        
                    <div className="d-flex align-items-center mt-2">
                        <button
                            type="submit"
                            disabled={!this.state.points || !this.state.mode || !this.isValidPoints()}
                            className="btn btn-primary mr-3"
                        >
                            {redeemPointsDict[lang]["Submit"] || "Submit"}
                        </button>
        
                        <button
                            type="button"
                            onClick={() => this.reset()}
                            className="btn btn-light mr-3"
                        >
                            {redeemPointsDict[lang]["Reset"] || "Reset"}
                        </button>
        
                        <Show when={this.state.status === PageStatus.Submitting}>
                            <Spinner animation="border" variant="primary" />
                        </Show>
                    </div>
                </form>
            </Modal.Body>
        </Modal>        
        );
    }
}

const FormRedux = reduxForm<FormValue, any>({
    form: 'labelsForm',
})(Form);


const FormWithRouter = withRouter(FormRedux);

export { FormWithRouter as Form };
