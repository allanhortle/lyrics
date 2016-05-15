import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import memoryLane from 'lyrics/client/memoryLane';
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
    return <div>
            <h1>{props.title}</h1>
            <div className="Grid">
                <div className="Col-">
                    <div>Word Count</div>
                    <h1>{song.map(ss => ss.get('words')).orSome('-')}</h1>
                </div>
                <div className="Col-">
                    <div>Unique Words</div>
                    <h1>{song.map(ss => ss.get('wordsUnique')).orSome('-')}</h1>
                </div>
                <div className="Col-">
                    <div>Words Repeated</div>
                    <h1>{song.map(ss => ss.get('wordsRepeated')).orSome('-')}</h1>
                </div>
                <div className="Col-">
                    <div>Words Used Once</div>
                    <h1>{song.map(ss => ss.get('wordsUsedOnce')).orSome('-')}</h1>
                </div>
            </div>
            <div>
                <h2>Syllables</h2>
                <VictoryChart height={120} padding={{left: 24, right: 0, top: 16, bottom: 0}} domainPadding={8}>
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
                    <VictoryBar
                        data={song.map(ss => ss.get('syllableList').map((ii, key) => ({x: key, y:ii})).toJS()).orSome([])}
                        style={{
                            data: {
                                fill: 'rgb(28, 65, 84)',
                                width: .1,
                                padding: 0
                            }
                        }}
                    />
                </VictoryChart>
            </div>
            <div>
                <h2>Most Common Words</h2>
                <ul>{song.map(ss => ss.get('mostCommonWords').map((ii, key) => <li>{`${key}`}</li>)).orSome('-')}</ul>
            </div>
        </div>
}

var AppHandler = React.createClass({
    displayName: 'AppHandler',
    componentWillMount() {
        this.props.dispatch(requestSong({id: 'noneShallPass', lyrics: noneShallPass }));
        this.props.dispatch(requestSong({id: 'memoryLane', lyrics: memoryLane }));
        this.props.dispatch(requestSong({id: 'cosbySweater', lyrics: cosbySweater }));
        this.props.dispatch(requestSong({id: 'stronger', lyrics: stronger }));
    },
    render() {
        var {noneShallPass, memoryLane} = this.props;

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
                    <Song song={cosbySweater} title="Cosby Sweater, Hilltop Hoods"/>
                </div>
            </div>
        </div>
        ;
    }
});

module.exports = connect(state => {
    return {
        noneShallPass: Maybe.fromNull(state.song.get('noneShallPass')),
        cosbySweater: Maybe.fromNull(state.song.get('cosbySweater')),
        stronger: Maybe.fromNull(state.song.get('stronger')),
        memoryLane: Maybe.fromNull(state.song.get('memoryLane'))
    }
})(AppHandler);
