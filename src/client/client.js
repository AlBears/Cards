import "./client.scss";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import AppContainer from './components/app';

// ----------------------------
// Render
ReactDOM.render(
	<BrowserRouter>
		<AppContainer/>
	</BrowserRouter>, 
	document.getElementById('mount'));


// ----------------------------
// Misc
if(module.hot) {
	module.hot.accept('./components/app', () => {
		const NextApp = require('./components/app').default;
		ReactDOM.render(
			<BrowserRouter>
				<NextApp/>
			</BrowserRouter>, 
			document.getElementById('mount'));
	});
}

// ----------------------------
// Go!



