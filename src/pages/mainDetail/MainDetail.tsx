import { Grid2 as Grid, Loader } from "@webmens-ru/ui_lib";
import { TRowID } from "@webmens-ru/ui_lib/dist/components/grid";
import { TCellItem } from "@webmens-ru/ui_lib/dist/components/grid_2";
import { useCallback, useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { GridWrapper } from "../../components/GridWrapper";
import { TopBarButtons } from "../../components/TopBarButtons";
import { useLazyGetGridQuery, useLazyGetSchemaQuery, useSaveSchemaMutation } from "./mainDetailApi";
import { setCheckboxes, setGrid, setIsLoading, setSchema } from "./mainDetailSlice";

export interface MainDetailProps {
  title?: string,
  entity: string,
  body?: any
}

export function MainDetail({ title, entity, body = [] }: MainDetailProps) {
  const dispatch = useAppDispatch()
  const mainDetail = useAppSelector(store => store.mainDetailSlice)

  const [getSchema] = useLazyGetSchemaQuery();
  const [getGrid] = useLazyGetGridQuery();
  const [schemaMutation] = useSaveSchemaMutation();

  const loadData = () => {
    dispatch(setIsLoading(true))
    Promise.all([
      getSchema(entity),
      getGrid({ entity, body })
    ]).then(([schema, grid]) => {
      dispatch(setSchema(schema.data))
      dispatch(setGrid(grid.data))
      dispatch(setIsLoading(false))
    })
  }

  const checkboxesHandler = useCallback(
    (checkboxes: TRowID[]) => {
      if (mainDetail.grid) {
        dispatch(setCheckboxes(checkboxes));
      }
    },
    [dispatch, mainDetail.grid],
  );

  useEffect(loadData, [body, dispatch, entity, getGrid, getSchema]);

  const handleSchemaMutation = (schema: any) => {
    schemaMutation(schema).then(response => {
      dispatch({ type: "SET_SCHEMA", schema })
    })
  }

  const onCellClick = (cell: TCellItem) => {
    if (process.env.NODE_ENV === "production") {
      switch (cell.type) {
        case "openPath":
          BX24.openPath(cell.link, (res: any) => console.log(res));
          break;
        case "openApplication":
          BX24.openApplication(cell);
          break;
        default:
          break;
      }
    } else {
      console.log(cell);
    }
  };

  const windowInnerHeight = window.innerHeight

  if (!mainDetail.isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Container>
        <Title children={title} />
        <TopBarButtons
          involvedState={mainDetail}
          entity={entity}
          excelTitle={title}
        />
      </Container>
      {/* <Grid
        column={mainDetail.schema}
        row={mainDetail.grid.grid}
        footer={mainDetail.grid.footer}
        height={100}
        isShowCheckboxes
        onChangeCheckboxes={checkboxesHandler}
        columnMutation={handleSchemaMutation}
        onCellClick={onCellClick}
      /> */}
      <Grid
        columns={mainDetail.schema}
        rows={mainDetail.grid.grid}
        footer={mainDetail.grid.footer}
        height={windowInnerHeight - 46}
        burgerItems={mainDetail.grid?.options?.actions}
        onChangeCheckboxes={checkboxesHandler}
        columnMutation={handleSchemaMutation}
        onCellClick={onCellClick}
      />
      <GridWrapper
        slice={{ ...mainDetail, entity }}
        onShemaMutation={schemaMutation}
        checkboxesSetter={setCheckboxes}
        schemaSetter={setSchema}
        onClosePopup={loadData}
      />
    </>
  );
}

const Title = styled.h1`
  margin: 10px 20px;
  font-family: "Open Sans", sans-serif;
  font-size: 26px;
`;

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
`;