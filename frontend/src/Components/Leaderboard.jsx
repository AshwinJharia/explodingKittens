import { useEffect, useState } from "react";

function Leaderboard() {
	const [playerData, setPlayerData] = useState([]);
	const pollingInterval = 20000;
	const fetchPlayers = async () => {
		try {
			const response = await fetch(`http://localhost:8080/api/leaderboard`, {
				method: "GET",
			});
			const data = await response.json();
			let curr = [];
			for (let key in data) {
				curr.push({ key: key, value: data[key] });
			}
			console.log(curr);
			setPlayerData(curr);
		} catch (error) {
			console.error("Failed to fetch", error);
		}
	};
	useEffect(() => {
		fetchPlayers();
		console.log(playerData);
		
		const interval = setInterval(fetchPlayers, pollingInterval);
		return () => {
			clearInterval(interval);
		};
	}, []);
	return (
		<div className="leaderboard">
			<h2>Leaderboard: </h2>
			<table id="leaderboard">
				<thead>
					<tr>
						<th>Player</th>
						<th>Score</th>
		
					</tr>
				</thead>
				<tbody>
					{playerData && 
					playerData.map(player => (
						<tr key={player.key}>
							<td>{player.key}</td>
							<td>{player.value}</td>
						</tr>
					))
				}
				</tbody>
			</table>
		</div>
	);
}

export default Leaderboard;
