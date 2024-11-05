import { useDispatch, useSelector } from "react-redux";
import { selectGameStatus } from "../state/gameSlice";
import { useEffect } from "react";
import { changeUser, incrementScore, selectCurrentScore, selectCurrentUserId, } from "../state/userSlice";

function Score() {
	const gameStatus = useSelector(selectGameStatus);
	const score = useSelector(selectCurrentScore);
	// const updateScore= useSelector(updateScore)
	const currentUserId = useSelector(selectCurrentUserId);
	const dispatch = useDispatch();
	const apiUrl = import.meta.env.VITE_API_URL;

	const updateScore = async () => {
		try {
         const reqBody = {entityId: currentUserId, score};
         if(gameStatus === "won") {
            reqBody.score++;
         };

			const response = await fetch(`${apiUrl}/api/user`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(reqBody),
			});
         const user = await response.json();
		 
		 
         dispatch(changeUser(user));
		} catch (error) {
         console.log(error);
      }
	};

	useEffect(() => {
		if (gameStatus === "won" || gameStatus === "lost") {
			
			if (gameStatus === "won") {
				dispatch(incrementScore());
				updateScore();
			}
			// if (currentUserId) updateScore();
		}
	}, [gameStatus]);
	return (
		<div className="currentScore">
			<span>Score: {score}</span>
		</div>
	);
}

export default Score;
