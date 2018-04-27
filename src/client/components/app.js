import './app.scss';

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {ContainerBase} from "../lib/component";
import dialogTypes from './dialogs';

import Lobby from './lobby';
import Game from './game';

class AppContainer extends ContainerBase {
	componentDidMount() {
		console.log('CHECK');
		const {stores: {app}} = this.context;
		this.subscribe(app.dialogs$, dialogs => this.setState({dialogs}));
	}
	render() {
		console.log(this.state && this.state.dialogs);
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

