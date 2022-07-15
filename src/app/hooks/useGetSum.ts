import { useCallback } from "react";
import { sum } from "../utils/sum";

export const useGetSum = () => {
  const getSum = useCallback((a, b) => {
    sum(a, b);
  }, []);
  return getSum;
};
