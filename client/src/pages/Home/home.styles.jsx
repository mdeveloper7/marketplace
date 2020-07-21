import styled from 'styled-components'

import { SPACING } from '/styles/vars'
import { LIGHT } from '/styles/colors'

export const HomeContainer = styled.main`
  --height: 150px;
`

export const MainTextContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: var(--height);
  min-height: var(--height);
  margin-right: ${SPACING}px;
`

export const RollingContainer = styled.article`
  display: flex;
  position: relative;
  flex-direction: column;
  overflow: hidden;
  width: 300px;
  height: var(--height);
  max-height: var(--height);
  min-height: var(--height);
`

export const RollingTextContainer = styled.div`
  display: flex;
  align-items: center;
  max-height: var(--height);
  min-height: var(--height);
  position: absolute;
  top: var(--height);
  width: 300px;
  left: 0;
  z-index: 1;
  background-color: ${LIGHT};
`

export const HeaderRow = styled.div`
  display: flex;
`

export const Header = styled.header`
  padding: ${SPACING * 10}px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
