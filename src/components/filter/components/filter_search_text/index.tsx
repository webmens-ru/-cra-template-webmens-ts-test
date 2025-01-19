import React, { useRef } from "react";
import { Icon } from "../../../icon";
import useSquares from "../../hooks/useSquares";
import { useCustomContext } from "../../store/Context";
import { SquareItem, SquaresContainer } from "../../styles";
import { SearchFilterField } from "./styles";

interface FilterFieldProps {
  textSearch?: string;
  onClick?: VoidFunction;
  onSearch?: VoidFunction;
}

export default function FilterSearchText({ textSearch, onClick, onSearch }: FilterFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { squares, validFieldsCount } = useSquares()

  const { state } = useCustomContext()

  const searchInputPlaceholder = squares.length === 0 ? "Фильтр + поиск" : "+ поиск"

  const searchProxy = () => {
    state.onSearch(state.fields.filter((f) => Boolean(f.visible)));
    onSearch && onSearch()
  };

  const handleFieldClick = () => {
    if (!inputRef.current) return

    inputRef.current.focus()
    onClick && onClick()
  }

  function handleTextSearchChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const searchText = event.target.value;
    state.updateTextSearch(searchText);
  }

  function handleSearchByEnterPress(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (event.key === "Enter") {
      searchProxy()
    }
  }

  return (
    <SearchFilterField onClick={handleFieldClick}>
      <SquaresContainer>
        {squares.map((item, index) => (
          <SquareItem key={index} title={`${item.title}: ${item.value}`} >
            <span children={`${item.title}: ${item.value}`} />
          </SquareItem>
        ))}
        {validFieldsCount > 2 && (
          <SquareItem children={`И еще ${validFieldsCount - squares.length}`} />
        )}
      </SquaresContainer>
      <input
        type="text"
        value={textSearch}
        placeholder={searchInputPlaceholder}
        ref={inputRef}
        onChange={handleTextSearchChange}
        onKeyDown={handleSearchByEnterPress}
      />
      <Icon
        iconName="searchWhite"
        onClick={(evt) => {
          evt.stopPropagation()
          searchProxy()
        }}
      />
    </SearchFilterField>
  )
}
