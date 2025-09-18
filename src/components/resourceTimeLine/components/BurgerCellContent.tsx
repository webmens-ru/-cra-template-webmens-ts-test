import { BurgerMenuContainer } from "../../grid/styles";
import { useShowControl } from "../../../hooks";
import type { TimelineAction, TimelineResourceApi } from "../types";
import type { ViewApi } from "@fullcalendar/core";
import styled from "styled-components";

interface BurgerCellContentProps {
  actions: TimelineAction[]
  resource: TimelineResourceApi
  view: ViewApi
  onAction: (action: TimelineAction) => void
}

export const BurgerMenu = styled.div`
  position: absolute;
  left: 40px;
  padding: 8px;
  border-radius: .25em;
  background-color: #FFF;
  z-index: 50;

  span {
    display: block;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &::after {
    content: '';
    width: 0;
    height: 0;
    display: block;
    position: absolute;
    z-index: 10;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    margin-top: -7px;
    top: 50%;
    border-right: 10px solid #FFF;
    left: -10px;
  }
`

export default function BurgerCellContent({ actions, resource, onAction }: BurgerCellContentProps) {
  const { ref, isShow, toggleShow } = useShowControl()

  const resourceActions = resource.extendedProps.burgerActions
  const allowedActions = actions.filter(action => resourceActions?.includes(action.id))

  return (
    <BurgerMenuContainer
      ref={ref}
      onClick={toggleShow}
    >
      <span />
      <span />
      <span />
      {isShow && (
        <BurgerMenu>
          {allowedActions.map(action => (
            <span key={action.id} onClick={() => onAction(action)}>{action.title}</span>
          ))}
        </BurgerMenu>
      )}
    </BurgerMenuContainer>
  )
}
