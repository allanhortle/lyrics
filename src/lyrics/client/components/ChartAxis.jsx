import React from 'react';
import {VictoryAxis} from "victory";

export default function ChartAxis(props) {
    var style = {
        axis: {
            strokeWidth: 1
        },
        tickLabels: {
            fontSize: 6
        },
        ticks: {
            strokeWidth: 1
        }
    };

    return <VictoryAxis {...props} style={style}/>;
}

