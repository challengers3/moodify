import React from 'react';
import Player from './Player';
import Mood from './Mood';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import styles from '../../dist/css/styles';
import CircularProgress from 'material-ui/CircularProgress';
import Lyrics from './Lyrics';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';

class SongCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ' ',
      artist: ' ',
      tone: ' ',
      expanded: false,
      open: false,
      dialogOpen: false,
    };
    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.handleEmotionToggle = this.handleEmotionToggle.bind(this);
    this.handleSocialToggle = this.handleSocialToggle.bind(this);
    this.handleLanguageToggle = this.handleLanguageToggle.bind(this);
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.handleDialogToggle = this.handleDialogToggle.bind(this);
    this.handleTopTrack = this.handleTopTrack.bind(this);
  }

  handleExpandChange(expanded) {
    this.setState({expanded: this.state.expanded});
  };

  handleDrawerToggle() {
    this.setState({open: !this.state.open});
  }

  handleDialogToggle() {
    this.setState({dialogOpen: !this.state.dialogOpen});
  }

  handleEmotionToggle(event) {
    if (this.state.expanded && this.state.tone !== 'emotion') {
      this.setState({tone: 'emotion'});
    } else {
      this.setState({tone: 'emotion'});
      this.handleDialogToggle();
    }
  };

  handleSocialToggle(event) {
    if (this.state.expanded && this.state.tone !== 'social') {
      this.setState({tone: 'social'});
    } else {
      this.setState({tone: 'social'});
      this.handleDialogToggle();
    }
  };

  handleLanguageToggle(event) {
    if (this.state.expanded && this.state.tone !== 'language') {
      this.setState({tone: 'language'});
    } else {
      this.setState({tone: 'language'});
      this.handleDialogToggle();
    }
  }

  handleTopTrack() {
    console.log('NAME ISSSSS', this.props.songNameAndArtist[0])
    this.props.getTopByArtist(this.props.songNameAndArtist[0]);
  }

  render() {
    const actions = [
      <FlatButton
        label="Okay"
        primary={true}
        onTouchTap={this.handleDialogToggle}
      />
    ];

    if (this.props.loading) {
      return (
        <CircularProgress style={styles.loading} />
      );
    } else {
      return (
        <div>
          <Drawer 
            open={this.state.open}
            docked={false}
            onRequestChange={(open) => this.setState({open})}
            overlayStyle={{backgroundColor: 'transparent'}}
          >
            <MenuItem style={{fontWeight: 'bold'}} onTouchTap={this.handleEmotionToggle}>Emotion</MenuItem>
            <MenuItem>Anger</MenuItem>
            <MenuItem>Disgust</MenuItem>
            <MenuItem>Fear</MenuItem>
            <MenuItem>Sadness</MenuItem>
            <MenuItem>Joy</MenuItem>
            <Divider />
            <MenuItem style={{fontWeight: 'bold'}} onTouchTap={this.handleSocialToggle}>Social</MenuItem>
            <MenuItem>Openness</MenuItem>
            <MenuItem>Conscientiousness</MenuItem>
            <MenuItem>Extraversion</MenuItem>
            <MenuItem>Agreeableness</MenuItem>
            <MenuItem>Emotional Range</MenuItem>
            <Divider />
            <MenuItem style={{fontWeight: 'bold'}}  onTouchTap={this.handleLanguageToggle}>Language</MenuItem>
            <MenuItem>Analytical</MenuItem>
            <MenuItem>Confident</MenuItem>
            <MenuItem>Tentative</MenuItem>
          </Drawer>

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
              <Lyrics watsonLyrics={this.props.watsonLyrics} />
            </CardText>

            <Dialog
              actions={actions}
              open={this.state.dialogOpen}
              onRequestClose={this.handleDialogToggle}
            >
              <Mood watson={this.props.watson} tone={this.state.tone} />

            </Dialog>
            <RaisedButton
              style={styles.tone}
              label="Tone Data"
              onTouchTap={this.handleDrawerToggle}
            />
            <RaisedButton
              style={styles.top}
              label="Top Ten Tracks"
              onTouchTap={this.handleTopTrack}
            />
          </Card>
        </div>
// =======
        //   </CardText>
        //   <CardActions>
        //     <FlatButton label="Language Analysis" onTouchTap={this.handleLanguageToggle} />
        //     <FlatButton label="Emotion Analysis" onTouchTap={this.handleEmotionToggle} />
        //     <FlatButton label="Social Analysis" onTouchTap={this.handleSocialToggle} />
        //     <FlatButton label="Top Ten Tracks" onTouchTap={this.props.getTopByArtist} />
        //   </CardActions>
        // </Card>
// >>>>>>> rebasing 10:05
      );
    }
  }
}

export default SongCard;
