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
      artist: ' '
    };
  }

  render() {
    if (this.props.loading) {
      return (
          <CircularProgress style={styles.loading} />
      );
    } else {
      return (
        <Card style={styles.cardStyle}>
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
            <Mood watson={this.props.watson} 
                  songNameAndArtist={this.props.songNameAndArtist} 
                  />
          </CardText>
          <CardActions>
            <FlatButton label="Emotion" />
            <FlatButton label="Social" />
            <FlatButton label="Language" />
          </CardActions>
        </Card>
      );
    }
  }
}

export default Lyrics;
