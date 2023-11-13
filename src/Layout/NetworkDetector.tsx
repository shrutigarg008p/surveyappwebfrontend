import React, { Component } from 'react';

import { SnackBar } from './SnackBar';

import { Show } from 'Layout/Show';

const ONLINE = 'Network is online.';
const OFFLINE = 'Network is offline.';
const HIDE_IN_MS = 120 * 1000;

export class NetworkDetector extends Component<any, any> {
  online: any;
  offline: any;

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      message: ONLINE,
    };
    this.online = () => this.notify(ONLINE);
    this.offline = () => this.notify(OFFLINE);
  }

  componentDidMount() {
    window.addEventListener('online', this.online);
    window.addEventListener('offline', this.offline);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.online);
    window.removeEventListener('offline', this.offline);
  }

  notify(message) {
    this.setState({ show: true, message });
    setTimeout(() => this.setState({ show: false }), HIDE_IN_MS);
  }

  render() {
    return (
      <Show when={this.state.show}>
        <SnackBar message={this.state.message} />
      </Show>
    );
  }
}

export default NetworkDetector;
