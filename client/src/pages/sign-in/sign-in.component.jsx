/** External libs */
import React, { useRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
/** Internal libs */
import { VALIDATION, INPUT_TYPE } from '/utils/form'
import { APP_ROUTES } from '/utils/globals'
import { signIn } from '/redux/auth/auth.actions'
import { DANGER } from '/styles/colors'

/** Styles */
import {
  SignInContainer,
  FormContainer,
  RowContainer,
  LinkContainer,
  LogoContainer,
  SpinnerContainer
} from './sign-in.styles'

/** Components */
import Form from '/components/form/form.component'
import Text from '/components/text/text.component'
import Logo from '/components/logo/logo.component'
import Link from '/components/link/link.component'
import Spinner from '/components/spinner/spinner.component'

/** Constants */
const INITIAL_FORM = {
  email: '',
  password: ''
}

const SignIn = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { me, isLoading, error } = useSelector(state => state.auth)

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
          ({ val, name, label, form }) => `${label} debe estar formado correctamente`
        ]
      }
    },
    password: {
      props: {
        name: 'password',
        label: 'Contraseña',
        onChange: handleChange
      },
      definition: {
        type: INPUT_TYPE.PASSWORD,
        validations: [VALIDATION.REQUIRED, VALIDATION.PASSWORD],
        errors: [
          ({ val, name, label, form }) => `${label} es un campo requerido`,
          ({ val, name, label, form }) => `${label} debe constar de un minimo de 6 caracteres, entre numeros y letras`
        ]
      }
    }
  }).current
  const formOrder = useRef(['email', 'password']).current
  const [form, setForm] = useState(INITIAL_FORM)
  
  /** Event handler to set a change */
  function handleChange (event) {
    const { target: { name, value } } = event
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  /** Event handler triggered when form is submitted
    * @param {boolean} formHasErrors
    */
  function handleSubmit (formHasErrors) {
    if (formHasErrors) {
      console.log('wait form has errors')
      return
    }
    dispatch(signIn({
      email: form.email,
      password: form.password
    }))
  }

  useEffect(() => {
    console.log('next me', me)
    if (me) {
      history.replace(APP_ROUTES.ADMIN)
    }
  }, [me])

  return (
    <SignInContainer className="container">
      <div className="row h-100">
        <div className="col-sm-10 offset-sm-1 col-md-6 offset-md-3 h-100">
          <FormContainer>
            <LogoContainer>
              <Logo/>
            </LogoContainer>
            <Text as="h1" type={Text.TYPE.TITLE} align="center" className="mb-5">Que gusto verte!</Text>
            <Text type={Text.TYPE.LEAD} as="h2" align="center">
              Vende tus productos de la manera más segura,
              <br />
              al mejor precio, aprovecha esta oportunidad y aumenta tu visibilidad en internet.
            </Text>
            {isLoading && (
              <SpinnerContainer>
                <Spinner/>
              </SpinnerContainer>
            )}
            {!isLoading && error && (
              <Text color={DANGER} align="center" className="mt-4 mb-2">{error}</Text>
            )}
            {!isLoading && (<Form
              className="mt-3 mb-5"
              formDefinition={formDefinition}
              formState={form}
              formOrder={formOrder}
              onSubmit={handleSubmit}
              submitText='Entrar'
            />)}
            <RowContainer>
              <LinkContainer>
                <Text>¿Olvidaste tu contraseña?</Text>
                <Link to={APP_ROUTES.FORGOT_PASSWORD}>
                  Recuperala ya!
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
    </SignInContainer>
  )
}

export default SignIn
