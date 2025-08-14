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
  }
`