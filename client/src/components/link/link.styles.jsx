import styled from 'styled-components'
import { Link as RRDLink } from 'react-router-dom'
import { SPACING } from '/styles/vars'

export const Link = styled(RRDLink)`
  text-decoration: none;
  & .link-text {
    position: relative;
    & .icon {
      position: absolute;
      content: '';
      top: 50%;
      left: -${SPACING * 2}px;
      transform: translateY(-50%);
      opacity: 0;
      transition: opacity 400ms ease;
    }
    &:hover {
      & .icon {
        opacity: 1;
      }
    }
  }
`
