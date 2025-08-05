import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import { GridWrapper } from "../../../../components/GridWrapper";
import { useSaveSchemaMutation, useEditRowMutation } from "../../mainApi";
import {
  setCheckboxes,
  setSchema,
  setFilterResponse,
  setPage,
} from "../../mainSlice";
import useGridData from "./useGridData";

export function GridView() {
  const dispatch = useAppDispatch();
  const { mainSlice, mainApi } = useAppSelector((state) => state);
  const [schemaMutation] = useSaveSchemaMutation();
  const [rowMutation] = useEditRowMutation();
  const { reload } = useGridData();

  return (
    <GridWrapper
      slice={{ ...mainSlice, entity: mainSlice.currentTab.params.entity }}
      api={mainApi}
      onShemaMutation={schemaMutation}
      onRowMutation={rowMutation}
      checkboxesSetter={setCheckboxes}
      schemaSetter={setSchema}
      filterSetter={setFilterResponse}
      onCloseSlider={reload}
      onClosePopup={reload}
      onNavigate={(page) => dispatch(setPage(page))}
    />
  );
}
