import useApi from "../utils/http";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "primereact/button";
import Card from "react-bootstrap/Card";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import "./FunctionHall.css";

const FunctionHall = () => {
  const api = useApi();
  const [cardFunc, setCardFunc] = useState([]);
  const [seeModal, setSeeModal] = useState(false);
  const [modalHall, setModalHall] = useState();
  const [modalImage, setModalImage] = useState();
  const [modalCapacity, setModalCapacity] = useState();
  const [modalPrice, setModalPrice] = useState();
  const [startDate, setStartDate] = useState();
  const [closeDate, setCloseDate] = useState();
  const [night, setNight] = useState();

  console.log(startDate);
  console.log(closeDate);

  useEffect(() => {
    getFunc();
    localStorage.setItem("night", JSON.stringify(night));
    localStorage.setItem("room_name", JSON.stringify(modalHall));
    localStorage.setItem("room_price", JSON.stringify(modalPrice));
    localStorage.setItem("room_capacity", JSON.stringify(modalCapacity));
    return () => {};
  }, [night, modalHall, modalPrice]);

  async function getFunc() {
    const { data } = await api.get("./functionHall.php");
    setCardFunc(data);
  }

  function showModal(data) {
    setSeeModal(true);
    setModalHall(data.hall_type);
    setModalImage(data.hall_image);
    setModalCapacity(data.hall_capacity);
    setModalPrice(data.hall_price);
  }

  function handleClose() {
    setSeeModal(false);
    setStartDate("");
    setCloseDate("");
  }

  function modalData() {
    duration();
  }

  function duration() {
    const first = startDate;
    const second = closeDate;
    const oneDay = 1000 * 60 * 60 * 24;
    const result = (second - first) / oneDay;
    setNight(result);
  }
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col className="d-flex flex-column align-items-center">
            <h4 className="mt-5 d-flex justify-content-center">
              "Exchange everlasting vows on the alluring beachfront with the
              relaxing sea breeze"
            </h4>
            <p className="mt-5 mb-5">
              Bayangan Bay Resort is the perfect location for your special event
              in Mindanao. It brings us so much joy to be part of weddings,
              birthdays, reunions, and many more. We are here to make these
              occasions unforgettable. Celebrate your milestone or once in a
              lifetime event. Whether you choose something intimate or grand, we
              will ensure that your vision becomes a seamless reality. Revel in
              the company of your loved ones as the magnificent sky and majestic
              ocean surrounds you!
            </p>
          </Col>
        </Row>
        <Row className="mb-5">
          {cardFunc.map((details, index) => {
            return (
              <Col xs={12} md={4} key={index}>
                <Card className="hallcard">
                  <div className="imgbase">
                    <Card.Img
                      variant="top"
                      src={details.hall_image}
                      className="hallimg"
                    />
                    <div className="overlay4"></div>
                  </div>

                  <Card.Body className="HallCardBody">
                    <Card.Title className="halltext">
                      {details.hall_type}
                    </Card.Title>
                    <Card.Text className="halltext d-flex justify-content-between">
                      Starts at Php {details.hall_price}
                      <a
                        className="halltext hallRead"
                        onClick={() => {
                          showModal(details);
                        }}
                      >
                        Read More...
                      </a>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        <Dialog
          header={modalHall}
          visible={seeModal}
          style={{ width: "50vw" }}
          onHide={() => setSeeModal(false)}
        >
          <Row>
            <Col md={8}>
              <img src={modalImage} alt="" className="modalImage " />
              <div className="modalBack mt-3 px-4 py-3 mb-3">
                <h6 className="modalLine">
                  <b>Important Notes</b>
                </h6>
                <p className="m-0">
                  • Good for <b>{modalCapacity}</b> pax.
                </p>
                <p className="m-0">• Rental/reservation cost is for 5 hours.</p>
                <p>
                  • Table tops and table cloths are not available for outside
                  catering
                </p>
                <div>
                  <h6 className="modalLine">
                    <b>Additional Charges</b>
                  </h6>
                  <p className="m-0">
                    • Electricity Fee (lights and sound system)
                  </p>
                  <p>
                    • Outside catering (corkage fee is 20% of food total amount)
                  </p>
                </div>
              </div>
            </Col>
            <Col md={4} className="p-0">
              <div className="priceBox d-flex justify-content-center align-items-center">
                <h2 className="priceText">Php {modalPrice} / day</h2>
              </div>
              <div className="mt-3">
                <p>Preferred Date:</p>
                <Calendar
                  placeholder="Start Date"
                  className="startDate"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
                <Calendar
                  placeholder="Closing Date"
                  className="startDate mt-2"
                  value={closeDate}
                  onChange={(e) => {
                    setCloseDate(e.target.value);
                  }}
                />
                <div className="d-flex mt-3 gap-2 justify-content-end">
                  <Button
                    type="submit"
                    label="Return"
                    className="BookNowBtn"
                    onClick={handleClose}
                  ></Button>
                  <a href="/payment" className="bookLine">
                    <Button
                      type="submit"
                      label="BOOK NOW"
                      onClick={modalData}
                      disabled={!startDate || !closeDate}
                    ></Button>
                  </a>
                </div>
              </div>
              <div className="modalBack mt-3 px-4 py-3">
                <h6 className="modalLine">
                  <b>RULES AND REGULATIONS</b>
                </h6>
                <p>
                  The FFG. Rules and Regulations are to make your stay{" "}
                  <b>SAFE, COMFORTABLE / HASSLE FREE</b> , Please take time to
                  read the following:
                </p>
                <p className="m-0">
                  • Drugs and Firearms are not allowed inside the resort. Please
                  surrender firearms at the reception area.
                </p>
                <p className="m-0">
                  • Strictly no Cancellation of reservation. (No Refund Policy)
                </p>
                <p className="m-0">
                  • Pay Attention with your belongings. Resort will not be
                  responsible for any losses of your valuable things.
                </p>
              </div>
            </Col>
          </Row>
        </Dialog>
      </Container>
    </>
  );
};

export default FunctionHall;
