import Styled from 'styled-components'
import { Link } from 'react-router-dom'
import { DARK, LIGHT } from '/styles/colors'
import Text from '/components/text/text.component'

export const AdminContainer = Styled.main`
  --nav-item-size: 60px;

  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: ${LIGHT}
`

export const LeftNav = Styled.nav`
  width: var(--nav-item-size);
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${DARK};
`

export const ContentContainer = Styled.section`
  flex: 1;
  height: 100%;
`

export const NavItemTitle = Styled(Text)`
  position: absolute;
  top: 0;
  left: 0;
  height: var(--nav-item-size);
  transition: all cubic-bezier(0.25, 0.1, 0.25, 1.0) 400ms;
  transform: translateX(-100%);
  display: flex;
  min-width: 200px;
  max-width: 200px;
  justify-content: center;
  align-items: center;
  color: ${LIGHT} !important;
  text-align: left;
  background-color: ${DARK};
  &:hover {
    text-decoration: none;
  }
`

export const LeftNavItem = Styled(Link)`
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  height: var(--nav-item-size);
  text-decoration: none;
  color: ${LIGHT} !important;
  text-align: left;
  background-color: ${DARK};
  transition: all cubic-bezier(0.25, 0.1, 0.25, 1.0) 400ms;
  &:hover {
    & ${NavItemTitle} {
      transform: translateX(var(--nav-item-size));
    }
    background-color: ${LIGHT};
    color: ${DARK} !important;
  }
`

export const NavItemIcon = Styled.span`
  font-size: 1.5rem;
`
