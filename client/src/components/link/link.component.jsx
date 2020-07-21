/** External libs */
import React from 'react'
import PropTypes from 'prop-types'

/** Components */
import { RiArrowRightLine } from 'react-icons/ri'
import Text from '/components/text/text.component'

/** Styles */
import {
  Link as Body
} from './link.styles'

const Link = props => (
  <Body {...props}>
    <Text className="link-text" decoration={Text.DECORATION.UNDERLINED}>
      <RiArrowRightLine className="icon" />
      {props.children}
    </Text>
  </Body>
)

Link.propTypes = {
  children: PropTypes.node
}

export default Link
