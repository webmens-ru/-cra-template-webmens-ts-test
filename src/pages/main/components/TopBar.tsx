import { FilterAlpha as Filter } from "@webmens-ru/ui_lib";
import { useLazyGetDynamicSelectItemsQuery } from "..";
import { useAppSelector } from "../../../app/store/hooks";
import { TopBarButtons } from "../../../components/TopBarButtons";
import CopyToClipboard from "../../../components/copyToClipboard";
import { useFilterQuery } from "../hooks/useFilterQuery";
import ControlBar from "./control_bar";

interface ITopBarProps {
  onCloseSlider?: () => void
  onClosePopup?: () => void
}

export function TopBar({onCloseSlider, onClosePopup} : ITopBarProps) {
  const { mainSlice } = useAppSelector((state) => state);
  const filterProps = useFilterQuery();  
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
        onClearFilter={() => filterProps?.onSearch && filterProps.onSearch([])}
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
