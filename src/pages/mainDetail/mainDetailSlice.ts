import { createSlice } from "@reduxjs/toolkit";
import type { TFilter } from "../../components/filter/types";
import type { Item } from "../../components/menu/types";
import type { TRowID, TRawColumnItem } from "../../components/grid";
import type { GridDataResponse } from "../../app/model/query";

interface IState {
  currentTab: Item;
  currentFilter: TFilter;
  filterResponse: null | string;
  toolbarFilterResponse: null | string;
  lastTimeSliderOpened: number | null;
  checkboxes: TRowID[];
  checkedRows: number[];
  isLoading: boolean;
  isError: boolean;
  grid: GridDataResponse;
  schema: TRawColumnItem[]
}

const initialState: IState = {
  currentTab: {} as Item,
  currentFilter: {} as TFilter,
  checkboxes: [],
  checkedRows: [],
  filterResponse: null,
  toolbarFilterResponse: null,
  lastTimeSliderOpened: null,
  isLoading: true,
  isError: false,
  grid: {
    grid: [],
    footer: [],
  },
  schema: []
};

export const mainDetailSlice = createSlice({
  name: "mainDetailSlice",
  initialState,
  reducers: {
    setCurrentTab: (state, { payload }) => {
      state.currentTab = payload;
      state.filterResponse = null;
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
    setGrid: (state, {payload}) => {
      state.grid = payload
    },
    setSchema: (state, {payload}) => {
      state.schema = payload
    },
    setTimeSliderOpened: (state, { payload }) => {
      state.lastTimeSliderOpened = payload
    },
  }
});

export const {
  setCurrentTab,
  setCurrentFilter,
  setFilterResponse,
  setIsLoading,
  setIsError,
  setCheckboxes,
  setGrid,
  setTimeSliderOpened,
  setSchema
} = mainDetailSlice.actions;
