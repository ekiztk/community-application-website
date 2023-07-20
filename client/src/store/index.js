import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';
import storage from 'reduxjs-toolkit-persist/lib/storage';
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
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session';

import {
  applicationReducer,
  updateApplication,
  setApplication,
  setCollaborators,
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

import {
  authReducer,
  setMode,
  setLogin,
  setLogout,
  updateUser,
} from './slices/authSlice';
import { modalReducer, append, destroy, destroyAll } from './slices/modalSlice';

const rootPersistConfig = {
  key: 'root',
  version: 1,
  storage: storageSession,
};

const applicationPersistConfig = {
  key: 'application',
  storage: storageSession,
};

const modalPersistConfig = {
  key: 'modal',
  storage: storageSession,
};

const rootReducer = combineReducers({
  application: persistReducer(applicationPersistConfig, applicationReducer),
  auth: authReducer,
  modal: persistReducer(modalPersistConfig, modalReducer),
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
  setCollaborators,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  setMode,
  setLogin,
  updateUser,
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
