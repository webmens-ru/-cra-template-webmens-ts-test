import React, { useMemo } from "react";
import { BlockTitle, ToolbarBlock, ToolbarContainer } from "./styles";
import { BlockItems, IToolbarBlock, IToolbarProps } from "./types";
import { getSuitableBlockItem, sortBlocks } from "./utils";

export function Toolbar({
  blocks = [],
  onItemClick = () => { },
  onMetricFilterClick = () => { },
  onMetricLinkClick = () => { }
}: IToolbarProps) {
  const sortedBlocks = useMemo(() => sortBlocks(blocks), [blocks])

  const handleBlockItemClick = (item: BlockItems, block: IToolbarBlock) => {
    switch (item.type) {
      case "metric-filter":
        onMetricFilterClick(item, block)
        break;
      case "metric-link":
        onMetricLinkClick(item, block)
        break;
    }

    onItemClick(item, block)
  }

  const buildBlockItem = (blockItem: BlockItems, block: IToolbarBlock, key: React.Key) => {
    return getSuitableBlockItem({ blockItem, key, onClick: (blockItem) => handleBlockItemClick(blockItem, block) })
  }

  return (
    <ToolbarContainer>
      {sortedBlocks.map((block, index) => (
        <ToolbarBlock key={index} >
          {!!block.title && <BlockTitle children={`${block.title}:`} />}
          {block.items.map((item, index) => buildBlockItem(item, block, index))}
        </ToolbarBlock>
      ))}
    </ToolbarContainer>
  )
}
