import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { sliderSlice } from "../../components/slider/sliderSlice";
import { mainApi } from "../../pages/main/mainApi";
import { mainSlice } from "../../pages/main/mainSlice";
import { mainCardApi } from "../../pages/mainCard/mainCardApi";
import { mainDetailApi } from "../../pages/mainDetail/mainDetailApi";
import { mainDetailSlice } from "../../pages/mainDetail/mainDetailSlice";
import { mainFormApi } from "../../pages/mainForm/mainFormApi";
import { customCardApi } from "../../pages/customCard/customCardApi";

export const store = configureStore({
  reducer: {
    [mainSlice.name]: mainSlice.reducer,
    [mainDetailSlice.name]: mainDetailSlice.reducer,
    [sliderSlice.name]: sliderSlice.reducer,
    [mainApi.reducerPath]: mainApi.reducer,
    [mainDetailApi.reducerPath]: mainDetailApi.reducer,
    [mainFormApi.reducerPath]: mainFormApi.reducer,
    [mainCardApi.reducerPath]: mainCardApi.reducer,
    [customCardApi.reducerPath]: customCardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(mainApi.middleware)
      .concat(mainDetailApi.middleware)
      .concat(mainCardApi.middleware)
      .concat(customCardApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
