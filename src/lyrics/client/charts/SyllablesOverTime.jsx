import React from 'react';
import {AxisStyle, LineStyle} from 'lyrics/client/charts/ChartTheme';
import { VictoryChart, VictoryBar, VictoryLine, VictoryAxis} from "victory";

export default function SyllablesOverTime(props) {
    return <VictoryChart padding={{
        left: 25,
        right: 0,
        top: 25,
        bottom: 25
    }}>
        <VictoryAxis style={AxisStyle} />
        <VictoryAxis
            style={AxisStyle}
            dependentAxis
            domain={[0, 5]}
            tickFormat={Math.round}
        />
        <VictoryLine
            interpolation="step"
            padding={100}
            style={LineStyle}
            tickCount={20}
            data={props.song.map(ss => ss.get('syllableList').map((ii, key) => ({x: key, y:ii})).toJS()).orSome([])}
        />
    </VictoryChart>
}
