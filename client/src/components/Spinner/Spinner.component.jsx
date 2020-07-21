import React from 'react'
import PropTypes from 'prop-types'
import Anime from 'react-anime'

/** Styles */
import { Spinner as Body, SpinnerPageContainer, SpinnerContainer } from './spinner.styles'

/** Constants */
const animeProps = {
  loop: true,
  easing: 'linear',
  rotate: ['0', '360deg'],
  duration: 700
}

/** @component Spinner
 * @returns {React.ReactNode}
 */
const Spinner = ({ large, legend, asPage }) => {
  let Container = SpinnerContainer
  if (asPage) {
    Container = SpinnerPageContainer
  }
  return (
    <Container>
      <Anime {...animeProps}>
        <Body large={large} />
      </Anime>
      <span>{legend}</span>
    </Container>
  )
}

Spinner.propTypes = {
  /** To indicate wheter the spinner should have the whole  */
  asPage: PropTypes.bool,
  /** To indicate wheter or not the spinner must be large */
  large: PropTypes.bool,
  /** Text to be displayed */
  legend: PropTypes.string
}

export default Spinner
