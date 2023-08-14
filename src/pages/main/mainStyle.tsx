import styled from 'styled-components'

export const MainContainer = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  background: #eef2f4;
  display: flex;
  justify-content: center;
  align-items: center;
  & > img {
    width: 256px;
    height: auto;
  }
`