import { TFilter } from "@webmens-ru/ui_lib/dist/components/filter_2/types";
import { setCurrentFilter, useLazyGetDynamicSelectItemsQuery } from "..";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import CopyToClipboard from "../../../components/copyToClipboard";
import { FilterAlpha as Filter } from "../../../components/filter_2/Filter2";
import { TopBarButtons } from "../../../components/TopBarButtons";
import { useFilterQuery } from "../hooks/useFilterQuery";
import ControlBar from "./control_bar";

interface ITopBarProps {
  onCloseSlider?: () => void
  onClosePopup?: () => void
}

export function TopBar({onCloseSlider, onClosePopup} : ITopBarProps) {
  const { mainSlice } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const filterProps = useFilterQuery();  

  const setFilter = (filter: TFilter) => {
    console.log(filter);
    
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
        {...filterProps}
        onClearFilter={() => filterProps.onSearch([])}
        getSelectItems={getSelectItems}
      />
      <TopBarButtons 
        involvedState={mainSlice} 
        entity={mainSlice.currentTab?.params?.entity} 
        excelTitle={mainSlice.currentTab.title}
        onCloseSlider={onCloseSlider}
        onClosePopup={onClosePopup}
      />
    </ControlBar>
  );
}
