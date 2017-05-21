import React from 'react';

class Line extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <pre>{this.props.line.utterance_text}</pre>
  }

}

export default Line;