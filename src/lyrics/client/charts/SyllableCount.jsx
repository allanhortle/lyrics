import React from 'react';
import {AxisStyle, BarStyle} from 'lyrics/client/charts/ChartTheme';
import { VictoryChart, VictoryStack, VictoryBar, VictoryAxis} from "victory";

export default function SyllableCount(props) {
    return <div>
        <VictoryChart padding={25}>
            <VictoryAxis
                style={AxisStyle}
                domain={[0.5, 4.5]}
                tickFormat={Math.round}
            />
            <VictoryAxis
                style={AxisStyle}
                dependentAxis
            />
            <VictoryBar
                style={BarStyle}
                colorScale={"qualitative"}
                data={props.song.map(ss => ss.get('syllableCount').map((ii, key) => ({x: key, y:ii})).toList().toJS()).orSome([])}
            />
        </VictoryChart>
        <VictoryStack horizontal padding="0" height="80">
            {props.song.map(ss => ss.get('syllableCount').toList().sort().reverse().map((ii, key) => <VictoryBar style={BarStyle} data={[{x: 20, y: ii}]}/>).toJS()).orSome([])}
        </VictoryStack>
    </div>
}
