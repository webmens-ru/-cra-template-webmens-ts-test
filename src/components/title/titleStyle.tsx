import styled from "styled-components";
import { TextProps } from ".";

export const Container = styled.div`
  display: flex;
  align-items: center;
  & * {
    font-family: "Open Sans", sans-serif;
  }
`;

export const Text = styled.h3`
  font-size: ${({ config }: TextProps) => config.fontSize};
  font-weight: ${({ config }) => config.fontWeight};
`;
