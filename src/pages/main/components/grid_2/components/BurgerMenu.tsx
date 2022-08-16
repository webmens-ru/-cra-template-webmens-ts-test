import React, { useState } from "react";
import { DataGridHandle } from "react-data-grid";
import { useShowControl } from "../hooks/useShowControl";
import { useWindowBound } from "../hooks/useWindowBound";
import { BurgerMenuContainer, MenuContainer, MenuItem } from "../styles/burger";
import { BurgerItem } from "../types";

interface IBurgerMenuProps {
  items: BurgerItem[];
  gridRef: React.RefObject<DataGridHandle>;
  onBurgerItemClick: (item: BurgerItem) => void;
}
interface IMenuProps {
  items: BurgerItem[];
  top: number;
  left: number;
  onBurgerItemClick: (item: BurgerItem) => void;
}

export function BurgerMenu({ items = [], gridRef, onBurgerItemClick }: IBurgerMenuProps) {
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const { ref, isShow, toggleShow } = useShowControl();

  const handleBurgerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const burgerPos = ref.current!.getBoundingClientRect()
    const gridPos = gridRef.current!.element!.getBoundingClientRect()
    setPos({ top: burgerPos.top - gridPos.top, left: burgerPos.left - gridPos.left })
    console.log(gridPos);
    
    toggleShow()
  }

  return (
    <BurgerMenuContainer ref={ref} onClick={handleBurgerClick} >
      <span />
      <span />
      <span />
      {isShow && <Menu items={items} left={pos.left} top={pos.top} onBurgerItemClick={onBurgerItemClick} />}
    </BurgerMenuContainer>
  );
}

function Menu({ items, top, left, onBurgerItemClick }: IMenuProps) {
  const { ref } = useWindowBound();

  return (
    <MenuContainer top={top} left={left} ref={ref} >
      {items.map((item) => (
        <MenuItem
          key={item.label}
          children={item.label}
          onClick={() => onBurgerItemClick(item)}
        />
      ))}
    </MenuContainer>
  );
}
