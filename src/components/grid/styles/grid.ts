import styled, { createGlobalStyle } from "styled-components";
import { GridColor } from "../types";

export const GridStyle = createGlobalStyle`
  .wm-grid {
    font-family: "Open Sans";
    border: 0;

    scroll-behavior: smooth;
    user-select: auto;
    cursor: default;

    .rdg-header-row {
      .cell-action {
        display: flex;

        .wm-icon {
          cursor: pointer;
          &:hover {
            background-color: #525c68;
          }
        }
      }
      .rdg-cell {
        font-weight: normal;
        font-size: 14px;
        margin: 0;

        &:nth-child(2) {
          z-index: 100;
        }

        &.red {
          background: ${GridColor.red};
        }
        &.light-red {
          background: ${GridColor["light-red"]};
        }
        &.dark-red {
          background: ${GridColor["dark-red"]};
        }

        &.blue {
          background: ${GridColor.blue};
        }
        &.light-blue {
          background: ${GridColor["light-blue"]};
        }
        &.dark-blue {
          background: ${GridColor["dark-blue"]};
        }

        &.green {
          background: ${GridColor.green};
        }
        &.light-green {
          background: ${GridColor["light-green"]};
        }
        &.dark-green {
          background: ${GridColor["dark-green"]};
        }

        &.yellow {
          background: ${GridColor.yellow};
        }
        &.light-yellow {
          background: ${GridColor["light-yellow"]};
        }
        &.dark-yellow {
          background: ${GridColor["dark-yellow"]};
        }

        &.orange {
          background: ${GridColor.orange};
        }
        &.light-orange {
          background: ${GridColor["light-orange"]};
        }
        &.dark-orange {
          background: ${GridColor["dark-orange"]};
        }

        &.grey {
          color: #fff;
          background: ${GridColor.grey};
        }
        &.light-grey {
          background: ${GridColor["light-grey"]};
        }
        &.dark-grey {
          color: #fff;
          background: ${GridColor["dark-grey"]};
        }

        &.purple {
          background: ${GridColor.purple};
        }
        &.light-purple {
          background: ${GridColor["light-purple"]};
        }
        &.dark-purple {
          background: ${GridColor["dark-purple"]};
        }
      }
    }

    .rdg-row {
      &:hover .rdg-cell {
        background: #f6f8f9;
      }

      .rdg-cell:nth-child(2) {
        z-index: 99;
      }

      &.red .rdg-cell, .rdg-cell.red {
        background: ${GridColor.red};
      }
      &.light-red .rdg-cell, .rdg-cell.light-red {
        background: ${GridColor["light-red"]};
      }
      &.dark-red .rdg-cell, .rdg-cell.dark-red {
        background: ${GridColor["dark-red"]};
      }

      &.blue .rdg-cell, .rdg-cell.blue {
        background: ${GridColor.blue};
      }
      &.light-blue .rdg-cell, .rdg-cell.light-blue {
        background: ${GridColor["light-blue"]};
      }
      &.dark-blue .rdg-cell, .rdg-cell.dark-blue {
        background: ${GridColor["dark-blue"]};
      }

      &.green .rdg-cell, .rdg-cell.green {
        background: ${GridColor.green};
      }
      &.light-green .rdg-cell, .rdg-cell.light-green {
        background: ${GridColor["light-green"]};
      }
      &.dark-green .rdg-cell, .rdg-cell.dark-green {
        background: ${GridColor["dark-green"]};
      }

      &.yellow .rdg-cell, .rdg-cell.yellow {
        background: ${GridColor.yellow};
      }
      &.light-yellow .rdg-cell, .rdg-cell.light-yellow {
        background: ${GridColor["light-yellow"]};
      }
      &.dark-yellow .rdg-cell, .rdg-cell.dark-yellow {
        background: ${GridColor["dark-yellow"]};
      }

      &.orange .rdg-cell, .rdg-cell.orange {
        background: ${GridColor.orange};
      }
      &.light-orange .rdg-cell, .rdg-cell.light-orange {
        background: ${GridColor["light-orange"]};
      }
      &.dark-orange .rdg-cell, .rdg-cell.dark-orange {
        background: ${GridColor["dark-orange"]};
      }

      &.grey .rdg-cell, .rdg-cell.grey {
        color: #fff;
        background: ${GridColor.grey};
      }
      &.light-grey .rdg-cell, .rdg-cell.light-grey {
        background: ${GridColor["light-grey"]};
      }
      &.dark-grey .rdg-cell, .rdg-cell.dark-grey {
        color: #fff;
        background: ${GridColor["dark-grey"]};
      }

      &.purple .rdg-cell, .rdg-cell.purple {
        background: ${GridColor.purple};
      }
      &.light-purple .rdg-cell, .rdg-cell.light-purple {
        background: ${GridColor["light-purple"]};
      }
      &.dark-purple .rdg-cell, .rdg-cell.dark-purple {
        background: ${GridColor["dark-purple"]};
      }
    }

    .rdg-cell {
      border: 0;
      border-bottom: 1px solid #edeef0;
      background: #ffffff;
      color: #535c69;
      font-size: 13px;

      &[aria-selected="true"] {
        outline: none;
      }

      &.rdg-cell-resizable {
        &:hover {
          &:after {
            opacity: 1;
          }
        }
        &::after {
          position: absolute;
          top: 50%;
          right: 4px;
          margin-top: -13px;
          width: 10px;
          height: 26px;
          opacity: 0;
          border-right: 1px solid rgba(0,0,0,.1);
          transition: opacity 200ms;
        }
      }
    }
  }
`

export const GridContainer = styled.div`
  position: relative;
  overflow: hidden;
`

export const DraggableHeaderContainer = styled.div`
  position: relative;
`

export const LeftSideArrow = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  left: -50px;
  margin: auto 0;
  width: 100px;
  height: 100px;
  background: rgba(0,0,0,0.1);
  border-radius: 50%;
  z-index: 2;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 52px;
    left: 60px;
    width: 20px;
    height: 5px;
    background: #ffffff;
    transform: rotate(45deg);
  }
  &::after {
    top: 42px;
    transform: rotate(-45deg);
  }
`;

export const RightSideArrow = styled(LeftSideArrow)`
  left: auto;
  right: -50px;
  transform: rotate(180deg);
`;

export const LockIcon = styled.img.attrs({ alt: "", width: 16 })`
  position: absolute;
  right: 10px;
  
  opacity: .5;
  transition: opacity 200ms;
  cursor: copy;

  &:hover {
    opacity: 1 !important;
  }
`

export const InfoIconContainer = styled.div`
  top: 15px;
  right: 0;
  position: absolute;
  width: 18px;
  height: 18px;
  margin-left: 4px;
  border: 1px solid grey;
  border-radius: 50%;
`
