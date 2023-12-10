import React from 'react';
import { Alert, Modal, Spinner } from 'react-bootstrap';

class Details extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { body } = this.props;
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
                        Message
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '78vh', overflow: 'auto' }}>
                    <div>
                        <h2>Body</h2>
                        <div dangerouslySetInnerHTML={{ __html: body ? body : '' }} />
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default Details;
