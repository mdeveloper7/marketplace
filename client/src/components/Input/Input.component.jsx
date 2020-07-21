/** libs */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

/** styles */
import styles from './Input.module.scss'

/** @component Input
 * @returns {React.ReactNode}
 */
const Input = ({error, icon, className, ...props}) => {
  return (
    <div className={classNames('input-group mb-3', styles.input)} >
      <div className="input-group-prepend">
        <div className="input-group-text">
          {icon}
        </div>
      </div>
      <input {...props} className={classNames(className, { 'is-invalid': Boolean(error)})}/>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>)
}

Input.defaultProps = {
  icon: '',
  value: '',
  error: ''
}

Input.propTypes = {
  /** icon object to be used in input */
  icon: PropTypes.object,
  /** input value */
  value: PropTypes.string.isRequired,
  /** input error */
  error: PropTypes.string
}

export default memo(Input)
