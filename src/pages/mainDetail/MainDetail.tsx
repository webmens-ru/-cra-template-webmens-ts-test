import { Grid, Loader } from "@webmens-ru/ui_lib";
import { TRowID, TRowItem } from "@webmens-ru/ui_lib/dist/components/grid";
import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { TopBarButtons } from "../main/components/TopBarButtons";
import {
  useGetGridMutation,
  useLazyGetSchemaQuery,
  useSaveSchemaMutation,
} from "./mainDetailApi";
import { setCheckboxes } from "../main/mainSlice";
import { useAppDispatch } from "../../app/store/hooks";

export interface MainDetailProps {
  title?:string,
  entity: string,
  body?: any
}

export function MainDetail({title, entity, body = []}:MainDetailProps) {
  const [getSchema, schema] = useLazyGetSchemaQuery();
  const [schemaMutation] = useSaveSchemaMutation();
  const [getGrid, grid] = useGetGridMutation();
  const dispatch = useAppDispatch();

  const checkboxesHandler = useCallback(
    (arr: TRowID[]) => {
      if (grid) {
        dispatch(setCheckboxes(arr));
      }
    },
    [dispatch, grid],
  );

  const init = useCallback(async () => {
    getSchema(entity);
    getGrid({ entity, body });
  }, [getGrid, getSchema]);

  useEffect(() => {
    init();
  }, [init]);

  if (grid.isLoading || !grid.data) {
    return <Loader />;
  }

  // const cellClickHandler = (cell: TRowItem) => {
  //   if (process.env.NODE_ENV === "production") {
  //     BX24.openPath(cell.link, () => {});
  //   } else {
  //     console.log(cell);
  //   }
  // };

  const onCellClick = (cell: TRowItem) => {
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

  return (
    <>
    <Container>
      <Title>
        {title}
      </Title>
      <TopBarButtons />
      </Container>
      <Grid
        column={schema.data}
        row={grid.data?.grid}
        footer={grid.data?.footer}
        height={100}
        isShowCheckboxes
        onChangeCheckboxes={checkboxesHandler}
        columnMutation={schemaMutation}
        onCellClick={onCellClick}
      />
    </>
  );
}

const getMultiplySelectResponse = (value: string[], name: string) => {
  if (value.length === 0) {
    return "";
  }
  return `${name}=in[${value.join(",")}]`;
};

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