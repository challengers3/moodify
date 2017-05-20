import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import styles from '../../dist/css/styles';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const index = e.target.getAttribute('value');
    this.props.process(this.props.results.track_list[index].track);
  }

  render() {
    if (this.props.searchResultsLoading) {
      return (
          <CircularProgress style={styles.loading} />
      );
    } else if (this.props.results.errorMessage) {
      return (
        <div className="errorMessage">{this.props.results.errorMessage}</div>
      );
    } else {
      return (
        <div style={styles.list}>
           <Paper zDepth={1} >
              <List>
                {this.props.results.track_list.map((trackObj, i) => (
                  <ListItem key={i}><div value={i} onClick={this.handleClick} >{trackObj.track.track_name} - {trackObj.track.artist_name}</div></ListItem>
                ))}
              </List>
            </Paper>
        </div>
      );
    }
    return (
      <div className="resultsBox">
        {this.props.results.track_list.map((trackObj, i) => (
          <div
            className="searchText"
            key={i} value={i}
            onClick={this.handleClick}
          > {i + 1}. {trackObj.track.track_name} - {trackObj.track.artist_name}</div>
          ))}
      </div>
    );
  }
}

export default SearchResults;
