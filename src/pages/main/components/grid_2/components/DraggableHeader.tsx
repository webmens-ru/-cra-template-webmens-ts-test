import { HeaderRenderer, HeaderRendererProps } from 'react-data-grid';
import { useDrag, useDrop } from 'react-dnd';
import SvgLockClosed from "../assets/svg/lock-closed.svg";
import SvgLockOpen from "../assets/svg/lock-open.svg";
import { LockIcon } from '../styles/grid';
import { TColumnItem } from '../types';

interface DraggableHeaderRendererProps<R> extends HeaderRendererProps<R> {
  onColumnsReorder: (sourceKey: string, targetKey: string) => void;
  onColumnFrozenToggle: (column: TColumnItem) => void;
}

export function DraggableHeaderRenderer<R>({
  onColumnsReorder,
  onColumnFrozenToggle,
  column,
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
    <div
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
      <LockIcon 
        src={column.frozen ? SvgLockClosed : SvgLockOpen} 
        title={column.frozen ? "Открепить столбец" : "Закрепить столбец"}
        onClick={() => onColumnFrozenToggle(column as unknown as TColumnItem)} 
      />
      <HeaderRenderer 
        column={column} 
        {...props} 
      />
    </div>
  );
}
