import { useCallback } from 'react';
import { Action } from '../store';
import { Item } from '../types';

export const useSetTab = (dispatch: (act: Action) => void) => {
  const setTab = useCallback((item: Item) => {
    switch (item.type) {
      case 'updatePage':
        dispatch({ type: 'set_current_item', item });
        break;
      case 'openPath':
        if (process.env.NODE_ENV === 'production') {
          BX24.openPath(item.params.url);
        } else {
          window.open(item.params.url, '_blank')?.focus();
        }
        break;
      case 'openLink':
        window.open(item.params.url, '_blank')?.focus();
        break;
      case 'openApplication':
        if (process.env.NODE_ENV === 'production') {
          BX24.openApplication(item.params);
        } else {
          let url = '';
          for (const [key, value] of Object.entries(item.params)) {
            url += `${key}=${value}&`;
          }
          window.open(url, '_blank')?.focus();
        }
        break;
      default:
        break;
    }
    if (item.type === 'openLink') {
      window.open(item.params.url);
    }
  }, [dispatch]);

  return { setTab };
};
