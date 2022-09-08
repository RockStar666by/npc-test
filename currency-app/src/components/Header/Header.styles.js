import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { myTheme } from '../../themes/DefaultTheme';

export const StyledHeader = styled.header`
  margin: 0 auto;
  width: 100%;
  height: 100px;
  box-shadow: 0px 1px 5px 0px rgb(34 60 80 / 18%);
  backdrop-filter: blur(15px);
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin: 0 auto;
  width: 100%;
  height 100px;
  max-width: 1400px;
  padding: 0 16px;
`;

export const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 2px;
  gap: 10px;
  user-select: none;
`;

export const LogoIcon = styled.img`
  width: 32px;
  height: 32px;
`;

export const Navbar = styled.nav``;

export const NavUl = styled.ul`
  padding-left: 60px;
  list-style-type: none;
  display: flex;
  gap: 15px;
`;
export const NavLi = styled.li`
  text-align: center;
  margin: 15px auto;
  font-family: Roboto;
  font-weight: 600;
  line-height: 40px;
  letter-spacing: 0.5px;
  box-sizing: border-box;
  border: 1px solid transparent;
  border-radius: 5px;
`;
export const StyledNavLink = styled(NavLink)`
  margin: 0px 10px;
  list-style-type: none;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  color: black;

  &:hover {
    // border: 1px solid lightgrey;
    text-shadow: 0px 4px 15px 0px rgb(34 60 80 / 10%);
    color: ${myTheme.colors.secondary};
  }
`;
