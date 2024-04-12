import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "primereact/button";
import routes from "../routes";
import "./Navigation.css";
import Logo from "../assets/Logo.png";

const Navigation = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [color, setColor] = useState(false);

  const changeColor = () => {
    if (window.scrollY >= 500) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  function nextPage(path) {
    setShow(false);
    navigate(path);
  }

  return (
    <>
      <div className={color ? "header header-bg" : "header"}>
        <Navbar expand="lg" className="">
          <Container>
            <div>
              <img src={Logo} alt="" className="logo" />
            </div>
            <div className="bg4">
              <div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto gap-3">
                    {routes.map((route, index) => {
                      return (
                        <Nav.Link
                          key={index}
                          onClick={() => nextPage(route.path)}
                        >
                          {route.name}
                        </Nav.Link>
                      );
                    })}
                  </Nav>
                </Navbar.Collapse>
              </div>
              <div className="card flex justify-content-center">
                <Button
                  label="BOOK NOW"
                  className="navbtn"
                  onClick={() => {
                    navigate("/room");
                  }}
                />
              </div>
            </div>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default Navigation;
