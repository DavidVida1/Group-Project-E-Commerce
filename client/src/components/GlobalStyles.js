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
--footer-bg: rgba(31,31,31,1);


/***************Color***********************/
--white: rgba(255,255,255,1);
--black: rgba(0,0,0,1);
--purple: rgba(71,63,244,1);
--purple-darker: rgba(51,43,224,1);

--font-white:rgba(255,255,255,1);
--font-black:rgba(0,0,0,1);
--font-grey:#5f6b6e;
--font-purple: rgba(71,63,244,1);
--font-sdw: rgba(0,0,0,1);

--bg-black:rgba(31,31,31,1);
--bg-white: #F6F6F6;
--bg-grey:#4f4f4f;
--bg-purple: rgba(71,63,244,1);
--bg-header: rgba(255,255,255,1);
--bg-card:rgba(255,255,255,1);
--bg-search:#f1f1f14d;
--bg-home:linear-gradient(0deg, #F6F6F6 32%, rgba(0, 0, 0, 0.9) 48%);
--bg-footer-sdw:rgba(0, 0, 0, 0.45) 0px -25px 20px -20px;
--bg-overlay:linear-gradient(to bottom, rgba(0, 204, 255, 0.1), rgba(191, 128, 64, 0.3));

--btn-black: rgba(0,0,0,1);
--btn-purple:rgba(71,63,244,1);
--btn-white:rgba(255,255,255,1);

--sdw-black-card:  rgba(0, 0, 0, 0.4) 0px 2px 4px,
  rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
  rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

/***************Border-radius***************/
--radius-card:15px;
--radius-button:40px;
--radius-display:40px;
/***************Font************************/
--font-heading-title:"Teko","sans-serif";
--font-text:"DM Sans", "sans-serif";
--font-weight-500:500;
/*price,terms*/
--font-size-15:1.5rem;
/*text, heroButton*/ 
--font-size-18:1.8rem;
/*media,headerText*/
--font-size-25:2.5rem;
/*categoryText,subHeader*/ 
--font-size-40:4rem;
/*logo*/ 
--font-size-logo:4.5rem;
/***************Gap************************/
--gap-15:10px;
--gap-15:15px;
--gap-25:25px;


/***************sliderHome************************/
--slider-quantity:10;
--slider-height: 50px;
--slider-width:130px;
--slider-time:50s;

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
  background-color: var(--bg-white);
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

/*subHeader, findus Text*/ 
& h2 {        
  font-size: clamp(3rem, 4.2vw, 4rem);
  font-weight: 500;
  text-shadow: 0 0 2px var(--color-black);
  margin: 20px 0px;
}

/*footer header*/
& h3 {         
  font-family: var(--font-heading-title);
  letter-spacing: 5px;
  font-size:  var(--font-size-25);
  }

& .loading {  
  width: 100%;
  height: 100%;
  text-align: center;
  color: rebeccapurple;
  }

& .button {
  width: fit-content;
  height: fit-content;
  font-size: var(--font-size-18);
  padding: 15px 100px;
  border-radius: var(--radius-button);
  background-color: var(--btn-purple);
  border: 2px solid var(--purple);
  box-shadow: 0 0 10px var(--font-sdw);
  transition: background-color 0.3s linear;

  &:hover {
  border: 2px solid var(--white);
  background-color: var(--btn-black);
  }
}

& .logo {
  font-family: var(--font-heading-title);
  font-style: italic;
  font-weight: bold;
  font-size: var(--font-size-logo);
  letter-spacing: 5px;

  &:hover {
  color: var(--purple);
  filter: drop-shadow(0 0 10px var(--black));
  text-shadow: 0 0 5px var(--font-sdw);
  }
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
    max-width: 1700px;
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
