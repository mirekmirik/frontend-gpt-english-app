import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/constants";


const initialState = {
    category: '',
    score: null,
    hideMode: false,
    incorrectAnswers: null,
    correctAnswers: null,
    correct: false,
    incorrect: false,
    messages: [],
    questionMessage: '',
    questionOptions: {},
    isLoading: false,
    error: null
}


export const getNewGeneralQuestion = createAsyncThunk('game/generalQuestion', async (payload, thunkAPI) => {

    const { game } = thunkAPI.getState()

    try {
        const res = await fetch(`${BASE_URL}/completions`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: payload
            })
        })

        if (!res.ok) {
            const data = await res.json()
            throw new Error(JSON.stringify(data))
        }

        const data = await res.json()
        const fullMessage = data.completion.content
        const fullMessageToLowerCase = fullMessage.toLowerCase()

        if (fullMessageToLowerCase.split(' ').includes('wrong!') || fullMessageToLowerCase.split(' ').includes('again')) {
            thunkAPI.dispatch(setIncorrect(true))
            thunkAPI.dispatch(setCorrect(false))
            thunkAPI.dispatch(decrementScore(3))
        } else {
            if (game.messages.length > 2) {
                thunkAPI.dispatch(setCorrect(true))
                thunkAPI.dispatch(setIncorrect(false))
                thunkAPI.dispatch(incrementScore(5))
            }
            const question = fullMessage.substring(fullMessage.indexOf('Question:'), fullMessage.indexOf('A)'))
            const options = fullMessage.substring(fullMessage.indexOf('A)'))
            const optionsArr = options.split('\n')
            const formattedOptions = {}
            optionsArr.forEach((option) => {
                const [key, value] = option.split(')')
                if (key.trim() == 'A' || key.trim() == 'B' || key.trim() == 'C' || key.trim() == 'D') {
                    formattedOptions[key.trim()] = value
                };
                return;
            })
            thunkAPI.dispatch(setQuestionMessage(question))
            thunkAPI.dispatch(setQuestionOptions(formattedOptions))
        }
        const newAssistMessage = {
            "role": "assistant", "content": `${fullMessage}`
        }
        thunkAPI.dispatch(setMessages(newAssistMessage))

    } catch (error) {
        const jsonMessage = JSON.parse(error.message);
        return thunkAPI.rejectWithValue(jsonMessage.error);
    }
})

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setCategory: (state, { payload }) => {
            state.category = payload
        },
        pretendRole: (state, { payload }) => {
            const newMessage = {
                "role": "user", "content": `Imagine that you are an programmed electronic textbook in English ${payload.englishLvl} lvl on ${payload.category} thematic, you know only words like "Wrong! Try again." and "Correct! Next Question" and you write 1 test question, with 4 possible answers, 1 of them is only correct. In case of an incorrect answer, you must answer strictly only "Wrong! Try again." In the case of a correct answer, answer strictly only "Correct! Next Question:" and a question.
    
                "Example: "Question: Which of the following is NOT one of the Great Lakes of North America?"
                
                A) Lake Ontario
                B) Lake Erie
                C) Lake Tahoe
                D) Lake Superior
                
                User: "Lake Tahoe"
                System: "Wrong! Try again."
                
                User: "Lake Superior"
                System: "Correct! Next Question: Which planet in our solar system is the closest to the sun?""
                Start with a question.`
            }

            state.messages.push(newMessage)
        },
        incrementScore: (state, { payload }) => {
            state.score += payload
        },
        decrementScore: (state, { payload }) => {
            state.score -= payload
        },
        setHideMode: (state, { payload }) => {
            state.hideMode = payload
        },
        setMessages: (state, { payload }) => {
            state.messages.push(payload)
        },

        resetGame: (state, { payload }) => {
            return { ...initialState }
        },
        // setIncorrectAnswers: (state, { payload }) => {
        //     const totalIncorrectAnswers = state.messages.filter((message) => message.content.toLowerCase().includes('again')).length - 1
        //     return totalIncorrectAnswers
        //     // state.incorrectAnswers = payload
        // },
        // setCorrectAnswers: (state, { payload }) => {
        //     const totalCorrectAnswers = state.messages.filter((message) => message.content.toLowerCase().includes('correct!')).length - 1
        //     return totalCorrectAnswers
        //     // state.incorrectAnswers = payload
        // },
        setCorrect: (state, { payload }) => {
            if (payload) {
                state.correctAnswers += 1
                state.correct = payload
            } else {
                state.correct = payload
            }
        },
        setIncorrect: (state, { payload }) => {
            if (payload) {
                state.incorrectAnswers += 1
                state.incorrect = payload
            } else {
                state.incorrect = payload
            }
        },
        setQuestionMessage: (state, { payload }) => {
            state.questionMessage = payload
        },
        setQuestionOptions: (state, { payload }) => {
            state.questionOptions = payload
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getNewGeneralQuestion.pending, (state, { payload }) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(getNewGeneralQuestion.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.error = null
        })
        builder.addCase(getNewGeneralQuestion.rejected, (state, { payload }) => {
            state.isLoading = false
            state.error = payload
        })

    }
})

export const { setCorrect, resetGame, setIncorrect, setMessages, setQuestionMessage, setQuestionOptions, setCategory, pretendRole, incrementScore, decrementScore, setHideMode, setIncorrectAnswers, setCorrectAnswers } = gameSlice.actions
export default gameSlice.reducer


// export const { addEnglishLvl } = userSlice.actions
// export default userSlice.reducer