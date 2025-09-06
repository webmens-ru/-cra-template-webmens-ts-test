import type { ViewApi } from "@fullcalendar/core";
import type { TimelineResourceApi } from "../types";
import styled, { css } from "styled-components";

interface ResourceCellContentProps {
  resource: TimelineResourceApi;
  view: ViewApi;
  onClick: (resource: TimelineResourceApi) => void;
}

const CellContent = styled.div<{ hasAction: boolean }>`
  width: 100%;
  height: 100%;
  font-weight: 500;

  ${({ hasAction }) => hasAction && css`
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  `}
`

export default function ResourceCellContent({
  resource,
  view,
  onClick,
}: ResourceCellContentProps) {
  const hasAction = !!resource?.extendedProps?.action;
  const color = resource.extendedProps.wmCellColor

  const handleClick = () => {
    if (hasAction) {
      // Передаем весь ресурс, но обработчик будет брать action из extendedProps
      onClick?.(resource);
    } else {
      console.log("No action found in extendedProps");
    }
  };

  return (
    <CellContent
      className={`resource-cell-content ${color}`}
      hasAction={hasAction}
      onClick={handleClick}
    >
      {resource.title}
    </CellContent>
  );
}
