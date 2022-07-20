import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { mainApi } from "../../pages/main/mainApi";
import { mainSlice } from "../../pages/main/mainSlice";
import { mainDetailApi } from "../../pages/mainDetail/mainDetailApi";
import { mainFormApi } from "../../pages/mainForm/mainFormApi";

export const store = configureStore({
  reducer: {
    mainSlice: mainSlice.reducer,
    [mainApi.reducerPath]: mainApi.reducer,
    [mainDetailApi.reducerPath]: mainDetailApi.reducer,
    [mainFormApi.reducerPath]: mainFormApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(mainApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
