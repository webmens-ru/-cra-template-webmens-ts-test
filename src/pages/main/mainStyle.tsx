import styled from 'styled-components'

export const MainStartScreen = styled.div`
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

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 125px);
`

export const MainContent = styled.div`
  flex-grow: 1;
  height: 100%;
`