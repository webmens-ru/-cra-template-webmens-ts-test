import { SliderProps } from "..";
import { useAppDispatch } from "../../../app/store/hooks";
import { setShowSlider, setSliderProps } from "../sliderSlice";

export default function useSlider() {
  const dispatch = useAppDispatch()

  const show = (props?: SliderProps) => {
    dispatch(setSliderProps(props))
    dispatch(setShowSlider(true))
  }

  const hide = () => {
    dispatch(setShowSlider(false))
  }

  return {
    show,
    hide
  }
}
