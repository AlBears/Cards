import "./client.scss";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import AppContainer from './components/app';
import {Dispatcher} from "shared/dispatcher";
import * as A from "./actions";
import createStores from "./stores";

// ----------------------------
// Services
const dispatcher = new Dispatcher();
const services = { dispatcher };

// ----------------------------
// Stores
const stores = createStores(services);


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



