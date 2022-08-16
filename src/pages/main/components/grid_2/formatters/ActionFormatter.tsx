import { FormatterProps } from "react-data-grid";
import { BurgerMenu } from "../components/BurgerMenu";
import { BurgerItem, TRowItem } from "../types";

export default function ActionFormatter({ row }: FormatterProps<TRowItem, unknown>) {
  const burgerItems = row.action.burgerItems as (BurgerItem[] | undefined)
  const gridRef = row.action.gridRef

  const handleBurgerItemClick = (item: BurgerItem) => {
    row.action.onBurgerItemClick(item, row)
  }

  if (!burgerItems) {
    return <></>
  }
  
  return (
    <BurgerMenu 
      items={burgerItems} 
      gridRef={gridRef}
      onBurgerItemClick={handleBurgerItemClick}
    />
  )
}
