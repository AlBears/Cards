import "./lobby.scss";
import React, { Component } from "react";

const Lobby = () => {
	return (
		<div className="inner">
			<div className = "sidebar">
				<LobbyContainer/>
			</div>
			<div className = "main">
				<LobbySidebar/>
			</div>
		</div>
	);
	
};

class LobbyContainer extends Component {
	render() {
		return <p>LOBBY</p>;
	}
}

class LobbySidebar extends Component {
	render() {
		return <p>LOBBY SIDEBAR</p>;
	}
}

export default Lobby;