import { useDispatch, useSelector } from "react-redux";
import { initGame, quitGame, selectGameStatus } from "../state/gameSlice";

function Status() {
	const gameStatus = useSelector(selectGameStatus);
	const dispatch = useDispatch();

	const getStatusMessage = () => {
		switch (gameStatus) {
			case "idle":
				return "Ready to play? Click Start to begin!";
			case "ongoing":
				return "Draw a card... but watch out for exploding kittens! 💥";
			case "won":
				return "🎉 Congratulations! You survived all the kittens!";
			case "lost":
				return "💥 BOOM! You drew an exploding kitten!";
			default:
				return "";
		}
	};

	const getButtonText = () => {
		if (gameStatus === "idle") return "🚀 Start Game";
		if (gameStatus === "ongoing") return "🔄 Restart";
		return "🎮 Play Again";
	};

	const getStatusClass = () => {
		return `status ${gameStatus}`;
	};

	return (
		<div className={getStatusClass()}>
			<div className="status-content">
				<p className="status-message">{getStatusMessage()}</p>
				<div className="status-buttons">
					<button 
						className="btn btn-primary"
						onClick={() => dispatch(initGame())}
					>
						{getButtonText()}
					</button>
					{gameStatus === "ongoing" && (
						<button 
							className="btn btn-secondary"
							onClick={() => dispatch(quitGame())}
						>
							🏃 Quit Game
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Status;