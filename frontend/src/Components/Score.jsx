import { useDispatch, useSelector } from "react-redux";
import { selectGameStatus, selectScoreProcessed, markScoreProcessed } from "../state/gameSlice";
import { useEffect } from "react";
import { incrementScore, selectCurrentScore } from "../state/userSlice";
import { useAuth } from "../hooks/useAuth.jsx";
import config from "../config/env";
import { showToast } from "./Toast";

function Score() {
	const gameStatus = useSelector(selectGameStatus);
	const scoreProcessed = useSelector(selectScoreProcessed);
	const score = useSelector(selectCurrentScore) || 0;
	const { user, isAuthenticated } = useAuth();
	const dispatch = useDispatch();

	const updateBackendScore = async (newScore) => {
		if (!isAuthenticated || !user?.username) {
			console.log('Skipping backend update - not authenticated or no username');
			return;
		}
		
		console.log('Updating backend score:', { username: user.username, score: newScore });
		
		try {
			const url = `${config.API_URL}/api/game/user`;
			console.log('Making request to:', url);
			
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: user.username,
					email: user.email || "temp@example.com", // Provide required field
					password: "temppass123", // Provide required field
					score: newScore
				})
			});
			
			console.log('Response status:', response.status);
			
			if (!response.ok) {
				const error = await response.json();
				console.error('Backend error:', error);
				throw new Error(error.message || `HTTP ${response.status}`);
			}
			
			const result = await response.json();
			console.log('Backend response:', result);
			showToast('Score saved successfully! 🎉', 'success');
		} catch (error) {
			console.error('Failed to update score:', error);
			showToast(`Failed to save score: ${error.message}`, 'error');
		}
	};

	useEffect(() => {
		if (gameStatus === "won" && !scoreProcessed) {
			dispatch(incrementScore());
			dispatch(markScoreProcessed());
			updateBackendScore(score + 1);
		}
	}, [gameStatus, scoreProcessed, dispatch, score, isAuthenticated, user]);

	return (
		<div className="score">
			<h3>🏆 Score</h3>
			<h2>{score}</h2>
			{isAuthenticated ? (
				<p className="score-subtitle">Playing as {user?.username}</p>
			) : (
				<p className="score-subtitle">Guest Mode - Score not saved</p>
			)}
		</div>
	);
}

export default Score;