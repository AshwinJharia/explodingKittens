import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentScore } from "../state/userSlice";
import config from "../config/env";

function Leaderboard() {
	const [playerData, setPlayerData] = useState([]);
	const [loading, setLoading] = useState(true);
	const currentScore = useSelector(selectCurrentScore);

	const fetchLeaderboard = async () => {
		try {
			const response = await fetch(`${config.API_URL}/api/game/leaderboard`);
			if (response.ok) {
				const result = await response.json();
				const data = result.data || result; // Handle both wrapped and direct responses
				let players = Object.entries(data)
					.map(([username, score]) => ({ username, score }))
					.sort((a, b) => b.score - a.score); // Sort by score descending
				
				// Assign proper ranks (handle ties)
				let currentRank = 1;
				players = players.map((player, index) => {
					if (index > 0 && player.score < players[index - 1].score) {
						currentRank = index + 1;
					}
					return {
						...player,
						rank: currentRank
					};
				});
				
				setPlayerData(players);
			}
		} catch (error) {
			console.error("Failed to fetch leaderboard:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchLeaderboard();
		const interval = setInterval(fetchLeaderboard, 30000);
		return () => clearInterval(interval);
	}, []);

	// Refresh leaderboard when user's score changes
	useEffect(() => {
		if (currentScore > 0) {
			setTimeout(fetchLeaderboard, 1000); // Small delay to ensure backend is updated
		}
	}, [currentScore]);

	const getRankEmoji = (rank) => {
		switch (rank) {
			case 1: return "🥇";
			case 2: return "🥈";
			case 3: return "🥉";
			default: return "🏅";
		}
	};

	return (
		<div className="leaderboard">
			<h3>🏆 Leaderboard</h3>
			{loading ? (
				<div className="loading">Loading...</div>
			) : (
				<div className="leaderboard-list">
					{playerData.length > 0 ? (
						playerData.slice(0, 10).map((player) => (
							<div 
								key={player.username} 
								className={`leaderboard-item ${player.rank <= 3 ? 'top-3' : ''}`}
							>
								<div className="player-info">
									<span className="rank">{getRankEmoji(player.rank)}</span>
									<span className="username">{player.username}</span>
								</div>
								<span className="score">{player.score}</span>
							</div>
						))
					) : (
						<div className="no-data">No players yet. Be the first!</div>
					)}
				</div>
			)}
		</div>
	);
}

export default Leaderboard;