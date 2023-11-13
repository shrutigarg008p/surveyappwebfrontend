import { Component } from 'react';
import PropTypes from 'prop-types';

export class DocumentTitle extends Component<any, any> {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: null,
    };
  }

  componentDidMount() {
    this.setState({ title: document.title });
    document.title = this.props.title;
  }

  componentWillUnmount() {
    document.title = this.state.title;
  }

  render() {
    return null;
  }
}

export default DocumentTitle;
