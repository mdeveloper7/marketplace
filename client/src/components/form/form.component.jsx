/** External libs */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

/** Internal libs */
import { INPUT_TYPE } from '/utils/form'

/** Components */
import FormInput from '/components/form-input/form-input.component'
import Button from '/components/button/button.component'

/** Styles */

/** @component Form */
const Form = ({ formDefinition, formOrder, formState, onSubmit, submitText, ...props }) => {
  const [formErrors, setFormErrors] = useState({})

  /** Helper function to validate form values  */
  function validateForm () {
    let hasErrors = false
    setFormErrors({})
    formOrder.forEach(inputName => {
      const formInputDef = formDefinition[inputName]
      const { validations, errors } = formInputDef.definition
      const { name, label } = formInputDef.props
      const inputValue = formState[inputName]
      if (formInputDef) {
        const validationErrorIndex = validations.findIndex(validation => validation(inputValue, formState))
        if (validationErrorIndex === -1) {
          return
        }
        console.log(inputValue, name, label, formState, formInputDef)
        const error = errors[validationErrorIndex]({
          val: inputValue,
          name,
          label,
          form: formState
        })
        hasErrors = true

        setFormErrors(prevState => ({
          ...prevState,
          [inputName]: error
        }))
      }
    })
    return hasErrors
  }

  /** Event handler to submit form  */
  function handleSubmit () {
    const hasErrors = validateForm()
    console.log(hasErrors)
    onSubmit(hasErrors, { ...formErrors })
  }

  return (<form noValidate onSubmit={handleSubmit} {...props}>
    {formOrder.map(inputName => {
      const formInputDef = { ...formDefinition[inputName] }
      const { type } = formInputDef.definition
      const formInputValue = formState[inputName]
      if (formInputValue === undefined || !formInputDef) {
        console.warn(`Form: ${inputName} does not exists in form definition or form state`)
        return <></>
      }
      switch (type) {
        case INPUT_TYPE.TEXT: {
          return <FormInput value={formInputValue} key={inputName} type={type} {...formInputDef.props} error={formErrors[inputName]} />
        }
        case INPUT_TYPE.PASSWORD: {
          return <FormInput value={formInputValue} key={inputName} type={type} {...formInputDef.props} error={formErrors[inputName]} />
        }
        default: {
          throw TypeError(`Form: ${formInputDef.type} not implemented`)
        }
      }
    })}
    <Button onClick={handleSubmit} block>{submitText}</Button>
  </form>)
}

Form.propTypes = {
  /** Form values like { email: 'john@doe' } */
  formState: PropTypes.object,
  /** Form defition */
  formDefinition: PropTypes.shape({
    [PropTypes.any]: PropTypes.shape({
      /** Input */
      definition: PropTypes.shape({
        /** Input value validations applied when form is submitted  */
        validations: PropTypes.arrayOf(PropTypes.func).isRequired,
        /** Input errors applied if a validation fails  */
        errors: PropTypes.arrayOf(PropTypes.func).isRequired,
        /** Form Input type */
        type: PropTypes.string.isRequired
      }),
      props: PropTypes.shape({
        /** Input name */
        name: PropTypes.string.isRequired,
        /** Input label  */
        label: PropTypes.string.isRequired
      })
    })
  }),
  /** Event handler for on submit function */
  onSubmit: PropTypes.func,
  formOrder: PropTypes.arrayOf(PropTypes.string),
  /** Text for submit button */
  submitText: PropTypes.string
}

export default Form
