import { forwardRef, useImperativeHandle } from "react";
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

export const GridView = forwardRef(({ entity, parentId }: { entity: string, parentId?: string }, ref) => {
  const dispatch = useAppDispatch();
  const { mainSlice, mainApi } = useAppSelector((state) => state);
  const [schemaMutation] = useSaveSchemaMutation();
  const [rowMutation] = useEditRowMutation();
  const { schema, data, reload } = useGridData({ entity, parentId });

  useImperativeHandle(ref, () => ({
    reload
  }))

  return (
    <GridWrapper
      slice={{ ...mainSlice, entity }}
      api={mainApi}
      schema={schema}
      data={data}
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
})
