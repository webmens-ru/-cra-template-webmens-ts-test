import { useCallback } from 'react';
import { Action } from '../store';
import { Item } from '../types';

interface UseSetTabProps {
  dispatch: (act: Action) => void
  sliderOpenner: (params: any) => void
}

export const useSetTab = ({ dispatch, sliderOpenner }: UseSetTabProps) => {
  const setTab = useCallback((item: Item) => {
    switch (item.type) {
      case 'updatePage':
        dispatch({ type: 'set_current_item', item });
        break;
      case 'openLink':
        window.open(item.params.url, '_blank')?.focus();
        break;
      case 'openPath':
      case 'openApplication':
        sliderOpenner(item)
        break;
      default:
        break;
    }
  }, [dispatch, sliderOpenner]);

  return { setTab };
};
