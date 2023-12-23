import styled from 'styled-components';

export const Cover = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  justify-content: center;
  align-items: center;
  font-size: xxx-large;
  font-weight: bolder;
  text-align: center;
  color: red;
  display: flex;
`;

export const Sheet = styled.div`
  position: relative;
  display: inline-block;
  width: 99%;
  margin: 0.5%;
  min-height: 250px;
  box-sizing: border-box;
  height: calc(99vw * 1.5);

  @media (min-width: 500px) {
    width: 48%;
    margin: 1%;
    height: calc(48vw * 1.5);
  }

  @media (min-width: 900px) {
    width: 32%;
    margin: 0.666%;
    height: calc(32vw * 1.5);
  }

  @media (min-width: 1200px) {
    width: 24%;
    margin: 0.5%;
    height: calc(25vw * 1.5);
  }
`;
