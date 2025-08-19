import { useCallback } from "react";
import { useAppDispatch } from "../../../app/store/hooks";
import { useGetTabsQuery } from "../mainApi";
import { setCurrentTab } from "../mainSlice";
import type { MenuItem } from "../../../components/menu/types";

export const useMenuData = (menuId: number = 1) => {
  const dispatch = useAppDispatch();

  const { data: tabs, isLoading } = useGetTabsQuery(menuId)

  const setTab = useCallback(
    (tab: MenuItem) => {
      dispatch(setCurrentTab(tab));
    },
    [dispatch],
  );

  return { tabs, isLoading, setTab };
};
