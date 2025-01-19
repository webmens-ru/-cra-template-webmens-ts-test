import React, { useEffect, useReducer, useRef, useState } from "react";
import { useShowControl } from "../../hooks/useShowControl";
import SelectDropdown from "./components/dropdown";
import LoadingSelect from './components/loading_select';
import { init, reducer } from "./reducer";
import { SelectContainer, SelectErrorMsg, SelectFilter, SelectInner, SelectSuffix, SelectTag, SelectTagsContainer, Suffix, TagRemove, TagTitle } from "./styles";
import { IDataItem, ISelectProps } from "./types";
import { buildFilterQuery, filterSelectData } from "./utils/selectUtils";

export const Select = ({
  multiple = false,
  filterable = true,
  minInputLength = 0,
  maxSelectionLength = Infinity,
  filterDelay = 350,
  value = [],
  data = [],
  dataUrl = "",
  remoteMode = false,
  closeOnSelect = true,
  selectWidth = '100%',
  queryParams = {},
  queryTitleName = "title_like",
  onChange = () => { },
}: ISelectProps) => {
  const [dropdownPosition, setDropdownPosition] = useState<DOMRect>()
  const filterRef = useRef(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { ref, isShow, setShow } = useShowControl(undefined, dropdownRef.current)
  const [select, dispatch] = useReducer(reducer, {
    data,
    minInputLength,
    filterable,
    value,
  }, init)
  const isEnoughFilterLength = select.filterValue.length >= minInputLength
  const canSelectMore = select.value.length < maxSelectionLength

  // Срабатывает при изменении фильтра
  const handleFilterChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = evt.target.value
    // Отобразить загрузку, если данные необходимо загрузить удалённо
    if (remoteMode) {
      dispatch({ type: 'setLoading', loading: true })
    }
    dispatch({ type: 'setFilterValue', filterValue })

    setTimeout(() => {
      if (filterValue !== evt.target.value) return
      updateFilteredData(evt.target.value)
    }, filterDelay)
  }

  // Возвращает отфильтрованные данные для списка
  const updateFilteredData = async (filterValue: string) => {
    let filteredData = data

    if (canSelectMore) {
      if (remoteMode && filterValue.length >= minInputLength) {
        dispatch({ type: 'setLoading', loading: true })
        await buildFilterQuery(dataUrl, queryParams, filterValue, queryTitleName)
          .then(response => response.json())
          .then(data => filteredData = data)
          .catch(err => {
            console.error(err)
            dispatch({ type: "setFetchError" })
          })
      } else {
        filteredData = filterSelectData(select.data, filterValue)
      }

      dispatch({ type: 'setFilteredData', filteredData })
      dispatch({ type: 'setLoading', loading: false })
    }
  }

  // Срабатывает при клике на фильтр
  const handleFilterClick = (evt: React.MouseEvent) => {
    if (isShow) {
      evt.stopPropagation()
    } else {
      updateFilteredData(select.filterValue)
    }
  }

  // Срабатывает при выборе элемента списка
  const handleSelectChange = (newValue: IDataItem) => {
    let value = [newValue]
    if (multiple) {
      if (select.value.some((item) => item.value === newValue.value)) {
        value = select.value.filter((item) => item.value !== newValue.value)
      } else {
        value = select.value.concat([newValue])
      }
    }

    dispatch({ type: 'setValue', value })
    onChange(value)

    setShow(!closeOnSelect)
  }

  // Срабатывает при нажатии на крестик у тега списка (если Select множественный)
  const handleRemoveTag = (event: React.MouseEvent, tag: IDataItem) => {
    event.stopPropagation()
    const value = select.value.filter((item) => item !== tag)
    dispatch({ type: 'setValue', value })
    onChange(value)
  }

  // Показывает серый текст с выбранным значением (если Select не множественный)
  const getFilterPlaceholder = (): string => {
    if (!multiple && select.value.length > 0) {
      const title = select.value[0].title;
      return title.toString() || 'Нет данных...';
    } else return ''
  }

  const setCoordinates = () => {
    if (!ref.current) return

    const domRect = ref.current.getBoundingClientRect()
    setDropdownPosition(domRect)
  }

  const handleContainerClick = () => {
    if (closeOnSelect && isShow === true) {
      return setShow(false)
    }
    
    setCoordinates()
    setShow(true)
  }

  useEffect(() => {
    window.addEventListener("resize", setCoordinates)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Если данные для списка ещё не были загружены, либо возникла ошибка при их загрузке
  // Отобразить простой контейнер без логики
  if (!select.inited || select.hasErrorsOnFetch) {
    return (
      <SelectContainer width={selectWidth} isShow={isShow} ref={ref} onClick={handleContainerClick}>
        {select.hasErrorsOnFetch && <SelectErrorMsg children="Произошла ошибка при загрузке данных" />}

        <SelectSuffix isShow={isShow}>
          <Suffix />
        </SelectSuffix>

        {isShow && (
          <SelectDropdown>
            <LoadingSelect />
          </SelectDropdown>
        )}
      </SelectContainer>
    )
  }

  return (
    <SelectContainer width={selectWidth} isShow={isShow} ref={ref} onClick={handleContainerClick}>

      <SelectInner>
        {multiple && (
          <SelectTagsContainer>
            {select.value.map((tag) => (
              <SelectTag key={tag.value}>
                <TagTitle children={tag.title || <i>Нет данных</i>} />
                <TagRemove onClick={(event: React.MouseEvent) => handleRemoveTag(event, tag)} />
              </SelectTag>
            ))}
          </SelectTagsContainer>
        )}

        <SelectFilter
          ref={filterRef}
          className={isShow ? 'opened' : 'closed'}
          readOnly={!filterable}
          placeholder={getFilterPlaceholder()}
          value={isShow ? select.filterValue : ''}
          onChange={handleFilterChange}
          onClick={handleFilterClick}
        />

      </SelectInner>

      <SelectSuffix isShow={isShow}>
        <Suffix />
      </SelectSuffix>

      {isShow && (
        <SelectDropdown
          ref={dropdownRef}
          multiple={multiple}
          isShowLettersCount={minInputLength > 0 && !isEnoughFilterLength}
          lettersRemaining={minInputLength - select.filterValue.length}
          isNoData={!isEnoughFilterLength && !select.filteredData.length && !select.loading}
          canSelectMore={canSelectMore}
          isLoading={select.loading}
          selectedOptions={select.value}
          data={select.filteredData}
          position={dropdownPosition}
          onChange={handleSelectChange}
        />
      )}

    </SelectContainer>
  )
}
