import "./game.scss";
import React, { Component } from "react";

const Game = () => {
	return (
		<div className="inner">
			<div className = "sidebar">
				<GameContainer/>
			</div>
			<div className = "main">
				<GameSidebar/>
			</div>
		</div>
	);
	
};

class GameContainer extends Component {
	render() {
		return <p>GAME</p>;
	}
}

class GameSidebar extends Component {
	render() {
		return <p>Game SIDEBAR</p>;
	}
}

export default Game;
