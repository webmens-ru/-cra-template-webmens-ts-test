import { MetricFilter, MetricLink, Separator } from './components/block-items';
import { BlockItems, IToolbarBlock } from './types';

export const sortBlocks = (blocks: IToolbarBlock[]) => {
  return blocks.map(block => ({
    ...block,
    items: sortList(block.items)
  })).sort((a, b) => a.order - b.order)
}

export const sortList = (list: BlockItems[]) => {
  return list.slice().sort((a, b) => a.order - b.order)
}

interface IGetSuitableBlockItemProps {
  blockItem: BlockItems;
  key: React.Key;
  onClick: (blockItem: BlockItems) => void
}
export const getSuitableBlockItem = ({ blockItem, key, onClick }: IGetSuitableBlockItemProps): JSX.Element | null => {
  const props = { key, onClick }
  switch (blockItem.type) {
    case "metric-filter": return MetricFilter({ ...props, blockItem });
    case "metric-link": return MetricLink({ ...props, blockItem });
    case "separator": return Separator({ key });
    default: return MetricFilter({ ...props, blockItem })
  }
}
