import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';


export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <div>
      <header>
        <Navbar 
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" 
          color="dark"

        >
          <Container>
            <NavbarBrand href="/" className="text-white-50">
              React
            </NavbarBrand>
            <NavbarToggler className="d-sm-inline-flex flex-sm-row-reverse" onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-white-50" to="/">Customers</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link}  className="text-white-50" to="/product">Products</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-white-50" to="/store">Stores</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-white-50" to="/sales">Sales</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
      </div>
    );
  }
}
