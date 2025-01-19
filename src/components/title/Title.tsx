import React, { StrictMode } from "react";
import { Container, ITitleProps, Text, defaultConfig } from ".";

/**
 * 
 * @param label - text in title
 * @param childrenBefore - any JSX elements
 * @param childrenAfter - any JSX elements
 * @param variant - one of "grid-title" | "slider-title"
 * @param customConfig - {fontSize: string; fontWeight: number;}
 */

export function Title({
  label,
  childrenBefore,
  childrenAfter,
  variant = "grid-title",
  customConfig,
}: ITitleProps) {
  return (
    <StrictMode>
      <Container>
        {childrenBefore}
        <Text config={customConfig || defaultConfig[variant]}>{label}</Text>
        {childrenAfter}
      </Container>
    </StrictMode>
  );
}
