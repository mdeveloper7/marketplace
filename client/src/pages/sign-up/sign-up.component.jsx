/** External libs */
import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
/** Internal libs */
import { VALIDATION, INPUT_TYPE } from '/utils/form'
import { APP_ROUTES, FORM, GENERIC_ERROR_NETWORK_ERROR_MESSAGE } from '/utils/globals'
import { useSpring, animated } from 'react-spring'
import Input from '/components/Input/Input.component'
import { postSignUp } from '../../api/auth/auth.api'

/** Components */
import Form from '/components/form/form.component'
import Link from '/components/link/link.component'
import Logo from '/components/logo/logo.component'
import Text from '/components/text/text.component'
import Spinner from '/components/spinner/spinner.component'
import Button from '/components/button/button.component'
import { RiMailCheckLine } from 'react-icons/ri'

/** Styles */
import {
  SignUpContainer,
  FormContainer,
  RowContainer,
  LinkContainer,
  LogoContainer,
  SpinnerContainer
} from './sign-up.styles'

/** constants */
/**@default */
const INITIAL_FORM = {
  /** @type {string} */
  email: '',
  /** @type {string} */
  password: '',
    /** @type {string} */
  confirmPassword: '',
},

INITIAL_STATE = {
  /** @type {boolean} */
  isLoading: false,
  /** @type {string} */
  error: null,
  /** @type {boolean} */
  isFormSent: false
};

/** @component SignUp
 * @returns {React.ReactNode} - functional component
*/
const SignUp = () => {
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
    },
    confirmPassword: {
      props: {
        name: 'confirmPassword',
        label: 'Confirmar contraseña',
        onChange: handleChange
      },
      definition: {
        type: INPUT_TYPE.PASSWORD,
        validations: [VALIDATION.REQUIRED, VALIDATION.PASSWORD, VALIDATION.EQUALS],
        errors: [
          ({ val, name, label, form }) => `${label} es un campo requerido`,
          ({ val, name, label, form }) => `${label} debe constar de un minimo de 6 caracteres, entre numeros y letras`,
          ({ val, name, label, form }) => `${label} no coincide`
        ]
      }
    }
  }).current
  const formOrder = useRef(['email', 'password', 'confirmPassword']).current
  const [form, setForm] = useState(INITIAL_FORM)
  const { me, isLoading, error } = useSelector(state => state.auth)
  // const animatedProps = useSpring({ opacity: isFormSent ? 1 : 0, transform: isFormSent ? 'translateY(0)' : 'translateY(-20px)' });


  /**@function handleChange
   * event handler for input change
   * @param {Event} - syntatic event from react
  */
  function handleChange(event) {
    const { target: { name, value } } = event;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  }

  /**@function handleTryAgainClick
   * helper function to reset the form
  */
  function handleTryAgainClick() {
    setForm({ ...INITIAL_FORM });
    setIsFormSent(false);
  }

  /** Event handler triggered when form is submitted
    * @param {boolean} formHasErrors
    */
   function handleSubmit (formHasErrors) {
    if (formHasErrors) {
      return
    }

    postSignUp({
      email: form.email,
      password: form.password
    });
  }

  useEffect(() => {
    if (me) {
      history.replace(APP_ROUTES.ADMIN)
    }
  }, [me])

  return (
    <SignUpContainer className="container">
      <div className="row h-100">
        <div className="col-sm-10 offset-sm-1 col-md-6 offset-md-3 h-100">
          <FormContainer>
            <LogoContainer>
              <Logo />
            </LogoContainer>
            <Text as="h1" type={Text.TYPE.TITLE} align="center" 
            className="mb-5">Crear nueva cuenta</Text>
            <Text type={Text.TYPE.LEAD} as="h2" align="center">
              Gracias por confiar en nosotros
            </Text>
            {isLoading && (
              <SpinnerContainer>
                <Spinner />
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
              submitText='Registrarse'
            />)}
            <RowContainer>
              <LinkContainer>
                <Text>Ya tengo una cuenta ,&nbsp;</Text>
                <Link to={APP_ROUTES.SIGN_IN}>
                  llevame al inicio
                </Link>
              </LinkContainer>
              <LinkContainer>
                <Link to={APP_ROUTES.FORGOT_PASSWORD}>
                  ¿Olvidaste tu contraseña?
                </Link>
              </LinkContainer>
            </RowContainer>
          </FormContainer>
        </div>
      </div>
    </SignUpContainer>
  );
};

export default SignUp;