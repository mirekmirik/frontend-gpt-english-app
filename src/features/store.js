import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import speechSlice from "./speechSlice";
import phrasesSlice from "./phrasesSlice";
import gameSlice from "./gameSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    storage,
}

const appReducer = combineReducers({
    user: userSlice,
    speech: speechSlice,
    phrases: phrasesSlice,
    game: gameSlice
})


const rootReducer = (state, action) => {
    if (action.type === 'RESET') {
        state = undefined
    }

    return appReducer(state, action)
}


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    })
})


export const persistor = persistStore(store)


