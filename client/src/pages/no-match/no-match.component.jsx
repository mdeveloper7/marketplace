/** External libs */
import React from 'react'

/** Components */
import Text from '/components/text/text.component'
import Logo from '/components/logo/logo.component'
/** Styles */
import { LogoContainer, NoMatchContainer } from './no-match.styles'

const NoMatch = () => {
  return (
    <NoMatchContainer className="container">
      <LogoContainer>
        <Logo/>
      </LogoContainer>
      <Text align="center" type={Text.TYPE.TITLE}>
        Lo sentimos
        <br/>
        no encontramos lo que estabas buscando
      </Text>
    </NoMatchContainer>
  )
}

export default NoMatch
