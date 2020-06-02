import React from 'react';
import './App.css';
import BoxesList from './components/boxesList';
import BoxView from './components/boxView';
import { Route } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
function App() {
  return (
    <div className="App">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/boxes/">Boxes</NavbarBrand>
        <NavbarToggler />
        <Collapse navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/boxes/">All Boxes</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/aaltheiab/cloud-developer-capstone">GitHub</NavLink>
            </NavItem>  
          </Nav>

        </Collapse>
      </Navbar>
      <Route exact path='/boxes/' component={BoxesList} />
      <Route path='/boxes/:sku' component={BoxView} />
    </div>
  );
}

export default App;
