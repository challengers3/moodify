import React from 'react';
import Line from './Line.jsx'

class Lyrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tones:[]
    };
  }

  componentWillMount(){
    console.log(this.props.watsonLyrics)
    // let tones = this.props.watsonLyrics.filter(
    //   utterance => utterance.tones.length > 0 ).map( 
    //     utterance => utterance.tones).map(tones => tones.map(tone => tone.tone_id) );
    // let results = [];

    // for(let i = 0; i < tones.length; i++){
    //   for(let j = 0; j < tones[i].length; j++){
    //     results.push(tones[i][j])
    //   }
    // }
    
    // this.setState({
    //   tones: [...new Set(results)]
    // })
  }

  render() {
    return (
        <div>{this.props.watsonLyrics.map( 
          (lyrics, i) => <Line key={i} line={lyrics} /> )}
          </div>
    );
  }
}

export default Lyrics;
