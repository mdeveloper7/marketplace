/** External libs */
import styled from 'styled-components'
import { RiLoader5Line } from 'react-icons/ri'

export const Spinner = styled(RiLoader5Line)`
  font-size: ${({ large }) => large ? '80px' : '40px'};
`

export const SpinnerContainer = styled.span``

export const SpinnerPageContainer = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
