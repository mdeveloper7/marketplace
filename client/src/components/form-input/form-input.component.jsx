/** External libs */
import React from 'react'
import PropTypes from 'prop-types'

/** Internal libs */
import { DANGER } from '/styles/colors'

/** Components */
import Text from '/components/text/text.component'

/** Styles */
import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel,
  FormInputError
} from './form-input.styles'

const FormInput = ({ label, error, ...props }) => (
  <GroupContainer>
    <FormInputContainer {...props} className={error ? 'error' : ''} />
    {error && <FormInputError><Text type={Text.TYPE.SMALL} color={DANGER}>{error}</Text></FormInputError>}
    {label ? (
      <FormInputLabel className={props.value.toString().length ? 'shrink' : ''}>
        {label}
      </FormInputLabel>
    ) : null}
  </GroupContainer>
)

FormInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
}

export default FormInput
