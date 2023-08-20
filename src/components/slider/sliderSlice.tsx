import { createSlice } from "@reduxjs/toolkit";
import { SliderProps } from ".";

interface SliderState extends SliderProps {
}

const initialState: SliderState = {
  
}

export const sliderSlice = createSlice({
  initialState,
  name: "sliderSlice",
  reducers: {
    setSliderProps: (state, { payload }) => {
      state.onClose = payload?.onClose
      state.placementOptions = payload?.placementOptions
      state.timeout = payload?.timeout
      state.title = payload?.title
      state.type = payload?.type
      state.typeParams = payload?.typeParams
      state.width = payload?.width
    },
    setShowSlider: (state, { payload }) => {
      state.show = payload
    }
  }
})

export const {
  setShowSlider,
  setSliderProps
} = sliderSlice.actions
