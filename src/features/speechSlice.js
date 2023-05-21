import { createSlice } from '@reduxjs/toolkit';

const speechSlice = createSlice({
  name: 'speech',
  initialState: {
    text: null,
    voice: null,
  },
  reducers: {
    setText: (state, action) => {
      state.text = action.payload;
    },
    setVoice: (state, action) => {
      state.voice = action.payload.voiceURI;
    },
  },
});

export const speechActions = speechSlice.actions;

export const initSpeech = (text) => (dispatch) => {
  const initUtterance = new SpeechSynthesisUtterance();
  initUtterance.text = text;
  speechSynthesis.onvoiceschanged = () => {
    const initVoices = speechSynthesis.getVoices();
    if (initVoices.length > 0) {
      const initVoice = initVoices[5];
      if (initVoice) {
        dispatch(speechActions.setVoice({ voiceURI: initVoice.voiceURI }));
      } else {
        console.log('Voice not found');
      }
    } else {
      console.log('No voices available');
    }
    dispatch(speechActions.setText(text));
  };
};

export const speak = (arg) => (_, getState) => {
  if ('speechSynthesis' in window) {
    const { text, voice } = getState().speech;
    if (text && voice) {
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = speechSynthesis.getVoices();
      const selectedVoice = voices.find(v => v.voiceURI === voice);
      console.log(selectedVoice)
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.text = arg
        speechSynthesis.speak(utterance);
        console.log('success');
      } else {
        console.log('Voice not found');
      }
    }
  } else {
    console.log('Speech synthesis is not supported');
  }
};

export default speechSlice.reducer;

