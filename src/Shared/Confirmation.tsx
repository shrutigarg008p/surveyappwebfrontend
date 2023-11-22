/* eslint-disable max-classes-per-file */
import React, { Component, ReactElement } from 'react';
import { Button, Modal } from 'react-bootstrap';

export class NestedButton extends Component<{
  onClick: () => void,
}, any> {
  static defaultProps = {
    onClick: () => void 0,
  };

  constructor(props) {
    super(props);
    this.onAction = this.onAction.bind(this);
  }

  onAction() {
    console.debug('Action is fired.');
  }

  render() {
    return (
      <Button variant="danger" onClick={this.props.onClick}>
        Send
      </Button>
    );
  }
}

/**
 * Example:
 * <Confirmation title="Title" body="Body">
 *   <NestedButton/>
 * </Confirmation>
 */
class Confirmation extends Component<{
  title?: string,
  body?: string,
  changeable?: boolean,
  children: ReactElement,

  onAction?: () => void,
}, {
  show: boolean,
}> {
  child = React.createRef<{
    onAction?:() => void,
    onChange?: () => void,
  }>();

  static defaultProps = {
    title: 'Confirmation',
    body: 'Are you sure?',
    changeable: false,
  };

  constructor(props) {
    super(props);
    this.state = { show: false };
    this.close = this.close.bind(this);
    this.action = this.action.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  close() {
    this.setState({ show: false });
  }

  action() {
    this.setState({ show: false });
    if (this.child.current?.onAction) this.child.current.onAction();
    if (this.child.current?.onChange) this.child.current.onChange();
    if (this.props.onAction) this.props.onAction();
  }

  onClick() {
    this.setState({ show: true });
  }

  onChange() {
    this.setState({ show: true });
  }

  getNewProps() {
    const { onClick, onChange } = this;
    const ref = this.child;
    if (this.props.changeable) return { onChange, ref };
    return { onClick, ref };
  }

  render() {
    return (
      <>
        {React.cloneElement(this.props.children, this.getNewProps())}
        <Modal centered show={this.state.show} onHide={this.close} style={{ zIndex: 1201 }}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{this.props.body}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.close}>Discard</Button>
            <Button variant="primary" onClick={this.action}>OK</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export { Confirmation };
