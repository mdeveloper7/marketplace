/** External libs */
import React from 'react'
import { RiHome3Line, RiCalendarTodoLine, RiStore3Line, RiPantoneLine, RiMacbookLine, RiArrowDownSLine } from 'react-icons/ri'
import Anime from 'react-anime'
import { Navbar, Nav, Row } from 'react-bootstrap'

/** Assets */
import logo from '/assets/images/logo.svg'

/** Styles */
import styles from './Header.styles.scss'

const navAnimeProps = {
  opacity: [0, 1],
  translateY: [-80, 0],
  delay: (el, i) => i * 400,
  duration: (el, i) => 2000
}
const logoAnimeProps = {
  opacity: [0, 1],
  scale: [1.7, 1],
  duration: (el, i) => 1500
}

const Header = () => {
  return (
    <div className={styles.nav}>
      <Navbar>
        <Navbar.Brand href="#home">
          <Anime {...logoAnimeProps} easing="linear">
            <img src={logo} alt="brand logo" className={styles.logo}/>
          </Anime></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Row>
            <Navbar.Text className="mr-2">shop name</Navbar.Text>
            <img className={styles['user-thumb']} src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" alt="user thumb"/>
            <Navbar.Text><RiArrowDownSLine className={styles.icon}/></Navbar.Text>
          </Row>
        </Navbar.Collapse>
      </Navbar>
      <Navbar bg="dark" variant="dark" className={styles.nav} expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Anime {...navAnimeProps}>
              <Nav.Link href="#home"><RiHome3Line className={styles.icon}/>Mi Dashboard</Nav.Link>
              <Nav.Link href="#home"><RiCalendarTodoLine className={styles.icon}/>Categorias</Nav.Link>
              <Nav.Link href="#home"><RiStore3Line className={styles.icon}/>Products</Nav.Link>
              <Nav.Link href="#home"><RiMacbookLine className={styles.icon}/>Ventas</Nav.Link>
              <Nav.Link href="#home"><RiPantoneLine className={styles.icon}/>Mi Información</Nav.Link>
            </Anime>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header
