import { createGlobalStyle } from "styled-components";

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
  }
`