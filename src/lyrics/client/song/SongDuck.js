import React from 'react';
import {Link} from 'react-router';
import {createAction} from 'redux-actions';

import treebank from 'talisman/tokenizers/words/treebank';
import naive from 'talisman/tokenizers/words/naive';

import {absolute, relative} from 'talisman/stats/frequencies';

import {fromJS, Map, Set} from 'immutable';

const REQUEST_SONG_RECIEVE = 'REQUEST_SONG_RECIEVE';

export const requestSong = createAction(REQUEST_SONG_RECIEVE);



const initialState = Map();
export default function(state = initialState, action) {
    var {type, payload} = action;
    switch (type) {
        case REQUEST_SONG_RECIEVE:
            var words = fromJS(naive(payload.lyrics));

            return state.set(payload.id, fromJS({
                uniqueWords: words.toSet().size,
                wordCound: words.size
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
