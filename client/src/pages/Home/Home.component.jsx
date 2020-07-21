/** External libs */
import React from 'react'
import Anime, { anime } from 'react-anime'

/** Components */
import Text from '/components/text/text.component'

/** Styles */
import { HomeContainer, RollingContainer, RollingTextContainer, HeaderRow, Header, MainTextContainer, RollingInnerContainer } from './home.styles'

/** Constants */
const ROLLING_WORDING = [
  'Vende',
  'Compra',
  'Organiza',
  'Regala'
]
const WORD_CONTAINER_HEIGHT = 150

const Home = () => {
  return (
    <HomeContainer className="container">
      <Header>
        <HeaderRow>
          <MainTextContainer>
            <Text size="80px" as="h1">Marketplace</Text>
          </MainTextContainer>
          <RollingContainer>
            <Anime
              loop
              opacity={[0, 1]}
              translateY={[0, `-${WORD_CONTAINER_HEIGHT}px`]}
              easing="easeInOutCubic"
              delay={(el, i) => i * 2000}
              duration={1500}
              direction="alternate"
            >
              {ROLLING_WORDING.map(word => (
                <RollingTextContainer key={word}>
                  <Text size="80px" as="h2">{word}</Text>
                </RollingTextContainer>
              ))}
            </Anime>
          </RollingContainer>
        </HeaderRow>
        <HeaderRow>
          <Text size="50px" as="h1">Bienvenido a la mejor Experiencia en compras</Text>
        </HeaderRow>
      </Header>
    </HomeContainer>
  )
}

export default Home
