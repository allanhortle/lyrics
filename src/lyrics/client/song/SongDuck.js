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

const REQUEST_SONG_RECIEVE = 'REQUEST_SONG_RECIEVE';

export const requestSong = createAction(REQUEST_SONG_RECIEVE);

const boringWords = List(['the', 'i', 'my', 'and', 'a', 'on', 'for', 'of', 'is', 'that', 'in', 'to', 'or']);


const initialState = Map();
export default function(state = initialState, action) {
    var {type, payload} = action;
    switch (type) {
        case REQUEST_SONG_RECIEVE:
            var lines = payload.lyrics.split('\n');
            var tokenized = naive(payload.lyrics);
            var words = fromJS(tokenized);
            var wordCountMap = fromJS(absolute(tokenized))

            return state.set(payload.id, fromJS({
                words: words.size,
                wordsUnique: words.toSet().size,
                wordsRepeated: wordCountMap.filter(ii => ii > 1).size,
                wordsUsedOnce: wordCountMap.filter(ii => ii === 1).size,
                syllableLinesList: lines.map(line => naive(line).map(word => syllables(word))),
                syllableList: words.map(ww => syllables(ww)),
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
