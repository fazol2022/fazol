/* eslint-disable @typescript-eslint/no-explicit-any */
import styled, { css } from 'styled-components';

export const HeaderWrapper = styled.div`
  display: block;
  justify-content: center;
  width: 100%;
  height: fit-content;
  background: ${(props) =>
    (props as any).menu == 0 ? props.theme.background + 'E0' : 'transparent'};
  mix-blend-mode: ${(props) =>
    (props as any).menu == 2 ? 'difference' : 'unset'};
  position: fixed;
  z-index: 999;
  ${(props) =>
    props.theme.hasShadow &&
    css`
      box-shadow: 0px 2px 5px ${(props) => props.theme.shadow};
    `}
  ${(props) =>
    !props.theme.hasShadow &&
    css`
      border-bottom: 1px solid ${(props) => props.theme.shadow};
    `}
`;
