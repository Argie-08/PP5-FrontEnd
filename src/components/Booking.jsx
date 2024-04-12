import { useNavigate } from "react-router-dom";
import "./Booking.css";
import { useState } from "react";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Booking = () => {
  //Pass data from One Page to Another page
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adult, setAdult] = useState();
  const [minor, setMinor] = useState();
  const adultNumber = [0, 1, 2, 3, 4, 5];
  const minorNumber = [0, 1, 2, 3, 4, 5];

  // End of Pass code

  return (
    <>
      <Container className="test2">
        <Row className="d-flex align-items-center rowHeight m-0">
          <Col sm={3} className="p-0 ps-4 py-1 ">
            <h2 className="m-0 colorses">Rooms</h2>
            <p className="m-0 mb-3 colorses">20% Discount</p>
            <h2 className="m-0 colorses">BOOK NOW</h2>
          </Col>
          <Col sm={2} className="p-0 px-1 mb-2 ">
            <div className="card flex justify-content-center">
              <Calendar
                value={checkIn}
                onChange={(e) => setCheckIn(e.value)}
                placeholder="Check-In Date"
                className="d-flex justify-content-center"
              />
            </div>
          </Col>
          <Col sm={2} className="p-0 px-1  mb-2">
            <div className="card flex justify-content-center">
              <Calendar
                value={checkOut}
                onChange={(e) => setCheckOut(e.value)}
                placeholder="Check-Out Date"
                // className="centerText"
              />
            </div>
          </Col>
          <Col sm={2} className="p-0 px-1  mb-2">
            <div className="card flex justify-content-center">
              <Dropdown
                value={adult}
                onChange={(e) => setAdult(e.value)}
                placeholder="Adult"
                options={adultNumber}
              />
            </div>
          </Col>
          <Col sm={2} className="p-0 px-1  mb-2">
            <div className="card flex justify-content-center">
              <Dropdown
                value={minor}
                onChange={(e) => setMinor(e.value)}
                placeholder="Minor"
                options={minorNumber}
              />
            </div>
          </Col>
          <Col sm={1} className="p-0 bookbtn m-0 d-flex justify-content-center">
            <div className="card flex ">
              <i
                className="pi pi-angle-right icon"
                onClick={() => {
                  navigate("/reservation", {
                    replace: true,
                    state: { checkIn, checkOut, adult, minor },
                  });
                }}
              ></i>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Booking;
