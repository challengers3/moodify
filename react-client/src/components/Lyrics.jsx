import React from 'react';
import Player from './Player.jsx';
import Mood from './Mood.jsx';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import styles from '../../dist/css/styles';
import CircularProgress from 'material-ui/CircularProgress';

class Lyrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ' ',
      artist: ' ',
      tone: ' ',
      expanded: false,
    };
    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.handleEmotionToggle = this.handleEmotionToggle.bind(this);
    this.handleSocialToggle = this.handleSocialToggle.bind(this);
    this.handleLanguageToggle = this.handleLanguageToggle.bind(this);
  }

  handleExpandChange(expanded) {
    this.setState({expanded: this.state.expanded});
  };

  handleEmotionToggle(event) {
    if (this.state.expanded && this.state.tone !== 'emotion') {
      this.setState({tone: 'emotion'});
    } else {
      this.setState({tone: 'emotion'});
      this.setState({expanded: !this.state.expanded});
    }
  };

  handleSocialToggle(event) {
    if (this.state.expanded && this.state.tone !== 'social') {
      this.setState({tone: 'social'});
    } else {
      this.setState({tone: 'social'});
      this.setState({expanded: !this.state.expanded});
    }
  };

  handleLanguageToggle(event) {
    if (this.state.expanded && this.state.tone !== 'language') {
      this.setState({tone: 'language'});
    } else {
      this.setState({tone: 'language'});
      this.setState({expanded: !this.state.expanded});
    }
  };


  render() {
    if (this.props.loading) {
      return (
          <CircularProgress style={styles.loading} />
      );
    } else {
      return (
        <Card style={styles.cardStyle} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
          <CardMedia
            overlay={<CardTitle title={this.props.songNameAndArtist[0] + ' - ' + this.props.songNameAndArtist[1]}/>}
          >
            <img src={this.props.spotifyAlbumArt} style={styles.img}/>
          </CardMedia>
          <CardText>
            {this.props.showPlayer ?
            <Player spotifyURI={this.props.spotifyURI} loading={this.props.loading}/>
          : null }
            <pre>{this.props.lyrics}</pre>
          </CardText>
          <CardText expandable={true}>
            <Mood watson={this.props.watson} tone={this.state.tone}/>
          </CardText>
          <CardActions>
            <FlatButton label="Emotion" onTouchTap={this.handleEmotionToggle} />
            <FlatButton label="Social" onTouchTap={this.handleSocialToggle} />
            <FlatButton label="Language" onTouchTap={this.handleLanguageToggle} />
          </CardActions>
        </Card>
      );
    }
  }
}

export default Lyrics;
