/** External libs */
import React, { useRef, useState } from 'react'
/** Internal libs */
import { VALIDATION, INPUT_TYPE } from '/utils/form'
import { APP_ROUTES, GENERIC_ERROR_NETWORK_ERROR_MESSAGE } from '/utils/globals'
import { forgotPassword } from '../../api/auth/auth.api'

/** Styles */
import {
  ForgotPasswordContainer,
  FormContainer,
  RowContainer,
  LinkContainer,
  FormSentContainer,
  Icon,
  LogoContainer,
  SpinnerContainer
} from './forgot-password.styles'

/** Components */
import Form from '/components/form/form.component'
import Link from '/components/link/link.component'
import Logo from '/components/logo/logo.component'
import Text from '/components/text/text.component'
import Spinner from '/components/spinner/spinner.component'
import Button from '/components/button/button.component'
import { RiMailCheckLine } from 'react-icons/ri'

const INITIAL_FORM = {
  email: '',
  password: ''
}
const INITIAL_STATE = {
  isLoading: false,
  error: true,
  isFormSent: false
}

const ForgotPassword = () => {
  const formDefinition = useRef({
    email: {
      props: {
        name: 'email',
        label: 'Email',
        onChange: handleChange
      },
      definition: {
        type: INPUT_TYPE.TEXT,
        validations: [VALIDATION.REQUIRED, VALIDATION.EMAIL],
        errors: [
          ({ val, name, label, form }) => `${label} es un campo requerido`,
          ({ val, name, label, form }) => `${label} debe ser valido`
        ]
      }
    }
  }).current
  const formOrder = useRef(['email']).current
  const [state, setState] = useState(INITIAL_STATE)
  const [form, setForm] = useState(INITIAL_FORM)
  /** Event handler to set a change */
  function handleChange (event) {
    const { target: { name, value } } = event
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  async function handleSubmit (formHasErrors) {
    if (formHasErrors) {
      return
    }
    setState(prevState => ({
      ...prevState,
      isLoading: true
    }))
    try {
      await forgotPassword(form.email, false)
      setState({
        isLoading: false,
        error: null,
        isFormSent: true
      })
    } catch (e) {
      setState({
        isFormSent: false,
        isLoading: false,
        error: GENERIC_ERROR_NETWORK_ERROR_MESSAGE
      })
    }
  }

  return (
    <ForgotPasswordContainer className="container">
      <div className="row h-100">
        <div className="col-sm-10 offset-sm-1 col-md-6 offset-md-3 h-100">
          <FormContainer>
            <LogoContainer>
              <Logo/>
            </LogoContainer>
            <Text as="h1" type={Text.TYPE.TITLE} align="center" className="mb-5">¿Olvidaste tu contraseña?</Text>
            <Text type={Text.TYPE.LEAD} as="h2" align="center">
              Sabemos que esto es frustrante
              <br/>
              así que te llevaremos de la mano en este proceso
            </Text>
            {state.isFormSent && !state.isLoading && (
              <FormSentContainer>
                <Icon><RiMailCheckLine/></Icon>
                <Text as="h2" align="center">
                Un email fue enviado a tu cuenta!
                estamos listos para reestalecer tu contraseña
                anda! echa un vistazo!
                </Text>
                <Text size="20px" as="h2" align="center" className="mt-3">
                  ¿Aun no llega?
                </Text>
                <Button>Intentemos de nuevo!</Button>
              </FormSentContainer>
            )}
            {state.isLoading && (
              <SpinnerContainer>
                <Spinner/>
              </SpinnerContainer>
            )}
            {!state.isFormSent && !state.isLoading && (
              <Form
                className="mt-5 mb-5"
                formDefinition={formDefinition}
                formState={form}
                formOrder={formOrder}
                onSubmit={handleSubmit}
                submitText='Enviar'
              />
            )}
            <RowContainer>
              <LinkContainer>
                <Text>Recorde mi contraseña!!</Text>
                <Link to={APP_ROUTES.SIGN_IN}>
                  Llevame al inicio
                </Link>
              </LinkContainer>
              <LinkContainer>
                <Text as="label">¿No tienes una cuenta?</Text>
                <Link to={APP_ROUTES.SIGN_UP}>
                  Crea una ahora
                </Link>
              </LinkContainer>
            </RowContainer>
          </FormContainer>
        </div>
      </div>
    </ForgotPasswordContainer>
  )
}

export default ForgotPassword

