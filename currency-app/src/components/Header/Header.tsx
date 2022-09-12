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
        <Navbar>
          <NavUl>
            <NavLi>
              <StyledNavLink to='/'>Все валюты</StyledNavLink>
            </NavLi>
            <NavLi>
              <StyledNavLink to='dynamics'>Динамика курсов</StyledNavLink>
            </NavLi>
            <NavLi>
              <StyledNavLink to='converter'>Конвертер</StyledNavLink>
            </NavLi>
          </NavUl>
        </Navbar>
      </HeaderWrapper>
    </StyledHeader>
  );
};
