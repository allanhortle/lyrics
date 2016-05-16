import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Maybe} from 'monet';
import {requestSong} from 'lyrics/client/song/SongDuck';

import baby from 'lyrics/client/baby';
import cosbySweater from 'lyrics/client/cosbySweater';
import memoryLane from 'lyrics/client/memoryLane';
import noneShallPass from 'lyrics/client/noneShallPass';
import SongChart from 'lyrics/client/components/SongChart';
import stronger from 'lyrics/client/stronger';

function RenderMaybe(props) {
    var map = props.map || function(ii) {return ii};
    return props.monad.map(map).orSome(props.orSome);
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
                    <SongChart song={memoryLane} title="Memory Lane, Nas"/>
                </div>
                <div className="Col-">
                    <SongChart song={stronger} title="Stronger, Kanye West"/>
                </div>
            </div>
            <div className="Grid">
                <div className="Col-">
                    <SongChart song={noneShallPass} title="None Shall Pass, Aesop Rock"/>
                </div>
                <div className="Col-">
                    <SongChart song={baby} title="Baby, Justin Bieber"/>
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
