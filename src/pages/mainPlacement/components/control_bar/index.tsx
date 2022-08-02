import { IControlBar } from "./models";
import { ControlContainer, ControlTitle } from "./styles";

export default function ControlBar({ 
  title,
  children,
}: IControlBar) {
  return (
    <ControlContainer>
      <ControlTitle>{title}</ControlTitle>
      {children}
    </ControlContainer>
  );
}