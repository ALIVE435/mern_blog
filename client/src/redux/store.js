import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice';
import {persistReducer,persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeReducer from "./theme/themeSlice"

const rootReducer= combineReducers({     //this combines all reducers(methods that change states) to a single bundle
  user:userReducer,
  theme:themeReducer,
});

const persistConfig = {
  key:'root',
  storage,
  version:1,
};


const persistedReducer = persistReducer(persistConfig,rootReducer);//instead of persisting a single, we persist with the combined reducer


export const store =  configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({serializableCheck:false}),
});

export const persistor = persistStore(store)