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
  }

  render() {
    let tone = ' ';

    let toneCode = (emotion) => {
      if (emotion === 'anger' || emotion === 'openness') {
        return 0;
      } else if (emotion === 'disgust' || emotion === 'conscientiousness') {
        return 1;
      } else if (emotion === 'fear' || emotion === 'extraversion')  {
        return 2;
      } else if (emotion === 'sadness' || emotion === 'agreeableness') {
        return 3;
      } else if (emotion === 'joy' || emotion ==='range') {
        return 4;
      }
    }

    return (
        <div>{this.props.watsonLyrics.map( 
          (lyrics, i) => {
            const categories = lyrics.tone_categories;
            if (categories.length > 0 && this.props.category === 'emotion' ) {
              if (lyrics.tone_categories[0].tones[toneCode(this.props.tone)].score >= 0.75) {
                tone = this.props.tone;
              }
            } else
            if (categories.length > 0 && this.props.category === 'social' ) {
              console.log('tone', lyrics.tone_categories[2])
              if (lyrics.tone_categories[2].tones[toneCode(this.props.tone)].score >= 0.75) {
                tone = this.props.tone;
              }
            } else 
            if (categories.length > 0 && this.props.category === 'language' ) {
              if (lyrics.tone_categories[1].tones[toneCode(this.props.tone)].score > 0.75) {
                tone = this.props.tone;
              }
            } 

            return <Line key={i} line={lyrics} category={this.props.category} tone={tone}/>
          } )}
          </div>
    );
  }
}

export default Lyrics;
