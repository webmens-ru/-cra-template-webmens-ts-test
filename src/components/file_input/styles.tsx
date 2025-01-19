import styled from "styled-components";

export const FileInputContainer = styled.div`
  font-family: 'Open Sans';
  font-size: 14px;
  color: #888;
  display: flex;
  flex-direction: column;
  & input[type="file"] {
    display: none;
  }
`

export const FileItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
`

export const FileLink = styled.a`
  color: #0069c4;

  &:hover {
    color: #1c91e7;
  }
`

export const FileSize = styled.span`
  margin-left: 5px;
`

export const FileRemove = styled.span`
  display: flex;
  justify-content: center;
  margin-left: 5px;
  border-radius: 50%;
  transition: all 220ms ease;
  cursor: pointer;

  &:hover {
    background: #e00101;
    
    .wm-icon {
      background-color: #fff;
    }
  }
`
