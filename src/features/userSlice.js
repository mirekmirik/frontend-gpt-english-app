import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/constants";
import { addPhrases, setIsServerPhrases, setAllPhrasesByDB } from './phrasesSlice'

export const createUser = createAsyncThunk('users/createUser', async (payload, thunkAPI) => {
    try {
        const res = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        if (!res.ok) {
            const data = await res.json()
            throw new Error(data.error)
        }

        const data = await res.json()
        return data.success


    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
        // const jsonMessage = JSON.parse(error.message)
        // return thunkAPI.rejectWithValue(jsonMessage.error)
    }
})


export const loginUser = createAsyncThunk('users/loginUser', async (payload, thunkAPI) => {
    try {
        const res = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        if (!res.ok) {
            const data = await res.json()
            throw new Error(JSON.stringify(data))
        }

        const data = await res.json()
        return data.user

    } catch (error) {
        const jsonMessage = JSON.parse(error.message)
        return thunkAPI.rejectWithValue(jsonMessage.error)

    }
})

export const getUser = createAsyncThunk('users/getUser', async (payload, thunkAPI) => {
    try {
        const res = await fetch(`${BASE_URL}/user/${payload}`)
        if (!res.ok) {
            const data = await res.json()
            throw new Error(data.error)

            // throw new Error(JSON.stringify(data))
        }

        const user = await res.json()
        const allPhrases = user.phrasesWithDate.flatMap((data) => data.phrases.map(({ phrase }) => phrase));
        thunkAPI.dispatch(setAllPhrasesByDB(allPhrases));
        const today = new Date();
        const todayString = today.toISOString().substring(0, 10);
        if (user.phrasesWithDate.length > 0) {
            const lastDateInDB = user.phrasesWithDate.at(-1).date.substring(0, 10);
            // if phrases already launched today
            if (todayString === lastDateInDB) {
                const phrases = user.phrasesWithDate.at(-1).phrases;
                thunkAPI.dispatch(setIsServerPhrases(true));
                thunkAPI.dispatch(addPhrases(phrases));
            }
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)

        // const jsonMessage = JSON.parse(error.message);
        // return thunkAPI.rejectWithValue(jsonMessage.error);
    }
});


export const updateUser = createAsyncThunk('users/updateUser', async (payload, thunkAPI) => {
    try {
        const res = await fetch(`${BASE_URL}/user/${payload.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: payload.login,
                password: payload.password,
                newPassword: payload.newPassword,
                englishLvl: payload.englishLvl,
            })
        })

        if (!res.ok) {
            const data = await res.json()
            throw new Error(data.error)
        }

        const data = await res.json()
        return data

    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const postEnglishLvl = createAsyncThunk('users/postEnglishLvl', async (payload, thunkAPI) => {
    try {
        const res = await fetch(`${BASE_URL}/englishlvl`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: payload.login,
                englishLvl: payload.englishLvl
            })
        })

        if (!res.ok) {
            const data = await res.json()
            throw new Error(data.error)
            // const data = await res.json()
            // throw new Error(JSON.stringify(data))
        }

        const data = await res.json()
        return data

    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)

        // const jsonMessage = JSON.parse(error.message)
        // return thunkAPI.rejectWithValue(jsonMessage.error)
    }
})




const initialState = {
    currentUser: null,
    isLoading: false,
    errorMessage: null,
    successMessage: null
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        addEnglishLvl: (state, { payload }) => {
            state.currentUser.englishLvl = payload
        },
        logoutUser: (state, { payload }) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        // Register User
        builder.addCase(createUser.pending, (state, { payload }) => {
            state.isLoading = true
            state.successMessage = null
            state.errorMessage = null
        })
        builder.addCase(createUser.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.successMessage = payload
            state.errorMessage = null
        })
        builder.addCase(createUser.rejected, (state, { payload }) => {
            state.isLoading = false
            state.successMessage = null
            state.errorMessage = payload
        })
        // Login User
        builder.addCase(loginUser.pending, (state, { payload }) => {
            state.currentUser = null
            state.isLoading = true
            state.errorMessage = null
        })
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state.currentUser = payload
            state.isLoading = false
            state.errorMessage = null
        })
        builder.addCase(loginUser.rejected, (state, { payload }) => {
            state.currentUser = null
            state.isLoading = false
            state.errorMessage = payload
        })
        // Get User
        builder.addCase(getUser.pending, (state) => {
            state.isLoading = true;
            state.errorMessage = null;
        })
        builder.addCase(getUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
        })
        builder.addCase(getUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.errorMessage = payload;
        });
        // Update User
        builder.addCase(updateUser.pending, (state) => {
            state.isLoading = true;
            state.errorMessage = null;
        })
        builder.addCase(updateUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.currentUser = payload
        })
        builder.addCase(updateUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.errorMessage = payload;
        });

        // Post English Lvl
        builder.addCase(postEnglishLvl.pending, (state, { payload }) => {
            state.isLoading = true
            state.errorMessage = null
        })

        builder.addCase(postEnglishLvl.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.currentUser.englishLvl = payload
            state.errorMessage = null
        })

        builder.addCase(postEnglishLvl.rejected, (state, { payload }) => {
            state.isLoading = false
            state.currentUser.englishLvl = null
            state.errorMessage = payload
        })

    }
})

export const resetAll = () => (dispatch) => {
    dispatch({ type: "RESET" })
}

export const { addEnglishLvl, logoutUser } = userSlice.actions
export default userSlice.reducer