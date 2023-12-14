import React from 'react';
import { Alert, Modal, Spinner } from 'react-bootstrap';

class BodyViewer extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { body } = this.props;
        const isValidHTML = typeof body === 'string' && body.trim() !== '';
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
                    <Modal.Title>Body</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '78vh', overflow: 'auto' }}>
                    {isValidHTML ? (
                        <div dangerouslySetInnerHTML={{ __html: body }} />
                    ) : (
                        <p>No valid HTML content</p>
                    )}
                </Modal.Body>
            </Modal>
        );
    }
}
export default BodyViewer;
