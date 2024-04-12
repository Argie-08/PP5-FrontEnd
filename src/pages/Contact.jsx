import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import d1 from "../assets/front.jpg";
import "./Contact.css";
import { useState } from "react";

const Contact = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState();
  const [fname, setfname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState();

  return (
    <>
      <div className="roomMain">
        <div className="overlay"></div>
        <img src={d1} alt="" className="roomhero" />
        <div className="roomherotext">
          <p className="roomText">CONTACT US</p>
          <p>WE LOVE TO HEAR FROM YOU</p>
        </div>
      </div>
      <Container>
        <Row className="mt-2">
          <Col md={8} className="mt-5">
            <h3>Let us know what your ideal beach getaway is like.</h3>
            <div>
              <p className="m-0">+63912456489</p>
              <p>bayanganresort@gmail.com</p>
            </div>
            <Container className="conTable mt-3 mb-4">
              <Row>
                <Col md={6} className="mt-4">
                  <div className="d-flex flex-column">
                    <label htmlFor="username">Subject</label>
                    <InputText
                      id="username"
                      aria-describedby="username-help"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  <div className="d-flex flex-column mt-2">
                    <label htmlFor="username">Email Address</label>
                    <InputText
                      id="username"
                      aria-describedby="username-help"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </Col>
                <Col md={6} className="mt-4">
                  <div className="d-flex flex-column">
                    <label htmlFor="username">Full Name</label>
                    <InputText
                      id="username"
                      aria-describedby="username-help"
                      value={fname}
                      onChange={(e) => setfname(e.target.value)}
                    />
                  </div>
                  <div className="d-flex flex-column mt-2">
                    <label htmlFor="username">Phone</label>
                    <InputText
                      type="number"
                      id="username"
                      aria-describedby="username-help"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col>
                  <div className="card flex justify-content-center">
                    <InputTextarea
                      rows={5}
                      cols={30}
                      placeholder="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="py-4">
                <Col>
                  <div className="d-flex justify-content-center">
                    <Button
                      label="Submit"
                      className="contactBtn"
                      disabled={
                        !subject || !email || !fname || !phone || !message
                      }
                      onClick={() => navigate("/")}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col md={4} className="ps-5 mt-5">
            <h5>Area Information</h5>
            <p>
              Fronting a spacious beachfront, our stylish day use resort in
              Labason is a perfect setting for fun family getaways or office
              team building activities. Our address by the shore also makes the
              resort a great base for an exciting exploration of the
              municipality. In addition, we offer options and transportation
              assistance for island hopping, tours, and food tripping.
            </p>
            <p>
              If you’re still undecided about where to stay in Labason, consider
              Bayangan Bay Resort as your top pick! Come and stay with us and
              see a lush and lively vista steeped in history.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
