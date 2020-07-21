import React, { memo } from 'react'
import Anime from 'react-anime'
/** Components */
import Text from '/components/text/text.component'
/** Styles */
import { LogoContainer } from './logo.styles'
/** Constants */
const LOGO_WORDING = ['M', 'A', 'R', 'K', 'E', 'T', 'P', 'L', 'A', 'C', 'E']
const animeProps = {
  opacity: [0, 1],
  translateY: [-100, 0],
  duration: 4000,
  delay: (el, i) => i * 400
}

/** @component Logo
 * @returns {React.ReactNode}
 */
const Logo = () => {
  return (
    <LogoContainer>
      <Anime {...animeProps} className="track">
        {LOGO_WORDING.map((letter, i) => {
          return <Text key={i} type={Text.TYPE.BIG}>{letter}</Text>
        })}
      </Anime>
    </LogoContainer>
  )
}

export default memo(Logo)
