import React from 'react';
import { ImageCell, ImageCellWrap } from '../styles/formatters';
import { ImageFormatterProps } from '../types';

export function ImageFormatter({ value }: ImageFormatterProps) {
  return (
    <ImageCellWrap>
      <ImageCell url={value.url} />
    </ImageCellWrap>
  );
}
