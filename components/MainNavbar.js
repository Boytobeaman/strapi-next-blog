import React from 'react'
import Link from './Link'
import Image from 'next/image'

import { menu } from '~/utils/common'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown
} from 'reactstrap';
export default class MainNavbar extends React.Component{
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  renderNavbar(){

    return Object.keys(menu).map(function(key) {
      let this_menu = menu[key];
      let this_url = menu[key].url;
      if(this_url === "/"){
        return (
          <NavItem key={key}>
            <Link href="/">
              <a className="nav-link" title="Home">Home</a>
            </Link>
          </NavItem>
        )
      }else{
        if(this_menu.showInUi){
          return (
            <NavItem key={key}>
              <Link  href={this_menu.url}>
                <a className={`nav-link`} title={this_menu.text}>
                  {this_menu.text}
                </a>
              </Link>
            </NavItem>
          )
        }
      }
    });
  }
  render() {
    return (
      <Navbar color="dark" dark className="fixed-top border-bottom" expand="md" id="mainNavbar" itemScope='' itemType="http://schema.org/SiteNavigationElement">
        <NavbarBrand className="py-0" href="/">
          <figure className="image mb-0">
            <Image alt="plastic pallets logo" src={`/imgs/pallet-header-logo-trans.png`} width="160" height="40"></Image>
          </figure>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse isOpen={!this.state.collapsed} navbar>
          <Nav className="mr-auto" navbar>
            {this.renderNavbar()}
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}
