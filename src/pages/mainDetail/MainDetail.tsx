import { Loader } from "@webmens-ru/ui_lib";
import { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { GridWrapper } from "../../components/GridWrapper";
import { TopBarButtons } from "../../components/TopBarButtons";
import { useLazyGetGridQuery, useLazyGetSchemaQuery, useSaveSchemaMutation } from "./mainDetailApi";
import { setCheckboxes, setGrid, setIsLoading, setSchema } from "./mainDetailSlice";

export interface MainDetailProps {
  title?: string,
  entity: string,
  body?: any,
  parentId?: string | number
}

export function MainDetail({ title, entity, body = [], parentId = '' }: MainDetailProps) {
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

  useEffect(loadData, [body, dispatch, entity, getGrid, getSchema]);

  if (mainDetail.isLoading) {
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
          parentId={parentId}
        />
      </Container>
      <GridWrapper
        slice={{ ...mainDetail, entity }}
        onShemaMutation={schemaMutation}
        checkboxesSetter={setCheckboxes}
        schemaSetter={setSchema}
        height={window.innerHeight - 46}
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