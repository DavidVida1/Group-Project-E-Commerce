import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`
    /* http://meyerweb.com/eric/tools/css/reset/ 
        v2.0 | 20110126
        License: none (public domain)
    */

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

:root {
--color-white: rgba(255,255,255,1);
--color-black: rgba(0,0,0,1);
--color-footer: rgba(31,31,31,1);
--color-blackfont-titles: #5f6b6e;
--color-blackfont-text:#000000;
--color-background:#F5F5F5;

--font-heading-title:"Teko","sans-serif";
--font-text:"DM Sans", "sans-serif";



font-size:62.5%;
}


#root{/*position:relative*/
}

::-webkit-scrollbar {
  width: 0rem;
}

::-webkit-scrollbar-thumb {
  border-radius: 1rem;
  background: #797979;
  transition: all 0.5s ease-in-out;
}

::-webkit-scrollbar-thumb:hover {
  background: #222224;
}

::-webkit-scrollbar-track {
  background: #363949;
}

html {
  scroll-behavior: smooth;
}

input {
  &:disabled {
    cursor: not-allowed;
    }
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
  display:block;
}

body {
  line-height: 1;
  font-family: var(--font-text);
  font-weight: 300;
  overflow-x: hidden; /*Some probleme with the card animation*/
}

ol, ul {
    list-style: none;
    text-decoration: none;
}
    
a {        
      text-decoration: none;
      color: inherit;
  }
    
blockquote, q {
  quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}


& .container {
max-width: 1920px;
margin-left: auto;
margin-right: auto;
padding-left: 0.5rem;
padding-right: 0.5rem;

}

/*3xl*/
@media (max-width: 1920px) {
  .container {
    max-width: 1800px;
  }
}

@media (max-width: 1800px) {
  .container {
    max-width: 1536px;
  }
}

  /* 2xl */
@media (max-width: 1536px) {
  .container {
    max-width: 1280px;
  }
}

/* xl */
@media (max-width: 1280px) {
  .container {
    max-width: 1024px;
  }
}

/* lg */
@media (max-width: 1024px) {
  .container {
    max-width: 768px;
  }
}

/* md */
@media (max-width: 768px) {
  .container {
    max-width: 640px;
  }
}

/* sm */
@media (max-width: 640px) {
  .container {
   max-width: 475px;
  }
}

/* xs */
@media (max-width: 475px) {
  .container {
    width: 100%;
  }
}

`;
export default GlobalStyles;
