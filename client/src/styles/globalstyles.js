import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*{
    box-sizing: border-box
}

body{
    margin:0;
    padding:0;
}

*, *::before,*::after, h1,h2,h3,h4,h5{
    margin:0;
    padding:0
}

// &>:first-child{}
// div:nth-of-type(1){}
//   @media(max-width: 700px){}
//  &::-webkit-scrollbar{
//  display: none  
// }

// &>*:nth-child(1){}
// &:hover{}


`