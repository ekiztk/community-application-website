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
      state.data.questions = [...state.data.questions, { ...action.payload }];
    },
    updateQuestion: (state, action) => {
      const newArr = state.data.questions.map((obj) => {
        if (obj.id === action.payload.id) {
          return { ...obj, ...action.payload.question };
        }
        return obj;
      });
      state.data.questions = newArr;
    },
    deleteQuestion: (state, action) => {
      const updatedArr = state.data.questions.filter((q) => {
        return q.id !== action.payload;
      });

      state.data.questions = updatedArr;
    },
    changeQuestionText: (state, action) => {
      const updatedArr = state.data.questions.map((q) => {
        if (q.id === action.payload.id) {
          return { ...q, text: action.payload.text };
        }
        return q;
      });
      state.data.questions = updatedArr;
    },
    changeQuestionType: (state, action) => {
      const updatedArr = state.data.questions.map((q) => {
        if (q.id === action.payload.id) {
          const updatedQuestion = { ...q, type: action.payload.type };
          if (action.payload.type === 'multipleChoice') {
            updatedQuestion.options = [''];
          }
          return updatedQuestion;
        }
        return q;
      });
      state.data.questions = updatedArr;
    },
    changeQuestionOptions: (state, action) => {
      const updatedArr = state.data.questions.map((q) => {
        if (q.id === action.payload.id) {
          const updatedQuestion = {
            ...q,
            options: [...action.payload.options],
          };
          return updatedQuestion;
        }
        return q;
      });
      state.data.questions = updatedArr;
    },
    setQuestionActive: (state, action) => {
      const updatedArr = state.data.questions.map((q) => {
        if (q.id === action.payload.id) {
          return { ...q, active: action.payload.active };
        }
        return q;
      });
      state.data.questions = updatedArr;
    },
    setQuestionRequired: (state, action) => {
      const updatedArr = state.data.questions.map((q) => {
        if (q.id === action.payload.id) {
          return { ...q, required: action.payload.required };
        }
        return q;
      });
      state.data.questions = updatedArr;
    },
    setQuestionAnswer: (state, action) => {
      const updatedArr = state.data.questions.map((q) => {
        if (q.id === action.payload.id) {
          return { ...q, answer: action.payload.answer };
        }
        return q;
      });
      state.data.questions = updatedArr;
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
