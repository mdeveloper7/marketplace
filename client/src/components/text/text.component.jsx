/** External libs */
import React from 'react'
import PropTypes from 'prop-types'
import { Body } from './text.styles'

/** Vars */
import { COLOR, TYPE, DECORATION } from './text.vars'

/** @component Text */
const Text = ({ children, ...props }) => (
  <Body {...props} >{children}</Body>
)

Text.defaultProps = {
  color: COLOR.DEFAULT
}

Text.propTypes = {
  /** CSS prop style */
  size: PropTypes.string,
  /** enum type for text like title, subtitle, p, big, small, accent... */
  type: PropTypes.oneOf(Object.values(TYPE)),
  /** enum decoration for text like underlined, italic, bold... */
  decoration: PropTypes.oneOf(Object.values(DECORATION)),
  /** CSS prop style */
  align: PropTypes.string,
  /** CSS prop style */
  color: PropTypes.string,
  /** React children */
  children: PropTypes.node.isRequired,
  /** Kind To be rendered as, like h1, h2, h3, p etc. */
  as: PropTypes.string
}

Text.TYPE = TYPE
Text.COLOR = COLOR
Text.DECORATION = DECORATION

export default Text
