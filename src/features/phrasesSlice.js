import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../utils/constants"



export const getTopWords = createAsyncThunk('phrases/getTopWords', async (_, thunkAPI) => {
    const { phrases } = thunkAPI.getState()
    const phrasesArr = [...phrases.phrases.map(({ phrase }) => phrase), ...phrases.allPhrases]


    try {
        const res = await fetch(`${BASE_URL}/topwords`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phrases: phrasesArr.join(', ')
            })
        })

        if (!res.ok) {
            const data = await res.json()
            throw new Error(JSON.stringify(data))
        }

        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)

        const jsonMessage = JSON.parse(error.message);
        return thunkAPI.rejectWithValue(jsonMessage.error);
    }


})


export const sendToDBTopWords = createAsyncThunk('phrases/sendToDBTopWords', async (_, thunkAPI) => {
    try {
        const { phrases, user } = thunkAPI.getState()
        const res = await fetch(`${BASE_URL}/sendPhrases`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                login: user.currentUser.login,
                phrases: phrases.phrases
            })
        })

        if (!res.ok) {
            const data = await res.json()
            throw new Error(JSON.stringify(data))
        }
    } catch (error) {
        console.log(error)
        const jsonMessage = JSON.parse(error.message);
        return thunkAPI.rejectWithValue(jsonMessage.error);
    }

})



const initialState = {
    phrases: [],
    isServerPhrases: false,
    allPhrases: [],
    isLoading: false,
    errorMessage: null
}

export const destructiveText = (text) => {
    const phraseStart = text.indexOf('"') + 1
    const phraseEnd = text.indexOf('"', phraseStart)
    const exampleStart = text.indexOf('"', phraseEnd + 1) + 1
    const exampleEnd = text.indexOf('"', exampleStart)

    const phrase = text.slice(phraseStart, phraseEnd); // Extract the phrase text
    const example = text.slice(exampleStart, exampleEnd); // Extract the example text
    return {
        phrase, example
    }
}


const phrasesSlice = createSlice({
    name: 'phrases',
    initialState,
    reducers: {
        addPhrases: (state, { payload }) => {
            state.phrases.push(...payload)
        },
        setIsServerPhrases: (state, { payload }) => {
            state.isServerPhrases = payload
        },
        setAllPhrasesByDB: (state, { payload }) => {
            state.allPhrases = payload
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getTopWords.pending, (state, { payload }) => {
            state.isLoading = true
            state.errorMessage = null
        })
        builder.addCase(getTopWords.fulfilled, (state, { payload }) => {
            const result = destructiveText(payload.completion.content)
            state.phrases.push(result)
            state.isLoading = false
            state.errorMessage = null
        })

        builder.addCase(getTopWords.rejected, (state, { payload }) => {
            state.isLoading = false
            state.errorMessage = payload
        })

        // Send Words to DB
        builder.addCase(sendToDBTopWords.pending, (state, { payload }) => {
            state.isLoading = true
            state.errorMessage = null
        })
        builder.addCase(sendToDBTopWords.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.errorMessage = null
        })

        builder.addCase(sendToDBTopWords.rejected, (state, { payload }) => {
            state.isLoading = false
            state.errorMessage = payload
        })
    }
})


export const { addPhrases, setIsServerPhrases, setAllPhrasesByDB } = phrasesSlice.actions
export default phrasesSlice.reducer

