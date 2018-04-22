import "./lobby.scss";
import React, { Component } from "react";

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

class LobbyContainer extends Component {
	constructor(props) {
		super(props);

		this._joinGame = (game) => {
			console.log(`TODO: JOIN GAME ${game.title}`);
		};
	}
	render() {
		const games = [
			{title:"game1", id:1, players:["one", "two", "three"]},
			{title:"game2", id:2, players:["one", "two", "three"]},
			{title:"game3", id:3, players:["one", "two", "three"]},
			{title:"game4", id:4, players:["one", "two", "three"]}
		];

		return (
			<div className="c-lobby">
				<GameList games={games} joinGame={this._joinGame}/>
			</div>
		);
	}
}

class LobbySidebar extends Component {
	constructor(props) {
		super(props);

		this._login = () => {
			console.log('TODO: IMPLEMENT LOGIN');
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