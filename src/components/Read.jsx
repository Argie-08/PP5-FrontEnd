import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import b1 from "../assets/fam.jpg";
import b2 from "../assets/escape1.jpeg";
import b3 from "../assets/buffet.jpg";

import "./Read.css";

const Read = () => {
  return (
    <>
      <Container className="bookhead" />
      <Container>
        <Row>
          <Col className="d-flex justify-content-center mb-5">
            <h3 className="wonderful">"Wonderful Experience"</h3>
          </Col>
        </Row>
        <Row>
          <Col className="readbox p-0 mb-5">
            <img src={b1} alt="" className="img1" />
            <div className="readbox2 ps-3 pt-3">
              <p className="read5">
                Indulge in a peaceful and rejuvenating retreat at a luxurious
                hideaway paradise.
              </p>
              <p>Inclusions:</p>
              <p>• Daily breakfast for two persons at The Shoreline</p>
              <p>• Complimentary use of swimming pool and beach area</p>
              <p>• Complimentary WiFi access</p>
              <p>• Welcome drink upon arrival</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="readbox p-0 mb-4">
            <img src={b2} alt="" className="img1" />
            <div className="readbox2 ps-3 pt-3">
              <p className="read5">
                Make it an unforgetable getaway in one of our suites and save up
                to 20% on your vacation.
              </p>
              <p>Inclusions:</p>
              <p>• Daily breakfast for two persons at The Shoreline</p>
              <p>• Complimentary use of swimming pool and beach area</p>
              <p>• Complimentary WiFi access</p>
              <p>• Welcome drink upon arrival</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="readbox p-0 mb-4">
            <img src={b3} alt="" className="img1" />
            <div className="readbox2 ps-3 pt-3">
              <p className="read5">
                Cap off the day with an island gastronomic experience at The
                Shoreline.
              </p>

              <p>• PHP 2,400 net per person</p>
              <p>• Friday and Saturdays</p>
              <p>• 6:00 PM to 10:30 PM</p>
              <p>• Complimentary WiFi access</p>
              <p>• Welcome drink upon arrival</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Read;
