import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useCustomContext } from "../store";
import { IRenderParagraph, Item } from "../types";

export default function PseudoRender() {
  const { state, dispatch } = useCustomContext();
  const [itemsWithWidth, setItemsWithWidth] = useState<Item[]>([]);

  const setTab = (item: Item) => {
    setItemsWithWidth((items) => [...items, item]);
  };

  useEffect(() => {
    if (itemsWithWidth.length === state.items.length) {
      dispatch({ type: "set_items", items: itemsWithWidth });
    }
  }, [dispatch, itemsWithWidth, state.items.length]);

  if (itemsWithWidth.length === state.items.length) return null;

  return (
    <>
      {state.items.map((item) => (
        <RenderParagraph key={item.id} item={item} setTab={setTab} />
      ))}
    </>
  );
}

function RenderParagraph({ item, setTab }: IRenderParagraph) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (ref && ref.current) {
      return setTab({ ...item, width: ref.current.offsetWidth + 5 });
    }
  }, [item, setTab]);

  return (
    <P
      ref={ref}
    >
      {item.title}
    </P>
  );
}

const P = styled.p`
  position: absolute;
  top: -10px;
  left: -500px;
  font-size: 15px;
  font-family: 'Open sans';
  white-space: nowrap;
`
