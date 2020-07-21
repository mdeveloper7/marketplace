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
  MyStoreContainer,
  FormContainer,
  RowContainer,
  LinkContainer,
  SpinnerContainer
} from './my-store.styles'

/** Components */
import Form from '/components/form/form.component'
import Text from '/components/text/text.component'
import Spinner from '/components/spinner/spinner.component'

/** Constants */
const INITIAL_FORM = {
  name: '',
  description: '',
  contactEmail: '',
  stateId: 0,
  fbUrl: '',
  instagramUrl: ''
}

const INITIAL_STATE = {
  isLoading: false,
  error: null
}

const MyStore = () => {
  const dispatch = useDispatch()
  const { me } = useSelector(state => state.auth)

  // * @property {string} InstagramUrl
  // * @property {string} Phone
  // * @property {string} DefaultColor
  // * @property {number} ZipCode
  // * @property {string} Address
  const formDefinition = useRef({
    description: {
      props: {
        name: 'description',
        label: 'Descripción',
        onChange: handleChange,
        'max-length': 255
      },
      definition: {
        type: INPUT_TYPE.TEXT,
        validations: [VALIDATION.REQUIRED],
        errors: [
          ({ val, name, label, form }) => `${label} es un campo requerido`,
        ]
      }
    },
    name: {
      props: {
        name: 'name',
        label: 'Nombre de tu marca',
        onChange: handleChange,
        'max-length': 100
      },
      definition: {
        type: INPUT_TYPE.TEXT,
        validations: [VALIDATION.REQUIRED],
        errors: [
          ({ val, name, label, form }) => `${label} es un campo requerido`,
        ]
      }
    },
    contactEmail: {
      props: {
        name: 'contactEmail',
        label: 'Email',
        onChange: handleChange,
        'max-length': 100
      },
      definition: {
        type: INPUT_TYPE.TEXT,
        validations: [VALIDATION.REQUIRED, VALIDATION.EMAIL],
        errors: [
          ({ val, name, label, form }) => `${label} es un campo requerido`,
          ({ val, name, label, form }) => `${label} debe estar bien formado`,
        ]
      }
    },
    stateId: {
      props: {
        name: 'stateId',
        label: 'Estado',
        onChange: handleChange,
        'max-length': 100
      },
      definition: {
        type: INPUT_TYPE.TEXT,
        firstSelected: true
      }
    },
    fbUrl: {
      props: {
        name: 'fbUrl',
        label: 'Mi pagina de Facebook:',
        onChange: handleChange
      },
      definition: {
        type: INPUT_TYPE.TEXT
      }
    },
    instagramUrl: {
      props: {
        name: 'instagramUrl',
        label: 'Mi pagina de Instagram:',
        onChange: handleChange
      },
      definition: {
        type: INPUT_TYPE.TEXT
      }
    }
  }).current
  const formOrder = useRef(['name', 'description', 'contactEmail', 'stateId', 'fbUrl', 'instagramUrl']).current
  const [form, setForm] = useState(INITIAL_FORM)
  const { isLoading, error } = useState(INITIAL_STATE)

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
    setForm({
      ...me
    })
  }, [])

  return (
    <MyStoreContainer className="container">
      <div className="row h-100">
        <div className="col-sm-10 offset-sm-1 col-md-6 offset-md-3 h-100">
          <FormContainer>
            <Text as="h1" type={Text.TYPE.TITLE} align="center" className="mb-5">Mi Tienda</Text>
            <Text type={Text.TYPE.LEAD} as="h2" align="center">
              Verifica y actualiza tu información en caso de ser necesario
              <br />
              si encuentras algún campo que consideres importante y no se encuentra notifica a tu administrador.
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
              submitText='Actualizar'
            />)}
          </FormContainer>
        </div>
      </div>
    </MyStoreContainer>
  )
}

export default MyStore
