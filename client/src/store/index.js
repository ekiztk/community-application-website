import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

import {
  applicationReducer,
  updateApplication,
  setApplication,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  changeQuestionText,
  changeQuestionType,
  changeQuestionOptions,
  setQuestionActive,
  setQuestionRequired,
  setQuestionAnswer,
} from './slices/applicationSlice';

import { authReducer, setMode, setLogin, setLogout } from './slices/authSlice';
import { modalReducer, append, destroy, destroyAll } from './slices/modalSlice';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
};

const applicationPersistConfig = {
  key: 'application',
  storage: storageSession,
};

const rootReducer = combineReducers({
  application: persistReducer(applicationPersistConfig, applicationReducer),
  auth: authReducer,
  modal: modalReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  composeWithDevTools,
});

export {
  store,
  setApplication,
  updateApplication,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  setMode,
  setLogin,
  setLogout,
  changeQuestionText,
  changeQuestionType,
  changeQuestionOptions,
  setQuestionActive,
  setQuestionRequired,
  append,
  destroy,
  destroyAll,
  setQuestionAnswer,
};

export * from './thunks/fetchApplication';
export * from './thunks/removeApplication';
export * from './thunks/createApplication';

export const persistor = persistStore(store);
