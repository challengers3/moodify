import React from 'react';
import styles from '../../dist/css/styles';

class Line extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tone: ' ',
    };
  }

  render() {
    return (<pre style={styles[this.props.tone]}>{this.props.line.text}</pre>);
  }
}

export default Line;
