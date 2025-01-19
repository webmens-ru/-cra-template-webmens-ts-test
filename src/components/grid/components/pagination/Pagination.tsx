import React, { useCallback, useEffect, useMemo, useState } from "react";
import { PaginationContainer, PaginationItem } from "./styles";

export interface PaginationProps {
  totalCount: number;
  currentPage?: number;
  perPage?: number;
  onNavigate?: (page: number) => void;
}

export const Pagination = ({
  totalCount,
  currentPage = 1,
  perPage = 50,
  onNavigate = () => { }
}: PaginationProps) => {
  const [selectedPage, setSelectedPage] = useState(currentPage)

  const pagesCount = Math.ceil(totalCount / perPage)

  const navigate = useCallback((page: number) => {
    setSelectedPage(page)
    onNavigate(page)
  }, [onNavigate])

  const PagesList = useMemo(() => {
    const pages = []
    const startIndex = selectedPage > 11 ? selectedPage - 11 : 1

    for (let i = startIndex; i <= selectedPage; i++) {
      pages.push((
        <PaginationItem
          key={i}
          children={i}
          active={i === selectedPage}
          onClick={() => navigate(i)}
        />
      ))
    }

    return pages
  }, [selectedPage, navigate])

  useEffect(() => {
    setSelectedPage(currentPage)
  }, [currentPage])

  return (
    <PaginationContainer>
      <PaginationItem active noBorder children="Страницы:" />
      {selectedPage >= 12 && (
        <PaginationItem children="Первая" onClick={() => navigate(1)} />
      )}
      {selectedPage !== 1 && (
        <PaginationItem children="Пред." onClick={() => navigate(selectedPage - 1)} />
      )}

      {PagesList}

      {selectedPage !== pagesCount && (
        <>
          <PaginationItem children="След." onClick={() => navigate(selectedPage + 1)} />
          <PaginationItem children="Последняя" onClick={() => navigate(pagesCount)} />
        </>
      )}
    </PaginationContainer>
  )
}
