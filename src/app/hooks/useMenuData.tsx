import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useCallback, useLayoutEffect } from "react";
import { useLazyGetTabsQuery } from "../../pages/main";
import { useAppDispatch } from "../store/hooks";
import type { Item } from "../../components/menu/types";

export const useMenuData = (menuId: number, storeSetter?: ActionCreatorWithPayload<any, string>) => {
  const dispatch = useAppDispatch();
  const [getTabs, tabs] = useLazyGetTabsQuery();

  useLayoutEffect(() => {
    getTabs(menuId);
  }, [getTabs, menuId]);

  const setTab = useCallback((tab: Item) => {
    if (storeSetter) {
      dispatch(storeSetter(tab));
    }
  }, [dispatch, storeSetter]);

  return { tabs, setTab };
}
