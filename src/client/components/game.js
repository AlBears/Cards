import "./game.scss";
import React from "react";
import { ContainerBase } from '../lib/component';

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

class GameContainer extends ContainerBase {
	render() {
		return <p>GAME</p>;
	}
}

class GameSidebar extends ContainerBase {
	render() {
		return <p>Game SIDEBAR</p>;
	}
}

export default Game;
