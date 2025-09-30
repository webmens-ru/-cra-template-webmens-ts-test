import styled from "styled-components";

export const MainCardContainer = styled.div`
  height: 100vh;
  padding: 10px 10px 0;
  font-family: 'Open Sans', sans-serif;
`

export const MainCardHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const MainCardHeaderActionsContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 12px;
`

export const MainCardTitle = styled.span`
  font-size: 26px;
  font-weight: 300;
`

// НОВЫЕ СТИЛИ ДЛЯ БЛОКА ЦЕНЫ
export const PriceContainer = styled.div`
  margin-bottom: 16px;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
`

export const PriceLoading = styled.div`
  color: #666;
  font-style: italic;
  text-align: center;
  font-size: 26px;
  font-weight: 600;
`

export const PriceValue = styled.div`
  color: #2e7d32;
  font-size: 26px;
  font-weight: 600;
  text-align: center;
`

export const PriceError = styled.div`
  color: #d32f2f;
  font-style: italic;
  text-align: center;
  font-size: 26px;
  font-weight: 600;
`