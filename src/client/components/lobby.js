import "./lobby.scss";
import React from "react";
import * as A from '../actions';
import { ContainerBase } from '../lib/component';
import Chat from './chat';

const Lobby = () => {
	return (
		<div className="inner">
			<div className = "sidebar">
				<LobbySidebar/>
			</div>
			<div className = "main">
				<LobbyContainer/>
			</div>
		</div>
	);
	
};

class LobbyContainer extends ContainerBase {

	constructor(props) {
		super(props);

		this._joinGame = (game) => {
			console.log(`TODO: JOIN GAME ${game.title}`);
		};

		this._sendMessage = (message) => {
			console.log(`Sending ${message}`);
		};
	}
	render() {
		const games = [
			{title:"game1", id:1, players:["one", "two", "three"]},
			{title:"game2", id:2, players:["one", "two", "three"]},
			{title:"game3", id:3, players:["one", "two", "three"]},
			{title:"game4", id:4, players:["one", "two", "three"]}
		];

		const opSendMessage = {can:true, inProgress:false};
		const messages = [
			{index:1, name:"Person", message:"Hello"},
			{index:2, name:"Person2", message:"ddfdfdf"},
			{index:3, name:"Person3", message:"yuuyyuyyuy"},
			{index:4, name:"Person4", message:"jkkjkjkjk"},
			{index:5, name:"Person5", message:"9o99o9o9oo9"},
		];

		return (
			<div className="c-lobby">
				<GameList games={games} joinGame={this._joinGame}/>
				<Chat messages={messages} 
					opSendMessage={opSendMessage}
					sendMessage={this._sendMessage}
				/>
			</div>
		);
	}
}

class LobbySidebar extends ContainerBase {
	constructor(props) {
		super(props);

		this._login = () => {
			this.dispatch(A.dialogSet(A.DIALOG_LOGIN, true));
		};

		this._createGame = () => {
			console.log('TODO: CREATE GAME');
		};

	}
	render() {
		const canLogin = true;
		const canCreateGame = true;
		const createGameInProgress = false;

		return (
			<section className = 'c-lobby-sidebar'>
				<div className = "m-sidebar-buttons">
					{!canLogin ? null :
						<button className = "m-button primary" onClick={this._login}>Login</button>}

					{!canCreateGame ? null : 
						<button
							onClick={this._createGame}
							disabled={createGameInProgress}
							className="m-button good">
							Create Game
						</button>}
				</div>
			</section>
		);
	}
}

function GameList({games, joinGame}) {
	return (
		<section className="c-game-list">
			{games.length > 0 ? null : 
				<div className="no-games">There are no games yet :(</div>}

			{games.map(game => 
				<div className="game" key={game.id} onClick={() => joinGame(game)}>
					<div className="title">{game.title}</div>
					<div className="players">
						{game.players.join(", ")}
					</div>
					<div className="join-game">Join Game</div>
				</div>)}
		</section>
	);
}



export default Lobby;