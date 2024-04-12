import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Address.css";

const Address = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h3>Our Location:</h3>
            <address className="italic">
              Bayangan Bay Resort, Labason, Zamboanga del Norte
            </address>
          </Col>
        </Row>
        <Row>
          <Col>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.8642732997714!2d122.44691579344043!3d8.115299352751443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3253b42a5db29faf%3A0xcb5b515f6fc2f431!2sBayangan%20Island!5e0!3m2!1sen!2sph!4v1712896855494!5m2!1sen!2sph"
              width="600"
              height="450"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              className="addressMap mb-4"
            ></iframe>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Address;
