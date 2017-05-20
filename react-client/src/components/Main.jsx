// dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Redirect, Switch, Route, Link } from 'react-router-dom';

// sub components
import Lyrics from './Lyrics';
import Mood from './Mood';
import Player from './Player';
import Search from './Search';
import SearchResults from './SearchResults';
import User from './User';
import LoginSignup from './LoginSignup';
import PastSearchResults from './PastSearchResults';
import Header from './Header';
import styles from '../../dist/css/styles';
import App from './App';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSongNameAndArtist: [],
      currentLyrics: '',
      watson: {},
      spotifyURI: null,
      spotifyAlbumArt: null,
      searchResults: [],
      searchResultsUser: [],
      searchResultsLoading: false,
      spotifyLoading: false,
      lyricsLoading: false,
      showPlayer: false,
      showLyrics: false,
      showMood: false,
      showResults: false,
      showResultsUser: false,
      showPrev: false,
      upDown: true,
      url: window.location.href,
      loggedIn: false,
      upDownUser: false,
      searchResultsLoadingUser: false,
      loginS: false,
      signupView: false,
      mainView: false,
      // now: Date.now(),
    };
    this.search = this.search.bind(this);
    this.process = this.process.bind(this);
    this.showResults = this.showResults.bind(this);
    this.upDown = this.upDown.bind(this);
    this.upDownUser = this.upDownUser.bind(this);
    this.showResultsUser = this.showResultsUser.bind(this);
    this.loadPastSearchResults = this.loadPastSearchResults.bind(this);
    this.changetoSignup = this.changetoSignup.bind(this);
  }

  componentDidMount() {
    console.log('App componentDidMount'); // out of sync issue
    // debugger;
    if (annyang) {
      const commands = {
        'look up *title (by *artist)': this.search,
        'console log': () => console.log('in annyang'),
      };
      annyang.addCommands(commands);
      annyang.debug();
    }
  }

  componentWillUnmount() {
    annyang.removeCommands();
  }


  search(title, artist) {
    this.setState({
      showResults: true,
      searchResultsLoading: true,
      showPrev: true,
      upDown: false,
    });

    const options = {
      title,
      artist,
    };
    axios.post('/search', options).then((res) => {
      if (!res.data) {
        console.log('error');
      }
      this.setState({ searchResults: res.data, searchResultsLoading: false });
    });
  }

  process(trackObj) {
    this.setState({
      showPlayer: true,
      spotifyLoading: true,
      lyricsLoading: true,
      showResults: false,
      showResultsUser: false,
      upDownUser: false,
      showLyrics: false,
      showMood: false,
      upDown: true,
    });

    const input = {};
    input.track_id = trackObj.track_id;
    input.track_name = trackObj.track_name;
    input.artist_name = trackObj.artist_name;
    input.album_coverart_100x100 = trackObj.album_coverart_100x100;
    input.album_coverart_350x350 = trackObj.album_coverart_350x350;
    input.album_coverart_500x500 = trackObj.album_coverart_500x500;
    input.album_coverart_800x800 = trackObj.album_coverart_800x800;

    axios.post('/process', input).then((res) => {
      const data = res.data;
      this.setState({
        currentSongNameAndArtist: data[0],
        currentLyrics: data[1],
        watson: data[2],
        spotifyURI: data[3],
        spotifyAlbumArt: data[4],
        spotifyLoading: false,
        lyricsLoading: false,
        showLyrics: true,
        showMood: true,
      });
    }).catch((error) => {
      throw error;
    });
  }

  showResults() {
    this.setState({
      showResults: !this.state.showResults,
    });
  }

  showResultsUser() {
    this.setState({
      showResultsUser: !this.state.showResultsUser,
    });
  }

  upDown() {
    this.setState({
      upDown: !this.state.upDown,
    });
  }

  upDownUser() {
    this.setState({
      upDownUser: !this.state.upDownUser,
    });
  }

  loadPastSearchResults(trackId) {
    axios.post('/loadPastSearchResults', { track_id: trackId }).then((res) => {
      const songData = res.data[0];
      const watsonData = res.data[1];
      console.log(watsonData);
      this.setState({
        currentLyrics: songData.lyrics,
        currentSongNameAndArtist: [
          songData.track_name, songData.artist_name,
        ],
      }, this.setState({
        watson: watsonData,
        spotifyURI: songData.spotify_uri,
      }, this.setState({
        showMood: true,
        showPlayer: true,
      }, this.setState({
        showLyrics: true,
      }))));
    }).catch(err => console.log(err));
  }

  changetoSignup() {
    console.log('Is in LOGIN')
    this.setState({
      loginS: true,
    });
  }

  render() {
    const isLoginS = this.state.loginS;
    if (isLoginS) {
      return <Link to="/loginSignup" />;
    }
    return (
      <div>
      <Header />
        <div
          style={styles.container}
        >
          <Search
            search={this.search}
            prev={this.showResults}
            showPrev={this.state.showPrev}
            upDown={this.state.upDown}
            runUpDown={this.upDown}
          />
          {this.state.showResults ?
            <SearchResults
              results={this.state.searchResults}
              process={this.process}
              searchResultsLoading={this.state.searchResultsLoading}
            /> : null}
          {this.state.showPlayer ?
            <Lyrics
              showPlayer={this.state.showPlayer}
              spotifyURI={this.state.spotifyURI}
              spotifyAlbumArt={this.state.spotifyAlbumArt}
              loading={this.state.spotifyLoading}
              lyrics={this.state.currentLyrics}
              loading={this.state.lyricsLoading}
              songNameAndArtist={this.state.currentSongNameAndArtist}
              watson={this.state.watson}
            /> : null}
          <div style={styles.cardStyle}>
            <User
              showPrev={this.state.showResultsUser}
              prev={this.showResultsUser}
              upDown={this.state.upDownUser}
              runUpDown={this.upDownUser}
              process={this.process}
              searchResultsLoading={this.state.searchResultsLoadingUser}
              loadPastSearchResults={this.loadPastSearchResults}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
