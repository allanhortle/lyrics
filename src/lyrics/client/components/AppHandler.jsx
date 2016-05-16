import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import memoryLane from 'lyrics/client/memoryLane';
import NumberStat from 'lyrics/client/components/NumberStat';
import baby from 'lyrics/client/baby';
import noneShallPass from 'lyrics/client/noneShallPass';
import stronger from 'lyrics/client/stronger';
import cosbySweater from 'lyrics/client/cosbySweater';
import {requestSong} from 'lyrics/client/song/SongDuck';
import {Maybe} from 'monet';

import { VictoryChart, VictoryBar, VictoryAxis, VictoryLine} from "victory";

function RenderMaybe(props) {
    var map = props.map || function(ii) {return ii};
    return props.monad.map(map).orSome(props.orSome);
}

function Song(props) {
    var {song} = props;

    function getValue(key) {
        var value = (typeof key === 'string') ? (ss) => ss.get(key) : key;
        return song.map(value).orSome('-');
    }

    return <div>
            <h1 className="text-center">{props.title}</h1>
                <div className="Grid text-larger">
                    <NumberStat className="Col- text-right" label="Uniqueness" value={getValue(ss => Math.round(ss.get('wordsUnique') / ss.get('words') * 100) + '%')}/>
                    <NumberStat className="Col-" label="Repetition" value={getValue(ss => Math.round(ss.get('wordsRepeatedCount') / ss.get('words') * 100) + '%')}/>
                </div>
                <div className="Grid margin-row3">
                    <NumberStat className="Col-" label="Total Words" value={getValue('words')}/>
                    <NumberStat className="Col-" label="Unique Words" value={getValue('wordsUnique')}/>
                    <NumberStat className="Col-" label="Words Repeated" value={getValue('wordsRepeated')}/>
                    <NumberStat className="Col-" label="Words Used Once" value={getValue('wordsUsedOnce')}/>
                </div>
            <div>
                <h2>Syllables</h2>
                <VictoryChart height={180} padding={{left: 24, right: 0, top: 16, bottom: 0}} domainPadding={8}>
                    <VictoryAxis/>
                    <VictoryAxis dependentAxis style={{
                        axis: {
                            strokeWidth: 1
                        },
                        tickLabels: {
                            fontSize: 6
                        },
                        ticks: {
                            strokeWidth: 1
                        }
                    }}/>
                    <VictoryLine interpolation="stepBefore"style={{data: {strokeWidth: 1 } }} data={song.map(ss => ss.get('syllableList').map((ii, key) => ({x: key, y:ii})).toJS()).orSome([])} />
                </VictoryChart>
                <VictoryChart height={240}>
                    <VictoryAxis/>
                    <VictoryAxis dependentAxis />
                    <VictoryBar
                        horizontal
                        colorScale={"qualitative"}

                        data={song.map(ss => ss.get('syllableCount').map((ii, key) => ({x: key, y:ii})).toList().toJS()).orSome([])}
                    />
                </VictoryChart>



            </div>
            <div>
                <div className="Grid">
                    <div className="Col-">
                        <h2>Most Common Words</h2>
                        <ul>{song.map(ss => ss.get('mostCommonWords').map((ii, key) => <li>{`${key}`} <span style={{opacity: .5}}>{ii}</span></li>)).orSome('-')}</ul>
                    </div>
                    <div className="Col-">
                        <h2>Longest Words</h2>
                        <ul>{song.map(ss => ss.get('longestWords').map((ii, key) => <li>{`${key}`}</li>)).orSome('-')}</ul>
                    </div>
                </div>
            </div>
        </div>
}

var AppHandler = React.createClass({
    displayName: 'AppHandler',
    componentWillMount() {
        this.props.dispatch(requestSong({id: 'baby', lyrics: baby }));
        this.props.dispatch(requestSong({id: 'noneShallPass', lyrics: noneShallPass }));
        this.props.dispatch(requestSong({id: 'memoryLane', lyrics: memoryLane }));
        this.props.dispatch(requestSong({id: 'cosbySweater', lyrics: cosbySweater }));
        this.props.dispatch(requestSong({id: 'stronger', lyrics: stronger }));
    },
    render() {
        var {noneShallPass, memoryLane, stronger, cosbySweater, baby} = this.props;

        return <div>
            <div className="Grid">
                <div className="Col-">
                    <Song song={memoryLane} title="Memory Lane, Nas"/>
                </div>
                <div className="Col-">
                    <Song song={stronger} title="Stronger, Kanye West"/>
                </div>
            </div>
            <div className="Grid">
                <div className="Col-">
                    <Song song={noneShallPass} title="None Shall Pass, Aesop Rock"/>
                </div>
                <div className="Col-">
                    <Song song={baby} title="Baby, Justin Bieber"/>
                </div>
            </div>
        </div>
        ;
    }
});

module.exports = connect(state => {
    return {
        baby: Maybe.fromNull(state.song.get('baby')),
        noneShallPass: Maybe.fromNull(state.song.get('noneShallPass')),
        cosbySweater: Maybe.fromNull(state.song.get('cosbySweater')),
        stronger: Maybe.fromNull(state.song.get('stronger')),
        memoryLane: Maybe.fromNull(state.song.get('memoryLane'))
    }
})(AppHandler);
