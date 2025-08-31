import { useLazyGetDynamicSelectItemsQuery } from "..";
import { useAppSelector } from "../../../app/store/hooks";
import { TopBarButtons } from "../../../components/TopBarButtons";
import CopyToClipboard from "../../../components/copyToClipboard";
import { FilterAlpha } from "../../../components/filter";
import { useFilterQuery } from "../hooks/useFilterQuery";
import ControlBar from "./control_bar";

interface ITopBarProps {
  entity: string,
  title?: string
  parentId?: string
  onCloseSlider?: () => void
  onClosePopup?: () => void
  viewMode?: string
}

export function TopBar({
  entity,
  parentId,
  title,
  onCloseSlider,
  onClosePopup,
  viewMode
}: ITopBarProps) {
  const { mainSlice } = useAppSelector((state) => state);
  const filterProps = useFilterQuery({ entity, parentId });
  const [getItems] = useLazyGetDynamicSelectItemsQuery()

  const getSelectItems = async (type: string, queryKey: string) => {
    const items = await getItems(queryKey)
    return items.data || []
  }

  return (
    <ControlBar title={title}>
      <CopyToClipboard append={window._PARAMS_.placementOptions} />
      <FilterAlpha
        currentFilter={mainSlice.currentFilter}
        {...filterProps}
        onClearFilter={() => filterProps?.onSearch && filterProps.onSearch([])}
        getSelectItems={getSelectItems}
      />
      <TopBarButtons
        entity={entity}
        parentId={parentId}
        involvedState={mainSlice} 
        excelTitle={title}
        onCloseSlider={onCloseSlider}
        onClosePopup={onClosePopup}
        viewMode={viewMode}
      />
    </ControlBar>
  );
}
