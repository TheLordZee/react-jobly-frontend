import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import "./NavBar.css";

const NavBar = ({currUser, signout}) => {
  return(
      <div>
        <Navbar expand="md" className="sticky-top">
          <NavLink exact to="/" className="navbar-brand ms-2">
            Jobly
          </NavLink>

          <Nav className="ms-auto" navbar>
            {(currUser !== null) ? 
              <>
              <NavItem className="nav-item">
                <NavLink to="/companies">Companies</NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <NavLink to="/jobs">Jobs</NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <NavLink to="/profile">Profile</NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <Link to="" onClick={signout}>Log Out {currUser.username}</Link>
              </NavItem>  
              </>
              :
              <>
              <NavItem className="nav-item">
                <NavLink to="/login">Login</NavLink>
              </NavItem>  
              <NavItem className="nav-item">
                <NavLink to="/signup">Sign Up</NavLink>
              </NavItem>  
              </>
            }
            
          </Nav>
        </Navbar>
      </div>
  );
}
  
export default NavBar;