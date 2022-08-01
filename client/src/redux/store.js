import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
import cardReducer from "./reducer/cardReducer";
import loginReducer from "./reducer/loginReducer";
import profileReducer from "./reducer/profileReducer";
import registerReducer from "./reducer/registerReducer";
import userReducer from "./reducer/userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  login: loginReducer,
  register: registerReducer,
  card: cardReducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
