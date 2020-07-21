/** External libs */
import Styled, { css } from 'styled-components'
/** Internal libs */
import { TEXT } from '/styles/colors'
import { BREAKPOINTS, SPACING } from '/styles/vars'
import { TYPE, DECORATION } from './text.vars'
console.log(` @media (${BREAKPOINTS.SM}) {
  font-size: 2.4rem;
}`)
const titleStyles = css`
  font-size: 1.9rem;
  @media (${BREAKPOINTS.SM}) {
    font-size: 2.2rem;
  }
`

const subtitleStyles = css`
  font-size: 1.4rem;
  @media (${BREAKPOINTS.SM}) {
    font-size: 1.6rem;
  }
`

const bigStyles = css`
  font-size: 3.3rem;
`

const smallStyles = css`
  font-size: 0.8rem;
`

const accentStyles = css`
  font-size: 1.2rem;
`

const paragraphStyles = css`
  font-size: 1rem;

`

const boldStyles = css`
  font-weight: 600;
`

const italicStyles = css`
  font-style: italic;
`
const underlinedStyles = css`
  text-decoration: underline;
`

const getTypeStyles = ({ type, size }) => {
  if (size) {
    return `font-size: ${size};`
  }
  switch (type) {
    case TYPE.ACCENT: {
      return accentStyles
    }
    case TYPE.SMALL: {
      return smallStyles
    }
    case TYPE.BIG: {
      return bigStyles
    }
    case TYPE.TITLE: {
      return titleStyles
    }
    case TYPE.SUBTITLE: {
      return subtitleStyles
    }
    default: {
      return paragraphStyles
    }
  }
}

const getDecorationStyles = ({ decoration }) => {
  switch (decoration) {
    case DECORATION.BOLD: {
      return boldStyles
    }
    case DECORATION.ITALIC: {
      return italicStyles
    }
    case DECORATION.BOLD_AND_ITALIC: {
      return `${italicStyles}${boldStyles}`
    }
    case DECORATION.UNDERLINED: {
      return underlinedStyles
    }
    default: {
      return ''
    }
  }
}

export const Body = Styled.p`
  font-family: 'Open Sans Condensed';
  color: ${({ color }) => color || TEXT};
  text-align: ${({ align }) => align};
  line-height: 1.5;
  margin: 0;
  ${getTypeStyles}
  ${getDecorationStyles}
`
