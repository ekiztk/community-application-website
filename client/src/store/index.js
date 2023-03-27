import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storageSession from "redux-persist/lib/storage/session";

import {
  applicationReducer,
  setApplication,
  changeName,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  changeQuestionText,
  changeQuestionType,
  changeQuestionOptions,
  setQuestionActive,
  setQuestionRequired,
  changeDescription,
  changeDeadlineDate,
  changeStartDate,
} from "./slices/applicationSlice";

import { authReducer, setMode, setLogin, setLogout } from "./slices/authSlice";
import { modalReducer, append, destroy, destroyAll } from "./slices/modalSlice";

const rootPersistConfig = {
  key: "root",
  storage: storageSession,
};

const applicationPersistConfig = {
  key: "application",
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
  composeWithDevTools,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export {
  store,
  setApplication,
  changeName,
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
  changeDescription,
  append,
  destroy,
  destroyAll,
  changeDeadlineDate,
  changeStartDate,
};

export * from "./thunks/fetchApplication";

export const persistor = persistStore(store);
