import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../hooks/useAuth.jsx";
import LoginForm from "./Auth/LoginForm";
import RegisterForm from "./Auth/RegisterForm";
import { showToast } from "./Toast";
import { resetUser, changeUser } from "../state/userSlice";
import config from "../config/env";

function UserSt() {
	const { user, isAuthenticated, logout } = useAuth();
	const dispatch = useDispatch();
	const [showAuth, setShowAuth] = useState(false);
	const [isLogin, setIsLogin] = useState(true);

	// Debug log
	console.log('UserSt - isAuthenticated:', isAuthenticated, 'user:', user);

	const handleAuthSuccess = async (userData) => {
		// Get user's current score from backend
		try {
			const token = localStorage.getItem('token');
			const response = await fetch(`${config.API_URL}/api/game/user/${userData.username}`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			
			if (response.ok) {
				const result = await response.json();
				const userScore = result.data?.score || result.score || 0;
				
				dispatch(changeUser({
					entityId: userData.id,
					username: userData.username,
					score: userScore
				}));
			} else {
				// Fallback to user data from auth response
				dispatch(changeUser({
					entityId: userData.id,
					username: userData.username,
					score: userData.score || 0
				}));
			}
		} catch (error) {
			console.error('Failed to fetch user score:', error);
			dispatch(changeUser({
				entityId: userData.id,
				username: userData.username,
				score: userData.score || 0
			}));
		}
		
		dispatch({ type: 'game/quitGame' });
		setShowAuth(false);
	};

	const toggleAuthMode = () => {
		setIsLogin(!isLogin);
	};

	if (showAuth) {
		return (
			<div className="auth-container">
				{isLogin ? (
					<LoginForm onSuccess={handleAuthSuccess} onToggle={toggleAuthMode} />
				) : (
					<RegisterForm onSuccess={handleAuthSuccess} onToggle={toggleAuthMode} />
				)}
				<button className="btn btn-secondary" onClick={() => setShowAuth(false)}>Cancel</button>
			</div>
		);
	}

	return (
		<div className="form">
			<span className="formLabel">
				{isAuthenticated && user
					? `Playing as ${user.username}` 
					: `Playing as Guest (Score not saved)`
				}
			</span>
			<div className="formInput">
				{isAuthenticated && user ? (
					<button className="btn btn-secondary" onClick={() => {
						logout();
						dispatch(resetUser());
						dispatch({ type: 'game/quitGame' });
						showToast('Logged out successfully! 👋', 'info');
					}}>Logout</button>
				) : (
					<button className="btn btn-primary" onClick={() => setShowAuth(true)}>Login / Register</button>
				)}
			</div>
		</div>
	);
}

export default UserSt;