import React from "react";
import { Filter } from "@webmens-ru/ui_lib";
import { TFilter } from "@webmens-ru/ui_lib/dist/components/filter/types";
import { setCurrentFilter, useLazyGetDynamicSelectItemsQuery } from "..";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import CopyToClipboard from "../../../components/copyToClipboard";
import { useFilterQuery } from "../hooks/useFilterQuery";
import ControlBar from "./control_bar";
import { TopBarButtons } from "./TopBarButtons";

export function TopBar() {
  const { mainSlice } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const filterProps = useFilterQuery();

  const setFilter = (filter: TFilter) => {
    dispatch(setCurrentFilter(filter));
  };

  const [getItems] = useLazyGetDynamicSelectItemsQuery()

  const getSelectItems = async (type: string, queryKey: string) => {
    const items = await getItems(queryKey)
    return items.data || []
  }

  return (
    <ControlBar title={mainSlice.currentTab.title}>
      <CopyToClipboard append={window._PARAMS_.placementOptions} />
      <Filter
        currentFilter={mainSlice.currentFilter}
        setCurrentFilter={setFilter}
        {...filterProps}
        onClearFilter={() => filterProps.onSearch([])}
        getSelectItems={getSelectItems}
      />
      <TopBarButtons/>
    </ControlBar>
  );
}
