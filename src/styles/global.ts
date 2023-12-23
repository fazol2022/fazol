import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    border: 0;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    scroll-behavior: smooth !important;
    transition: all 0.5s ease;
    animation: 1s ease appear;

    ::selection {
      color: #ECECEC;
      background: #0E0E0E;
    }

    // ::-webkit-scrollbar-track {
    //   background-color: #0E0E0E;
    //   position: absolute;
    // }

    // ::-webkit-scrollbar {
    //   width: 0.6vw;
    // }

    // ::-webkit-scrollbar-thumb {
    //   background-color: #ECECEC;
    // }

    @keyframes wave-anim{
      0% {    transform:  scaleY(1.00) ;  }
      33% {    transform:  scaleY(1.3) ; bottom: 0;  }
      66% {    transform:  scaleY(1.00) ;  }
      100% {    transform:  scaleY(1.00) ;  }
    }

    @keyframes wetsand-anim{
      0% {  opacity:0.01; }
      33% { opacity:0.01; }
      34% { opacity:0.1;}
      100% {opacity:0.01; }
    }

    @keyframes seafoam-anim{
      0% {  opacity:0.2; }
      33% { opacity:1.0; }
      66% { opacity:0.2; }
      100% {opacity:0.2; }
    }

    @keyframes appear{
      0%   {opacity: 0;}
      100% {opacity: 1;}
    }

    @-o-keyframes appear{
      0%   {opacity: 0;}
      100% {opacity: 1;}
    }

    @-moz-keyframes appear{
      0%   {opacity: 0;}
      100% {opacity: 1;}
    }

    @-webkit-keyframes appear{
      0%   {opacity: 0;}
      100% {opacity: 1;}
    }
  }

  // @font-face {
  //   font-family: 'EdelSansLight';
  //   src: url('/fonts/EdelSans-Light.ttf');
  // }

  // @font-face {
  //   font-family: 'Metrophobic-Regular';
  //   src: url('/fonts/Metrophobic-Regular.ttf');
  // }

  // @font-face {
  //   font-family: 'Acid';
  //   src: url('/fonts/Acid/acid.otf');
  // }

  // @font-face {
  //   font-family: 'FuturaNDLight';
  //   src: url('/fonts/FuturaND/FuturaNDLight.ttf');
  // }

  // @font-face {
  //   font-family: 'ITCAvantGardeStdXLt';
  //   src: url('/fonts/ITCAvantGardeGothic/ITCAvantGardeStdXLt.otf');
  // }

  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

  // @font-face {
  //   font-family: 'Spartan-Regular';
  //   src: url('/fonts/Spartan/Spartan-Regular.ttf');
  // }

  body {
    background: #F6F8FC;
    -webkit-font-smoothing: antialiased;
    // overflow-y: hidden;
    height: 100vh;
  }

  body, input, button {
    font: 16px Spartan-ExtraLight, sans-serif;
  }

  button {
    cursor: pointer;
  }

  // ::-webkit-scrollbar-track {
  //   background-color: #0E0E0E;
  //   position: absolute;
  // }

  // ::-webkit-scrollbar {
  //   width: 0.6vw;
  // }

  // ::-webkit-scrollbar-thumb {
  //   background-color: #ECECEC;
  // }

  #__next {
    height: 100vh;
    width: 100%;
    position: absolute;
    margin: 0;
    // overflow-y: auto;
    // overflow-x: hidden;
    // overflow-y: hidden;
    -webkit-font-smoothing: antialiased;

    ::-webkit-scrollbar-track {
      background-color: #0E0E0E;
      position: absolute;
    }

    ::-webkit-scrollbar {
      width: 0.6vw;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #ECECEC;
    }

    a {
      text-decoration: none;
    }

    li {
      list-style: none;
    }

  }
  // The main container element
  .Collapsible {
    // background-color: $base;
    line-height: 3vh;
  }

  //The content within the collaspable area
  .Collapsible__contentInner {
    padding: 10px;
    border-top: 0;

    p {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;
