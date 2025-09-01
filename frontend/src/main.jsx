import React from "react";
import ReactDOM from "react-dom/client";
import { registerServiceWorker } from "./utils/pwaUtils";
import App from "./App";
import "./styles/global.css";
import "./styles/animations.css";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import game from "./state/gameSlice";
import user from "./state/userSlice";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "./hooks/useAuth.jsx";

const rootReducer = combineReducers({
	game,
	user,
});

const persistConfig = {
	key: "root",
	storage,
	version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
	devTools: import.meta.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={<div>Loading...</div>}>
				<AuthProvider>
					<App />
				</AuthProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);

registerServiceWorker();