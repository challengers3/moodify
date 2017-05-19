import React from 'react';
import TextField from 'material-ui/TextField';
import styles from '../../dist/css/styles';
import FlatButton from 'material-ui/FlatButton';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
      showPrev: false
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleArtistChange = this.handleArtistChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.prevResults = this.prevResults.bind(this);
  }

  handleTitleChange(e) { this.setState({ title: e.target.value }); }
  handleArtistChange(e) { this.setState({ artist: e.target.value }); }

  handleSubmit(e) {
    e.preventDefault();
    this.props.search(this.state.title, this.state.artist);
    this.setState({ title: '', artist: '', showPrev: true});
  }

  prevResults(e) {
    e.preventDefault();
    this.props.prev();
    this.props.runUpDown();
  }

  render() {
    return (
      <div style={styles.search}>
        <form onSubmit={this.handleSubmit}> 
          <TextField hintText='Title' value={this.state.title} onChange={this.handleTitleChange}/>
          <TextField hintText='Artist' value={this.state.artist} onChange={this.handleArtistChange}/>
          <FlatButton type='submit' label="Search" onTouchTap={this.handleSubmit}/>
        </form>
      </div>
    );
  }
}

export default Search;