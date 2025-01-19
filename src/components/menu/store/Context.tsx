import React, {
  createContext, useCallback, useContext, useEffect, useReducer
} from "react";
import { Action, IContext, IPropsContext, MenuState } from "./types";

const reducer = (state: MenuState, action: Action): MenuState => {
  switch (action.type) {
    case "set_items":
      return {
        ...state,
        items: action.items,
        isReadyForRender: true,
      };
    case "set_count_top_items":
      return {
        ...state,
        countTopItems: action.count,
      };
    case "set_current_item":
      return {
        ...state,
        currentItem: action.item,
      };
    case "set_disabled":
      return {
        ...state,
        disabled: action.disabled
      }
    default:
      return state;
  }
};

export const Context = createContext<IContext>({} as IContext);

export function ContextProvider(props: IPropsContext) {
  const init = useCallback((props: IPropsContext): MenuState => {
    const items = (props.items || []).slice().sort((a, b) => a.order - b.order);

    const currentItem =
      items.find((item) => item.id === props.initialMenuId) ||
      items.find((item) => item.visible);

    return {
      items,
      disabled: props.disabled || false,
      menuStyle: props.menuStyle || "main",
      currentItem,
      isReadyForRender: false,
      countTopItems: 0,
      isEditable: props.isEditable || true,
      itemsMutation: props.itemsMutation || (() => { }),
      sliderOpenner: props.sliderOpenner || (() => {})
    };
  }, []);

  const [state, dispatch] = useReducer(reducer, props, init);

  useEffect(() => {
    if (state.currentItem && props.setItem) {
      props.setItem(state.currentItem);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.setItem, state.currentItem]);

  useEffect(() => {
    dispatch({ type: "set_disabled", disabled: props.disabled || false })
  }, [props.disabled])

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
}

export const useCustomContext = () => useContext(Context);
