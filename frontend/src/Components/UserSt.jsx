import { useDispatch, useSelector } from "react-redux";
import { changeUser, selectCurrentUser, selectCurrentUserId, } from "../state/userSlice";
import { useState } from "react";

function UserSt() {
	const currentUser = useSelector(selectCurrentUser);
	const currentUserId = useSelector(selectCurrentUserId);
	const dispatch = useDispatch();
	const apiUrl = import.meta.env.VITE_API_URL;
	const [isUserStActive, setIsUserStActive] = useState(false);
	const [username, setUsername] = useState(currentUser);

	const handleSubmit = async () => {
		try {
			const response = await fetch(`${apiUrl}/api/user`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ "Username" : username }),
			});
			const userData = await response.json();
			setUsername(userData.userName)
			dispatch(changeUser(userData));
			setIsUserStActive(false);
		} catch (error) {}
	};

	return (
		<div className="form">
			<span className="formLabel">
				{`You are currently playing as ${currentUser}`}
				{!currentUserId && ", your score won't be saved."}
			</span>
			<div className="formInput">
				{isUserStActive && (
					<>
						<input
							type="text"
							name="username"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<button aria-label="change username" onClick={handleSubmit}>
							Change user
						</button>
					</>
				)}
				<button
					aria-label="show input form"
					onClick={() => setIsUserStActive(!isUserStActive)}
				>
					{!isUserStActive ? "Change user" : "Cancel"}
				</button>
			</div>
		</div>
	);
}

export default UserSt;
