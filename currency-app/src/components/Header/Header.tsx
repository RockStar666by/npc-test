import React from 'react';
import {
  StyledHeader,
  HeaderWrapper,
  HeaderLogo,
  Navbar,
  NavUl,
  NavLi,
  NavLink,
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
              <NavLink>Все валюты</NavLink>
            </NavLi>
            <NavLi>
              <NavLink>Конвертер</NavLink>
            </NavLi>
          </NavUl>
        </Navbar>
      </HeaderWrapper>
    </StyledHeader>
  );
};
