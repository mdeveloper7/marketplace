/** External libs */
import React from 'react'
import PropTypes from 'prop-types'
/** Internal libs */
/** Components */
import { Button as Body } from './button.styles'

/** Components */
import Text from '/components/text/text.component'

/** @component Button
 * @returns {React.node}
 */
const Button = ({ inverted, children, ...props }) => {
  return (
    <Body type="button" {...props} >
      <Text color={inverted ? Text.COLOR.DEFAULT : Text.COLOR.INVERTED}>{children}</Text>
    </Body>
  )
}

Button.propTypes = {
  inverted: PropTypes.bool,
  block: PropTypes.bool,
  children: PropTypes.node
}

export default React.memo(Button)
