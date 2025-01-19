import React, { StrictMode, useRef } from 'react';
import { ButtonProps, Container, DropdownContainer, useButtonProps } from '.';

export function Button(props: ButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const {
    items,
    itemsProps,
    buttonProps,
    containerProps,
    dropdownProps,
    insideBefore,
    insideAfter,
    outsideAfterSvg,
  } = useButtonProps(props, ref);

  return (
    <StrictMode>
      <Container {...containerProps} onClick={!props.disabled ? props.onClick : () => {}} >
        {props.variant === 'square' ? (
          <>{outsideAfterSvg}</>
        ) : (
          <>
            <button {...buttonProps}>
              {insideBefore}
              {props.children}
              {insideAfter}
            </button>
            {!!items.length && outsideAfterSvg}
          </>
        )}

        {!!items.length && containerProps.isShow && (
          <DropdownContainer {...dropdownProps}>
            {items.map((item, index) => (
              <span
                key={item.id || index}
                {...itemsProps}
                onClick={() => {
                  itemsProps?.onClick(item);
                  containerProps.setShow(false);
                }}
                style={
                  (item.borderTop && {
                    borderTop: '1px solid rgba(194, 197, 202, 0.3)',
                  }) ||
                  (item.borderBottom && {
                    borderBottom: '1px solid rgba(194, 197, 202, 0.3)',
                  })
                }
              >
                {item.label}
              </span>
            ))}
          </DropdownContainer>
        )}
      </Container>
    </StrictMode>
  );
}
