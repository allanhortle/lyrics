import { combineReducers } from 'redux';
import SongDuck from 'lyrics/client/song/SongDuck';

export default combineReducers({
    song: SongDuck
});
