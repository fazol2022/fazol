/* eslint-disable @typescript-eslint/no-explicit-any */
import styled, { css } from 'styled-components';

export const Headline = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  text-overflow: ellipsis;
  .title {
    text-overflow: ellipsis;
    display: block;
    box-sizing: border-box;
  }
  .date {
    margin: 20px;
    text-align: right;
    text-overflow: ellipsis;
    box-sizing: border-box;
  }
  // for a diplay over 1200px width
  @media (min-width: 1200px) {
    .title {
      width: calc(100% - 270px);
      h1 {
        font-size: 40px;
      }
    }
    .date {
      width: 270px;
      display: block;
    }
  }
  // for a diplay smaller than 1200px width
  @media (max-width: 1200px) {
    .title {
      width: calc(100% - 20px);
      h1 {
        font-size: 20px;
      }
    }
    .date {
      width: 0px;
      display: none;
    }
  }
`;
