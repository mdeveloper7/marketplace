import styled, { css } from 'styled-components'

const invertedButtonStyles = css`
  background-color: white;
  color: black;
  border: 1px solid black;
  &:hover {
    border: 1px solid white;
    background-color: black;
    color: white;
    border: none;
  }
`

const buttonStyles = css`
  background-color: black;
  color: white;
  border: none;
  border: 1px solid black;
  &:hover {
    background-color: white;
    border: 1px solid black;
    & * {
      color: black;
    }
  }
`

const getButtonStyles = props => {
  return props.inverted ? invertedButtonStyles : buttonStyles
}

export const Button = styled.button`
  min-width: 165px;
  width: ${({ block }) => block ? '100%' : 'auto'};
  letter-spacing: 0.5px;
  height: 45px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  ${getButtonStyles}
`
