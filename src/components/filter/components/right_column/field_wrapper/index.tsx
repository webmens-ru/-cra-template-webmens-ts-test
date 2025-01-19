import React, { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { FieldContainer, FieldDragHandle, FieldInnerContainer, FieldLabel, FieldRemoveHandle } from "./styles";

interface FieldWrapperProps {
  field: {
    id: number;
    title: string;
    [key: string]: any;
  };
  children: React.ReactNode;
  onMoveFields: (dragField: any, hoverField: any) => void;
  onHideField: (field: any) => void;
  onDragEnd: () => void;
}

export default function FieldWrapper({ field, children, onMoveFields, onHideField, onDragEnd }: FieldWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)

  const [{ isDragging }, drag, preview] = useDrag({
    type: "FILTER_FIELD",
    item: () => ({ dragField: field }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  });

  const [, drop] = useDrop({
    accept: ["FILTER_FIELD"],
    hover: (item: any, monitor) => {
      const [dragField, hoverField] = [item.dragField, field]

      if (!ref.current || dragField.id === hoverField.id) {
        return
      }

      const hoverBoundingRect = ref.current.parentElement!.getBoundingClientRect()
      const clientOffset = monitor.getClientOffset() as XYCoord
      const [hoverMiddleY, hoverClientY] = [(hoverBoundingRect.top + hoverBoundingRect.bottom) / 2, clientOffset.y]      

      if (hoverClientY > hoverMiddleY) {
        onMoveFields(dragField, hoverField)
      }
    },
    drop: onDragEnd
  })

  drag(ref)

  return (
    <FieldContainer
      ref={(ref) => {
        drop(ref)
        preview(ref)
      }}
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      <FieldLabel children={field.title} />
      <FieldInnerContainer>
        <FieldDragHandle ref={ref} />
          {children}
        <FieldRemoveHandle onClick={() => onHideField(field)} />
      </FieldInnerContainer>
    </FieldContainer>
  )
}
