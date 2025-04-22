import { Component } from "react";
import { FaHouseUser } from "react-icons/fa";
import "./Navbar.css";
import { MenuItems } from "./MenuItems";
import { FaBars, FaTimes } from "react-icons/fa";
class Navbar extends Component {
  state = {
    clicked: false,
  };

  toggleMenu = () => {
    this.setState({ clicked: !this.state.clicked });
  }; // handles the click event for the menu icon

  render() {
    const { clicked } = this.state;
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">Egyptour</h1>
        <div className="menu-icon" onClick={this.toggleMenu}>
          {clicked ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  <i className="nav-icon">{item.icon}</i>
                  {item.title}
                </a>
              </li>
            );
          })}
          <button className="btn">Sign Up</button>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
