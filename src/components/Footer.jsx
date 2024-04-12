import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "primeicons/primeicons.css";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="topfoot">
        <Container>
          <Row>
            <Col className="d-flex justify-content-evenly align-items-center text">
              <p className="m-0 footext">ABOUT US</p>
              <p className="m-0 footext">THINGS TO DO</p>
              <p className="m-0 footext">FAQ'S</p>
              <p className="m-0 footext">COOKIE POLICY</p>
              <p className="m-0 footext">NEWS</p>
              <p className="pi pi-facebook footext m-0"></p>
              <p className="pi pi-instagram footext m-0"></p>
              <p className="pi pi-tiktok footext m-0"></p>
              <p className="pi pi-youtube footext m-0"></p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="belowfoot">
        <p className="address m-0">
          Brgy. Osukan, Labason, Zamboanga del Norte, Philippines 7117
        </p>
        <p className="phoneemail m-0 mb-3">
          {" "}
          Phone: 0123456789 | Email: argcanonayon@gmail.com
        </p>
        <p className="copyright m-0">
          &copy; Copyright 2024 | All rights reserved
        </p>
        <p className="developer m-0">Powered by Arg Web Development</p>
      </div>
    </>
  );
};

export default Footer;
