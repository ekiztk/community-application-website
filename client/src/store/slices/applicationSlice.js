import { createApplication } from 'store/thunks/createApplication';
import { fetchApplication } from 'store/thunks/fetchApplication';
import { removeApplication } from 'store/thunks/removeApplication';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    id: '',
    name: '',
    slug: '',
    questions: [],
    startDate: '',
    description: '',
    deadlineDate: '',
    pendingResponsesQuantity: 0,
  },
  isLoading: false,
  error: null,
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setApplication: (state, action) => {
      state.data.id = action.payload.id;
      state.data.name = action.payload.name;
      state.data.slug = action.payload.slug;
      state.data.description = action.payload.description;
      state.data.questions = [...action.payload.questions] || [];
      state.data.startDate = action.payload.startDate;
      state.data.deadlineDate = action.payload.deadlineDate;
      state.data.pendingResponsesQuantity =
        action.payload.pendingResponsesQuantity;
    },
    updateApplication: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    addQuestion: (state, action) => {
      state.data.questions.push({ ...action.payload });
    },
    updateQuestion: (state, action) => {
      state.data.questions[action.payload.index] = {
        ...action.payload.question,
      };
    },
    deleteQuestion: (state, action) => {
      const deleted = state.data.questions.filter((q, index) => {
        return index !== action.payload;
      });
      state.data.questions = deleted;
    },
    changeQuestionText: (state, action) => {
      state.data.questions[action.payload.index].text = action.payload.text;
    },
    changeQuestionType: (state, action) => {
      if (
        state.data.questions[action.payload.index].type !== action.payload.type
      ) {
        state.data.questions[action.payload.index].type = action.payload.type;
        if (action.payload.type.endsWith('Text')) {
          const obj = state.data.questions[action.payload.index];
          delete obj.options;
          state.data.questions[action.payload.index] = { ...obj };
        } else {
          state.data.questions[action.payload.index].options = [''];
        }
      }
    },
    changeQuestionOptions: (state, action) => {
      state.data.questions[action.payload.index].options =
        action.payload.options;
    },
    setQuestionActive: (state, action) => {
      state.data.questions[action.payload.index].active = action.payload.active;
    },
    setQuestionRequired: (state, action) => {
      state.data.questions[action.payload.index].required =
        action.payload.required;
    },
    setQuestionAnswer: (state, action) => {
      state.data.questions[action.payload.index].answer = action.payload.answer;
    },
  },
  extraReducers: (builder) => {
    //fetching
    // eslint-disable-next-line no-unused-vars
    builder.addCase(fetchApplication.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchApplication.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchApplication.rejected, (state, action) => {
      state.isLoading = false;
      state.data = { ...initialState };
      state.error = action.payload;
    });

    //creating
    // eslint-disable-next-line no-unused-vars
    builder.addCase(createApplication.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createApplication.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(createApplication.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    //removing
    // eslint-disable-next-line no-unused-vars
    builder.addCase(removeApplication.pending, (state, action) => {
      state.isLoading = true;
    });
    // eslint-disable-next-line no-unused-vars
    builder.addCase(removeApplication.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = { ...initialState };
      state.error = null;
    });
    builder.addCase(removeApplication.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const {
  setApplication,
  updateApplication,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  changeQuestionText,
  changeQuestionType,
  changeQuestionOptions,
  setQuestionActive,
  setQuestionRequired,
  setQuestionAnswer,
} = applicationSlice.actions;
export const applicationReducer = applicationSlice.reducer;
