import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import { colors } from 'utils/theme';

export const LayoutHeader = css`
  position: fixed;
  top: 0;
  height: 100%;
`;

export const LayoutContent = css`
  margin-left: 300px;
`;

export const BasketIconWrapper = css`
  position: fixed;
  top: 0;
  z-index: 100;
  width: calc(100% - 300px);
  left: 300px;
`;

export const BasketIcon = css`
  padding: 5px;
  border-radius: 100%;
  height: 50px;
  width: 50px;
  text-align: center;
  margin: 10px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  svg {
    fill: ${colors.textLight};
  }
`;

export const Logo = css`
  display: block;
  width: 150px;
`;

export const SocialIcons = styled.div`
  padding: 30px 27px;
  margin-top: 40px;
`;

export const NavigationItemLink: any = styled(Link)`
  display: block;
  border-left: 4px solid transparent;
  padding: 3px 30px;
`;

export const NavigationItem = styled.li`
  display: block;
  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;

  & + ${(): any => NavigationItem} {
    margin-top: 15px;
  }
`;

export const NavigationList = css`
  display: inline;
`;
