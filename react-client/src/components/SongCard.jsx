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
      category: ' ',
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
    this.handleMenuAnger = this.handleMenuAnger.bind(this);
    this.handleMenuFear = this.handleMenuFear.bind(this);
    this.handleMenuJoy = this.handleMenuJoy.bind(this);
    this.handleMenuSadness = this.handleMenuSadness.bind(this);
    this.handleMenuDisgust = this.handleMenuDisgust.bind(this);
    this.handleMenuAgreea = this.handleMenuAgreea.bind(this);
    this.handleMenuConsc = this.handleMenuConsc.bind(this);
    this.handleMenuExtra = this.handleMenuExtra.bind(this);
    this.handleMenuOpenness = this.handleMenuOpenness.bind(this);
    this.handleMenuRange = this.handleMenuRange.bind(this);
    this.handleMenuAnalytical = this.handleMenuAnalytical.bind(this);
    this.handleMenuConfident = this.handleMenuConfident.bind(this);
    this.handleMenuTentative = this.handleMenuTentative.bind(this); 
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

  handleEmotionToggle() {
    //console.log(this.props.watson)
    this.setState({category: 'emotion'});
    this.handleDialogToggle();
  };

  handleSocialToggle(event) {
    // if (this.state.tone !== 'social') {
    //   this.setState({tone: 'social'});
    // } else {
      this.setState({category: 'social'});
      this.handleDialogToggle();
    // }
  };

  handleLanguageToggle(event) {
    // if (this.state.tone !== 'language') {
    //   this.setState({tone: 'language'});
    // } else {
      this.setState({category: 'language'});
      this.handleDialogToggle();
    // }
  }

  handleTopTrack() {
    console.log('NAME ISSSSS', this.props.songNameAndArtist[0])
    this.props.getTopByArtist(this.props.songNameAndArtist[0]);
  }

  handleMenuAnger() {
    this.setState({tone: 'anger'});
    this.setState({category: 'emotion'});
  }

  handleMenuFear() {
    this.setState({tone: 'fear'});
    this.setState({category: 'emotion'});
  }

  handleMenuDisgust() {
    this.setState({tone: 'disgust'});
    this.setState({category: 'emotion'});
  }

  handleMenuSadness() {
    this.setState({tone: 'sadness'});
    this.setState({category: 'emotion'});
  }

  handleMenuJoy() {
    this.setState({tone: 'joy'});
    this.setState({category: 'emotion'});
  }  

  handleMenuOpenness() {
    this.setState({tone: 'openness'});
    this.setState({category: 'social'});
  }

  handleMenuConsc() {
    this.setState({tone: 'conscientiousness'});
    this.setState({category: 'social'});
  }

  handleMenuAgreea() {
    this.setState({tone: 'agreeableness'});
    this.setState({category: 'social'});
  }

  handleMenuExtra() {
    this.setState({tone: 'extraversion'});
    this.setState({category: 'social'});
  }

  handleMenuRange() {
    this.setState({tone: 'range'});
    this.setState({category: 'social'});
  }  

  handleMenuAnalytical() {
    this.setState({tone: 'analytical'});
    this.setState({category: 'language'});
  }  

  handleMenuConfident() {
    this.setState({tone: 'confident'});
    this.setState({category: 'language'});
  }  

  handleMenuTentative() {
    this.setState({tone: 'tentative'});
    this.setState({category: 'language'});
  }  



  render() {
    console.log('category', this.state.category)
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
            <h2>Tones</h2>
            <MenuItem style={{fontWeight: 'bold'}} onTouchTap={this.handleEmotionToggle}>Emotion</MenuItem>
            <MenuItem onTouchTap={this.handleMenuAnger}>Anger</MenuItem>
            <MenuItem onTouchTap={this.handleMenuDisgust}>Disgust</MenuItem>
            <MenuItem onTouchTap={this.handleMenuFear}>Fear</MenuItem>
            <MenuItem onTouchTap={this.handleMenuSadness}>Sadness</MenuItem>
            <MenuItem onTouchTap={this.handleMenuJoy}>Joy</MenuItem>
            <Divider />
            <MenuItem style={{fontWeight: 'bold'}} onTouchTap={this.handleSocialToggle}>Social</MenuItem>
            <MenuItem onTouchTap={this.handleMenuOpenness}>Openness</MenuItem>
            <MenuItem onTouchTap={this.handleMenuConsc}>Conscientiousness</MenuItem>
            <MenuItem onTouchTap={this.handleMenuExtra}>Extraversion</MenuItem>
            <MenuItem onTouchTap={this.handleMenuAgreea}>Agreeableness</MenuItem>
            <MenuItem onTouchTap={this.handleMenuRange}>Emotional Range</MenuItem>
            <Divider />
            <MenuItem style={{fontWeight: 'bold'}}  onTouchTap={this.handleLanguageToggle}>Language</MenuItem>
            <MenuItem>Analytical</MenuItem>
            <MenuItem>Confident</MenuItem>
            <MenuItem>Tentative</MenuItem>
          </Drawer>

          <Dialog
            actions={actions}
            open={this.state.dialogOpen}
            onRequestClose={this.handleDialogToggle}
          >
          <Mood watson={this.props.watson} category={this.state.category}/>
          </Dialog>

          <div style={styles.cardContainer}>
            <div style={{float:'left'}}>
              <Card style={styles.cardStyle}>
                <CardMedia
                  overlay={<CardTitle title={this.props.songNameAndArtist[0] + ' - ' + this.props.songNameAndArtist[1]}/>}
                >
                  <img src={this.props.spotifyAlbumArt} style={styles.img}/>
                </CardMedia>
                </Card>
              </div>
              
              <div style={{float:'left'}}>
                <Card style={styles.cardStyle}>
                <CardText style={{height: '572px'}}>
                  {this.props.showPlayer ?
                  <Player spotifyURI={this.props.spotifyURI} loading={this.props.loading}/>
                : null }
                  <Lyrics watsonLyrics={this.props.watsonLyrics} category={this.state.category} tone={this.state.tone}/>
                </CardText>
                <RaisedButton label="Tone Data" onTouchTap={this.handleDrawerToggle} />
                <RaisedButton style={styles.top} label="Top Ten Tracks" onTouchTap={this.handleTopTrack} />
              </Card>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default SongCard;
