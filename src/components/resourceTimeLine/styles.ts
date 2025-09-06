import { createGlobalStyle } from "styled-components";
import { Colors } from "../../app/model/colors";

export const FullCalendarStyle = createGlobalStyle`  
  .fc {
    --fc-button-bg-color: #FFF;
    --fc-button-border-color: rgb(198, 205, 211);
    --fc-button-text-color: rgb(51, 51, 51);

    --fc-button-hover-bg-color: rgb(207, 212, 216);
    --fc-button-hover-border-color: rgb(198, 205, 211);
    
    --fc-button-active-bg-color: rgb(180, 228, 245);
    --fc-button-active-border-color: rgb(198, 205, 211);

    font-family: 'Open Sans', sans-serif;

    .fc-toolbar.fc-header-toolbar {
      margin-bottom: 1em;
      padding: 0 10px;

      .fc-button {
        height: 40px;
      }

      .fc-toolbar-title {
        font-size: 26px;
        font-weight: 200;
      }
    }

    .fc-button {
      &:focus {
        box-shadow: none !important;
      }
    }

    .wm-burger-cell {
      .fc-datagrid-cell-cushion {
        height: 100%;
        padding: 0;
      }

      .fc-icon, .fc-datagrid-expander {
        display: none;
      }
    }

    .fc-resource {
      &:has(.resource-cell-content.red) {
        background: ${Colors.red};
      }
      &:has(.resource-cell-content.light-red) {
        background: ${Colors["light-red"]};
      }
      &:has(.resource-cell-content.dark-red) {
        background: ${Colors["dark-red"]};
      }

      &:has(.resource-cell-content.blue) {
        background: ${Colors.blue};
      }
      &:has(.resource-cell-content.light-blue) {
        background: ${Colors["light-blue"]};
      }
      &:has(.resource-cell-content.dark-blue) {
        background: ${Colors["dark-blue"]};
      }

      &:has(.resource-cell-content.green) {
        background: ${Colors.green};
      }
      &:has(.resource-cell-content.light-green) {
        background: ${Colors["light-green"]};
      }
      &:has(.resource-cell-content.dark-green) {
        background: ${Colors["dark-green"]};
      }

      &:has(.resource-cell-content.yellow) {
        background: ${Colors.yellow};
      }
      &:has(.resource-cell-content.light-yellow) {
        background: ${Colors["light-yellow"]};
      }
      &:has(.resource-cell-content.dark-yellow) {
        background: ${Colors["dark-yellow"]};
      }

      &:has(.resource-cell-content.orange) {
        background: ${Colors.orange};
      }
      &:has(.resource-cell-content.light-orange) {
        background: ${Colors["light-orange"]};
      }
      &:has(.resource-cell-content.dark-orange) {
        background: ${Colors["dark-orange"]};
      }

      &:has(.resource-cell-content.grey) {
        color: #fff;
        background: ${Colors.grey};
      }
      &:has(.resource-cell-content.light-grey) {
        background: ${Colors["light-grey"]};
      }
      &:has(.resource-cell-content.dark-grey) {
        color: #fff;
        background: ${Colors["dark-grey"]};
      }

      &:has(.resource-cell-content.purple) {
        background: ${Colors.purple};
      }
      &:has(.resource-cell-content.light-purple) {
        background: ${Colors["light-purple"]};
      }
      &:has(.resource-cell-content.dark-purple) {
        background: ${Colors["dark-purple"]};
      }
    }
  }
`