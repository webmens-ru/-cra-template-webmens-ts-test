import React from "react";
import { TooltipProps } from ".";
import { TooltipBubble, TooltipMessage } from "./styles";

interface TooltipComponentProps extends Omit<TooltipProps, "id"> {
  targetElement: HTMLElement;
  mouseEvt: MouseEvent;
}

export default function TooltipComponent({ message, position, targetElement, mouseEvt }: TooltipComponentProps) {  
  return (
    <TooltipBubble className={position} style={{ top: targetElement.offsetTop - 75, left: targetElement.offsetLeft }}>
      <TooltipMessage children={message} />
    </TooltipBubble>
  );
}
