import { createSlice } from "@reduxjs/toolkit";
import { TFilter } from "@webmens-ru/ui_lib/dist/components/filter/types";
import { Item } from "@webmens-ru/ui_lib/dist/components/menu/types";

interface IState {
  currentTab: Item;
  currentFilter: TFilter;
  filterResponse: null | string;
  checkboxes: {id: string, whoPays: any}[];
  checkedRows: number[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: IState = {
  currentTab: {} as Item,
  currentFilter: {} as TFilter,
  checkboxes: [],
  checkedRows: [],
  filterResponse: null,
  isLoading: true,
  isError: false,
};

export const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {
    setCurrentTab: (state, { payload }) => {
      state.currentTab = payload;
    },
    setCurrentFilter: (state, { payload }) => {
      state.currentFilter = payload;
    },
    setFilterResponse: (state, { payload }) => {
      state.filterResponse = payload;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setIsError: (state, { payload }) => {
      state.isError = payload;
    },
    setCheckboxes: (state, { payload }) => {
      state.checkboxes = payload
    },
  },
});

export const {
  setCurrentTab,
  setCurrentFilter,
  setFilterResponse,
  setIsLoading,
  setIsError,
  setCheckboxes,
} = mainSlice.actions;
