import { TFilter } from "@webmens-ru/ui_lib/dist/components/filter/types";

type TFilterFromYii = {
  entityCode: string;
  id: number;
  isBase: number;
  isName: number;
  order: number;
  parentId: number;
  title: string;
  userId: number;
};

export const formatFilters = (filters: TFilterFromYii[]): TFilter[] => {
  return filters
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((item, index) => ({
      ...item,
      visible: item.isName === 1 ? true : false,
      order: index + 1,
    }));
};
