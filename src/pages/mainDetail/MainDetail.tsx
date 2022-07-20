import { Grid, Loader } from "@webmens-ru/ui_lib";
import { TRowItem } from "@webmens-ru/ui_lib/dist/components/grid";
import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import {
  useGetGridMutation,
  useLazyGetSchemaQuery,
  useSaveSchemaMutation,
} from "./mainDetailApi";

export interface MainDetailProps {
  title?:string
}

export function MainDetail({title}:MainDetailProps) {
  const [getSchema, schema] = useLazyGetSchemaQuery();
  const [schemaMutation] = useSaveSchemaMutation();
  const [getGrid, grid] = useGetGridMutation();

  const init = useCallback(async () => {
    const entity = window._PARAMS_.placementOptions.entity;
    const body = window._PARAMS_.placementOptions.queryParams;

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
      <Title>{title}</Title>
      <Grid
        column={schema.data}
        row={grid.data?.grid}
        footer={grid.data?.footer}
        height={100}
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