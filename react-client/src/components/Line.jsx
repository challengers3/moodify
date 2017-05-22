import React from 'react';
import styles from '../../dist/css/styles';

class Line extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: 'noTone'
    };
  }

  componentWillMount() {
    this.setState({
      style: this.props.style
    })
  }

  render() {
    let tones = [];

    return (<pre style={styles[this.state.style]}>{this.props.line.text}</pre>)
  }

}

export default Line;