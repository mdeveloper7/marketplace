/** External libs */
import styled from 'styled-components'
/** Internal libs */
import { SPACING, BREAKPOINTS } from '/styles/vars'

export const SignInContainer = styled.main`
  height: 100vh;
`

export const LogoContainer = styled.header`
  display: flex;
  justify-content: center;
  margin-bottom: ${SPACING * 8}px;
`

export const FormContainer = styled.section`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  @media (${BREAKPOINTS.SM}) {
    width: 100%;
  }
`

export const SpinnerContainer = styled.section`
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Icon = styled.div`
  font-size: 80px;
  margin: ${SPACING * 4}px;
`

export const RowContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const LinkContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
