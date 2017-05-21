const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));

const getSongByTitleAndArtist = (title, artist) => {
  const rootURL = 'https://api.spotify.com/v1/';
  return request.getAsync(rootURL + 'search?q=track:' + title + '%20artist:' + artist + '&type=track')
  .then(data => {
    let parsedData = JSON.parse(data.body);
    console.log('ParseData', parsedData.tracks.items[0].artists[0].id)
    let spotifyData = {
      uri: parsedData.tracks.items[0].uri,
      albumArt: parsedData.tracks.items[0].album.images[0].url,
      // artist_id: parsedData.tracks.items[0].artists[0].id,
    }
    return spotifyData;
  })
  .catch((err) => { console.log(err); });
};

// const Client_ID = '17af2e7d17c94de6b602b7ae29b1a7c0';
// const Client_Secret = 'e87dca1ab2094afd84f33f19fa73bef6';

//use/refactor with query-parser??
//can adjust API call with field filters, currently all functions search via name
  //ex. track named, artist named, album named, etc.
//add other functions based on what to search on API
//use URI retrieved from API request / other things (?)
  //can embed on front-end via iframes (look into)
//results are in arrays of objects
  //should consider what we want out of them
  //also how to manipulate data

module.exports.getSongByTitleAndArtist = getSongByTitleAndArtist;
