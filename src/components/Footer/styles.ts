import styled, { css } from 'styled-components';

export const StyledFooter = styled.footer`
  display: block;
  position: fixed;
  bottom: 70px;
  left: 0;
  width: 100%;
  justify-content: center;
  margin: 0 auto;
  // padding: 5px 24px;
  background: ${(props) => props.theme.background};
  font-size: 12px;
  mix-blend-mode: ${(props) => (props.menu == 2 ? 'difference' : 'unset')};
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
      border-top: 1px solid ${(props) => props.theme.shadow};
    `}
`;
