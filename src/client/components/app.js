import './app.scss';

import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Lobby from './lobby';
import Game from './game';

class AppContainer extends Component {
	componentDidMount() {
		console.log('HEY THERE 23232323');
	}
	render() {
		return (
			<div className = { 'c-application' }>	
				<Switch>
					<Route exact path='/' component = { Lobby }/>
					<Route path='/game/:gameId' component = { Game }/>
					<Redirect path="*" to="/" />
				</Switch>
			</div>
		);
	}
}
export default AppContainer;

