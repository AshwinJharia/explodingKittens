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
		changeUser: (state, action) => action.payload,
		incrementScore: (state) => {
			state.score += 1;
		},
		updateScore: (state) => {
			state.score += 1;
		},
	},
});

export const {incrementScore, changeUser,updateScore} =
	userSlice.actions;
	
export default userSlice.reducer;
export const selectCurrentUser = (state) => state.user.username;
export const selectCurrentScore = (state) => state.user.score;
export const selectCurrentUserId = (state) => state.user.entityId;
