import React from 'react';
import NumberStat from 'lyrics/client/components/NumberStat';
import ChartAxis from 'lyrics/client/components/ChartAxis';
import SyllablesOverTime from 'lyrics/client/charts/SyllablesOverTime';
import SyllableCount from 'lyrics/client/charts/SyllableCount';
import { VictoryChart, VictoryBar, VictoryLine, VictoryAxis} from "victory";

export default function SongChart(props) {
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
                <div className="Grid Grid-tighter margin-row2">
                    <NumberStat className="Col-" label="Total Words" value={getValue('words')}/>
                    <NumberStat className="Col-" label="Unique Words" value={getValue('wordsUnique')}/>
                    <NumberStat className="Col-" label="Words Repeated" value={getValue('wordsRepeated')}/>
                    <NumberStat className="Col-" label="Words Used Once" value={getValue('wordsUsedOnce')}/>
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
            <div>
                <h2>Syllables</h2>
                <SyllablesOverTime song={song} />
            </div>
        </div>
}
