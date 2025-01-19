import React from 'react';
import { HeaderRenderer, HeaderRendererProps } from 'react-data-grid';
import { useDrag, useDrop } from 'react-dnd';
import { Tooltip } from 'react-tooltip';
import { Icon } from '../../icon';
import { DraggableHeaderContainer, InfoIconContainer } from '../styles';
import { TRawColumnItem } from '../types';

interface DraggableHeaderRendererProps<R> extends HeaderRendererProps<R> {
  instance: TRawColumnItem;
  onColumnsReorder: (sourceKey: string, targetKey: string) => void;
}

export function DraggableHeaderRenderer<R>({
  onColumnsReorder,
  column,
  instance,
  ...props
}: DraggableHeaderRendererProps<R>) {
  const [{ isDragging }, drag] = useDrag({
    type: 'COLUMN_DRAG',
    item: { key: column.key },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'COLUMN_DRAG',
    drop({ key }: { key: string }) {
      onColumnsReorder(key, column.key);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  return (
    <DraggableHeaderContainer
      ref={(ref) => {
        drag(ref);
        drop(ref);
      }}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isOver ? '#ececec' : undefined,
        cursor: 'move'
      }}
    >
      {HeaderRenderer({ column, ...props })}
      {instance.info && (
        <>
          <Tooltip id='grid-header-tooltip' />
          <InfoIconContainer
            data-tooltip-id="grid-header-tooltip"
            data-tooltip-content={instance.info}
            data-tooltip-position-strategy='fixed'
          >
            <Icon iconName='info' iconWidth='100%' />
          </InfoIconContainer>
        </>

      )}
    </DraggableHeaderContainer>
  );
}
