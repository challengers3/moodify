import React from 'react';
import Line from './Line.jsx'

class Lyrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    // console.log(this.props);
    let condRender;
    if (!this.props.watsonLyrics.utterances_tone) {
      return null;
    }
    return (
        <div>{this.props.watsonLyrics.utterances_tone.map(
          (lyrics, i) => <Line key={i} line={lyrics} /> )}</div>
    );
  }
}

export default Lyrics;
