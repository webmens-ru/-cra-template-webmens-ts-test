import styled from 'styled-components';

export const SearchFilterField = styled.div`
  display: flex;
  align-items: center;

  border: 1px solid transparent;
  border-radius: 4px;

  background-color: #fff;

  & > input, & .wm-icon {
    opacity: .75;
    transition: opacity 200ms ease;
  }

  &:hover > input, & > input:focus, &:hover .wm-icon, & > input:focus + .wm-icon {
    opacity: 1;
  }

  & > input {
    flex-grow: 1;
    margin-left: 10px;
  }

  & .wm-icon {
    transform: scale(.75);
    cursor: pointer;
  }
`;
