import styled from 'styled-components'

export const MainContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  & > img {
    width: 256px;
    height: auto;
  }
`