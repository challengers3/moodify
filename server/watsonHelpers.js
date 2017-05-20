const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const watson = Promise.promisifyAll(require('watson-developer-cloud'));
const config = require('../config/index.js');

const WATSON_TONE_API_KEY = config.WATSON_TONE_API_KEY;

const tone_analyzer = watson.tone_analyzer({
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api',
  username: WATSON_TONE_API_KEY.username,
  password: WATSON_TONE_API_KEY.password,
  version: 'v3',
  version_date: '2016-05-19'
});

const getSongData = (songString) => {
  return tone_analyzer.toneAsync({ text: songString })
  .then (data => {

    let emotionalTone = data.document_tone.tone_categories[0];
    let languageTone = data.document_tone.tone_categories[1];
    let socialTone = data.document_tone.tone_categories[2];

    return {
      song: songString,

      // Emotion Tone
      anger: emotionalTone.tones[0].score,
      disgust: emotionalTone.tones[1].score,
      fear: emotionalTone.tones[2].score,
      joy: emotionalTone.tones[3].score,
      sadness: emotionalTone.tones[4].score,

      // Language Tone
      analytical: languageTone.tones[0].score,
      confident: languageTone.tones[1].score,
      tentative: languageTone.tones[2].score,

      // Social Tone
      openness: socialTone.tones[0].score,
      conscientiousness: socialTone.tones[1].score,
      extraversion: socialTone.tones[2].score,
      agreeableness: socialTone.tones[3].score,
      emotionalrange: socialTone.tones[4].score

    };
  })
  .catch(err => {
    console.log("getSongData error: ", err);
    return err;
  });
};

const getLyricsData = (songString) => {
  let songByLines = songString.split('\n')
  let params = { utterances : [] };

  for (let i = 0; i < songByLines.length; i++) {
    params.utterances.push( {text: songByLines[i]} )
  }

  return tone_analyzer.tone_chatAsync(params)
  .then ( data => data )
  .catch(err => {
    console.log("getLyricsData error: ", err);
    return err;
  });
};

const queryWatson = (songString) => {
  return Promise.all([getSongData(songString), getLyricsData(songString)])
  .spread((songData, lyricsData) => { 
    songData.lyrics = lyricsData; 
    return songData;
  });
};

module.exports.queryWatson = queryWatson;
