import React, {
  createContext,
  useReducer,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { Action, IContext, IPropsContext, State } from "./types";

const reducer = (state: State, action: Action): State => {
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
    default:
      return state;
  }
};

export const Context = createContext<IContext>({} as IContext);

export function ContextProvider(props: IPropsContext) {
  const init = useCallback((props: IPropsContext): State => {
    const items = (props.items || []).slice().sort((a, b) => a.order - b.order);

    const currentItem =
      items.find((item) => item.id === props.initialMenuId) ||
      items.find((item) => item.visible);

    return {
      items,
      currentItem,
      isReadyForRender: false,
      countTopItems: 0,
      isEditable: props.isEditable || true,
      itemsMutation: props.itemsMutation || (() => {}),
    };
  }, []);

  const [state, dispatch] = useReducer(reducer, props, init);

  useEffect(() => {
    if (state.currentItem && props.setItem) {
      props.setItem(state.currentItem);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.setItem, state.currentItem]);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
}

export const useCustomContext = () => useContext(Context);
