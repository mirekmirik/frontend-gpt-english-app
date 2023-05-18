import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import speechSlice from "./speechSlice";
import phrasesSlice from "./phrasesSlice";
import gameSlice from "./gameSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        speech: speechSlice,
        phrases: phrasesSlice,
        game: gameSlice
    }
})