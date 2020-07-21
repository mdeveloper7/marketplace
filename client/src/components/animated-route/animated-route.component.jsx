
/** External libs */
import React, { memo } from 'react'
import Anime from 'react-anime'
import PropTypes from 'prop-types'

/** Constants */
const props = {
  opacity: [0, 1],
  translateX: [-100, 0],
  duration: () => 700,
  easing: 'linear'

}

/** @component RouteAnime */
const RouteAnime = ({ children }) => {
  return (
    <Anime {...props}>
      {children}
    </Anime>
  )
}

RouteAnime.propTypes = {
  children: PropTypes.node
}

export default memo(RouteAnime)
