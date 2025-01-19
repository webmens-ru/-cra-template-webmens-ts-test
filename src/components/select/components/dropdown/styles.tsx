import styled from "styled-components"

type DropdownItemProps = {
  selected: boolean
}

export const SelectDropdownContainer = styled.div.attrs({ className: 'dropdown' })`
  position: fixed;
  top: 0px;
  max-height: 240px;
  width: 100%;
  z-index: 1000;
  overflow-y: auto;
  background: white;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
  transition: transform 75ms linear, opacity 150ms linear;
`

export const DropdownItemContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 40px;
  padding: 0 5px;
  margin: 2px 0;
  border: 2px solid transparent;
  color: #535c69;
  background: ${({selected}: DropdownItemProps) => selected ? '#bcedfc' : '#fff'};
  border-color: ${({selected}: DropdownItemProps) => selected ? '#bcedfc' : '#fff'};
  cursor: pointer;
  transition: all 110ms ease;

  &:hover {
    background: ${({ selected }: DropdownItemProps) => selected ? "#d3eff7" : "#eee"};
    border-color: ${({ selected }: DropdownItemProps) => selected ? "#d3eff7" : "#eee"};
  }

  & > input[type="checkbox"] {
    margin-right: 5px;
  }
`

export const DropdownGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5px;
  margin-bottom: 5px;

  & > .dropdown-item {
    padding-left: 15px;
  }
`

export const GroupTitle = styled.div`
  font-weight: bold;
  margin-left: 7px;
  margin-bottom: 5px;
  opacity: .5;

  &:nth-child(1) {
    margin-top: 8px;
  }
`
