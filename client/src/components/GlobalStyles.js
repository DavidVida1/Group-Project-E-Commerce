import { createGlobalStyle } from "styled-components";
export default createGlobalStyle`
  :root {
    --color-blackfont-titles: #5f6b6e;
    --color-blackfont-text:#000000;
    --color-background:#F5F5F5;
    --Font-heading-title:"Teko","sans-serif";
    --font-text:"Cormorant Garamond", "sans-serif"; 
    
  }
html, body, div, span,  object, iframe,
h1, h2, h3, h4, h5, h6, p,
a, var,
b, u, i, center,
dl, dt, dd, ol, ul, li
{
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    font-size: 100%;
    vertical-align: baseline;
}

a{
  text-decoration: none;
  color: currentColor;
}

.active {
  color: rgb(71, 103, 161);
  box-shadow: rgba(245, 245, 245, 10) 0px 5px,
      rgba(245, 245, 245, 10) 0px 10px, rgba(245, 245, 245, 10) 0px 15px,
      rgba(245, 245, 245, 10) 0px 20px, rgba(245, 245, 245, 10) 0px 25px,
      rgba(0, 102, 255, 0.4) 0px 30px;
}

`;
