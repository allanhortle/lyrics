import React from 'react';
import {Link} from 'react-router';
import {createAction} from 'redux-actions';
import {fromJS, Map, Set, List} from 'immutable';

import treebank from 'talisman/tokenizers/words/treebank';
import naive from 'talisman/tokenizers/words/naive';
import kMeans from 'talisman/clustering/k-means';
import {absolute, relative} from 'talisman/stats/frequencies';

function syllables(word) {
  word = word.toLowerCase();                                     //word.downcase!
  if(word.length <= 3) { return 1; }                             //return 1 if word.length <= 3
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');   //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
  word = word.replace(/^y/, '');                                 //word.sub!(/^y/, '')
  return word.match(/[aeiouy]{1,2}/g).length;                    //word.scan(/[aeiouy]{1,2}/).size
}

function avg (v) {
  return v.reduce((a,b) => a+b, 0)/v.length;
}

function smoothOut(vector, variance) {
  var t_avg = avg(vector)*variance;
  var ret = Array(vector.length);
  for (var i = 0; i < vector.length; i++) {
    (function () {
      var prev = i > 0 ? ret[i-1] : vector[i];
      var next = i < vector.length ? vector[i] : vector[i-1];
      ret[i] = avg([t_avg, avg([prev, vector[i], next])]);
    })();
  }
  return ret;
}


const REQUEST_SONG_RECIEVE = 'REQUEST_SONG_RECIEVE';

export const requestSong = createAction(REQUEST_SONG_RECIEVE);

const boringWords = List(['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at']);


const initialState = Map();
export default function(state = initialState, action) {
    var {type, payload} = action;
    switch (type) {
        case REQUEST_SONG_RECIEVE:
            var lyrics = payload.lyrics.replace(/['",]|([\[\(].*?[\]\)])/g, '').toLowerCase();
            var lines = lyrics.split('\n');
            var tokenized = naive(lyrics);
            var words = fromJS(tokenized);
            var wordCountMap = fromJS(absolute(tokenized))

            return state.set(payload.id, fromJS({
                words: words.size,
                wordsUnique: words.toSet().size,
                wordsRepeated: wordCountMap.filter(ii => ii > 1).size,
                wordsRepeatedCount: wordCountMap.filter(ii => ii > 1).reduce((count, item) => count + item, 0),
                wordsUsedOnce: wordCountMap.filter(ii => ii === 1).size,
                syllableList: words.map(ww => syllables(ww)).filter((ii, kk) => kk % 4 === 0),
                syllableCount: words.reduce((rr, ii) => {
                    var number = syllables(ii);
                    return rr.set(number, rr.get(number, 0) + 1);
                }, Map()),
                longestWords: wordCountMap
                    .sortBy((ii, key) => key.length)
                    .reverse()
                    .take(10),
                mostCommonWords: wordCountMap
                    .sortBy((ii, key) => ii)
                    .reverse()
                    .filter((count, word) => !boringWords.includes(word.toLowerCase()))
                    .take(10)
            }));

        default:
            return state;
    }
    // var set = fromJS(relative(naive(memoryLane)))
    //     .sortBy((ii, key) => key)
    //     .map((value, key) => ({
    //         x: key,
    //         y: value,
    //         label: key
    //     }))
    //     .toList();

    // return <div>
    //     <VictoryBar
    //         horizontal
    //         data={set.toJS()}
    //         padding={10}
    //         style={{
    //             labels: {fontSize: 7}
    //         }}
    //         height={5000}
    //     />
    // </div>
}
