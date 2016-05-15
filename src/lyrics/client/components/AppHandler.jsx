import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import memoryLane from 'lyrics/client/memoryLane';
import {requestSong} from 'lyrics/client/song/SongDuck';
import {Maybe} from 'monet';

import { VictoryChart, VictoryBar } from "victory";

var AppHandler = React.createClass({
    displayName: 'AppHandler',
    componentWillMount() {
        this.props.dispatch(requestSong({
            id: 'memoryLane',
            lyrics: memoryLane
        }));
    },
    render() {

        return <div>
            <pre>{JSON.stringify(Maybe.fromNull(this.props.song).flatMap(ii => ii.toJS()), null, 4)}</pre>
            <VictoryBar
                horizontal
                data={this.props.song}
                padding={10}
                style={{
                    labels: {fontSize: 7}
                }}
                height={5000}
            />
        </div>;
    }
});

module.exports = connect(state => {
    return {
        song: state.song.get('memoryLane')
    }
})(AppHandler);
