import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
	entityId: null,
	username: `RandomPlayer${Math.floor(Math.random() * 1000)}`,
	score: 0,
};

const userSlice = createSlice({
	name: "user",
	initialState: initialUserState,
	reducers: {
		changeUser: (state, action) => {
			return {
				...action.payload,
				score: action.payload.score || 0
			};
		},
		incrementScore: (state) => {
			state.score = (state.score || 0) + 1;
		},
		updateScore: (state) => {
			state.score += 1;
		},
		resetUser: () => initialUserState,
	},
});

export const {incrementScore, changeUser, updateScore, resetUser} =
	userSlice.actions;
	
export default userSlice.reducer;
export const selectCurrentUser = (state) => state.user.username;
export const selectCurrentScore = (state) => state.user.score;
export const selectCurrentUserId = (state) => state.user.entityId;
