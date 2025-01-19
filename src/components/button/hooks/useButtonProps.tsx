import React, { RefObject, useMemo } from 'react';
import {
  BlackArrow,
  BlackTriangle, ButtonProps, SimpleWhiteTriangle, SquareBtn,
  WhiteTriangle
} from '..';
import { useShowControl } from '../../../hooks';
import { defaultThemes } from '../style/defaultTheme';
import { svgBeforeList } from '../style/svgConfig';

export const useButtonProps = (
  {
    color = 'success',
    variant = 'default',
    palette,
    svgBefore = 'without',
    buttonProps,
    items = [],
    disabled = false,
    itemsProps,
    dropdownDirection = 'right',
    dropdownWidth = '150px',
  }: ButtonProps,
  propsRef: RefObject<HTMLDivElement>
) => {
  const { ref, isShow, toggleShow, setShow } = useShowControl(propsRef);

  const completePalette = useMemo(
    () => ({ ...defaultThemes[color], ...palette }),
    [color, palette]
  );

  const afterSvgConfig = useMemo(
    () => ({
      palette: completePalette,
      onClick: toggleShow,
      variant,
    }),
    [completePalette, toggleShow, variant]
  );

  const defaultVariant = useMemo(() => {
    switch (color) {
      case 'success':
      case 'light':
        return <BlackTriangle {...afterSvgConfig} />;
      case 'primary':
        return <WhiteTriangle {...afterSvgConfig} />;
      default:
        return null;
    }
  }, [afterSvgConfig, color]);

  const squareVariant = useMemo(() => {
    return <SquareBtn {...afterSvgConfig} svg={svgBeforeList[svgBefore]} />
  }, [afterSvgConfig, svgBefore]);

  const outsideAfterSvg = useMemo(() => {
    switch (variant) {
      case 'square':
        return squareVariant;
      case 'default':
        return defaultVariant;
      default:
        return null;
    }
  }, [defaultVariant, squareVariant, variant]);

  const insideAfter = useMemo(() => {
    switch (variant) {
      case 'dropdown':
        return <BlackArrow />;
      case 'circle':
        return <SimpleWhiteTriangle />;
      default:
        return null;
    }
  }, [variant]);

  const insideBefore = useMemo(
    () => {
      const icon = svgBeforeList[svgBefore] ? <img src={svgBeforeList[svgBefore]} alt='' /> : null
      return variant !== 'square' ? icon : null
    },
    [svgBefore, variant]
  );

  const otherButtonProps = useMemo(() => {
    const onClick =
      variant === 'dropdown' || variant === 'circle'
        ? toggleShow
        : buttonProps?.onClick || (() => {});
        
    const style =
      color === 'dashed'
        ? {
            textDecoration: 'underline dotted',
            fontSize: '13px',
            textTransform: 'none',
          }
        : {};
    return {
      onClick,
      style,
    };
  }, [buttonProps, color, toggleShow, variant]);

  return {
    completePalette,
    items,
    itemsProps,
    buttonProps: {
      ...buttonProps,
      ...otherButtonProps,
    },
    containerProps: {
      ref,
      isShow,
      palette: completePalette,
      disabled,
      variant: variant,
      setShow,
    },
    dropdownProps: {
      variant,
      palette: completePalette,
      dropdownDirection,
      dropdownWidth,
    },
    insideBefore,
    insideAfter,
    outsideAfterSvg,
  };
};
