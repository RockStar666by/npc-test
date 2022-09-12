import React from 'react';
import {
  StyledHeader,
  HeaderWrapper,
  HeaderLogo,
  Navbar,
  NavUl,
  NavLi,
  StyledNavLink,
  LogoIcon
} from './Header.styles';
import Logo from '../../assets/arrows.svg';

export const Header: React.FC = () => {
  return (
    <StyledHeader>
      <HeaderWrapper>
        <HeaderLogo>
          <LogoIcon src={Logo}></LogoIcon>CURRENCY
        </HeaderLogo>
      </HeaderWrapper>
    </StyledHeader>
  );
};
