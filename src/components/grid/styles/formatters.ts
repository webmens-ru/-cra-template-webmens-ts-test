import styled from "styled-components";

/* CommonFormatter */
export const CommonCell = styled.div`
`
/* CommonFormatter */

/* ImageFormatter */
export const ImageCellWrap = styled.div`
  display: flex;
  justify-content: space-around;
`

export const ImageCell = styled.div<{ url: string }>`
  background: #efefef;
  background-size: 100%;
  display: inline-block;
  block-size: 28px;
  inline-size: 28px;
  vertical-align: middle;
  background-position: center;
  background-image: url(${({ url }) => url});
`
/* ImageFormatter */

/* EmptyFormatter */
export const EmptyCell = styled(CommonCell)`
  opacity: .5;
`
/* EmptyFormatter */

/* LinkFormatter */
export const GridLink = styled.a`
  text-decoration: none;

  &:link, &:visited {
    color: #2067b0;
  }

  &:hover {
    text-decoration: underline;
  }
`
/* LinkFormatter */
