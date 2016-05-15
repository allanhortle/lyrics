import React from 'react';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import {createDevTools} from 'redux-devtools';
import Inspector from 'redux-devtools-inspector';

module.exports = createDevTools(
	<DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" defaultPosition="right" defaultIsVisible={true}>
		<Inspector supportImmutable/>
	</DockMonitor>
);
