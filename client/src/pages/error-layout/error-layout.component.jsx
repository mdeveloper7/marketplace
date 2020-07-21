/** External libs */
import React from 'react'

/** Components */
import Text from '/components/text/text.component'
import Logo from '/components/logo/logo.component'
/** Styles */
import { LogoContainer, ErrorContainer } from './error-layout.styles'

const Error = () => {
  return (
    <ErrorContainer className="container">
      <LogoContainer>
        <Logo/>
      </LogoContainer>
      <Text align="center" type={Text.TYPE.TITLE}>
        Ups!, ocurrio un error inesperado intenta de nuevo,
        <br/>
        si el error persiste por favor contacta a tu administrador.
      </Text>
    </ErrorContainer>
  )
}

export default Error
