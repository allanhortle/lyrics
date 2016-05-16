import React from 'react';
export default function NumberStat(props) {
    return <div className={`NumberStat ${props.className || ''}`}>
        <div className="NumberStat_label">{props.label}</div>
        <div className="NumberStat_value">{props.value}</div>
    </div>;
}
