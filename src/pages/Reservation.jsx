import useApi from "../utils/http";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "primereact/card";
// import { useHistory } from "react-router-dom";
import "./Reservation.css";

const Test = () => {
  const [getRoomName, setGetRoomName] = useState([]);
  const [getRoomPrice, setGetRoomPrice] = useState([]);
  const [getCheckInPass, setGetCheckInPass] = useState();
  const [getCheckOutPass, setGetCheckOutPass] = useState();
  const [getAdultPass, setGetAdultPass] = useState();
  const [getMinorPass, setGetMinorPass] = useState();
  const [reservationData, setReservationData] = useState([]);
  const [difference, setDifference] = useState([]);
  const navigate = useNavigate();

  const data = useRef();
  const api = useApi();
  //received data using useNavigate from another page
  const location = useLocation();
  const adultNumber1 = [0, 1, 2, 3, 4, 5];
  const minorNumber1 = [0, 1, 2, 3, 4, 5];

  //end received of data

  useEffect(() => {
    getReservationData();
    passesCheckIn();
    passesCheckOut();
    passesAdult();
    passesMinor();
    return () => {};
  }, []);

  async function getReservationData() {
    try {
      const { data } = await api.get("/room_type.php");
      setReservationData(data);
    } catch (error) {}
  }

  useEffect(() => {
    localStorage.setItem("room_name", JSON.stringify(getRoomName));
    localStorage.setItem("room_price", JSON.stringify(getRoomPrice));
    localStorage.setItem("night", JSON.stringify(difference));
  }, [getRoomName]);

  function passesCheckIn() {
    const getPass = location.state.checkIn;
    setGetCheckInPass(getPass);
  }
  function passesCheckOut() {
    const getPassOut = location.state.checkOut;
    setGetCheckOutPass(getPassOut);
  }
  function passesAdult() {
    const getAdult = location.state.adult;
    setGetAdultPass(getAdult);
  }
  function passesMinor() {
    const getMinor = location.state.minor;
    setGetMinorPass(getMinor);
  }

  function Testing(data) {
    setGetRoomName(data.room_name);
    setGetRoomPrice(data.room_price);
    setDateConverter();
  }

  function setDateConverter() {
    const newStartDate = getCheckInPass;
    const newEndDate = getCheckOutPass;
    const one_day = 1000 * 60 * 60 * 24;
    let result;
    result = Math.ceil((newEndDate - newStartDate) / one_day);

    setDifference(result);
  }

  return (
    <>
      <Container className="bookhead"></Container>

      <Container>
        <Row>
          <Col
            xs={6}
            className="d-flex justify-content-end align-items-center gap-2"
          >
            <i className="pi pi-circle"></i>
            <p className="line1 m-0"></p>
          </Col>
          <Col
            xs={6}
            className="d-flex justify-content-start align-items-center gap-2"
          >
            <i className="pi pi-circle"></i>
            <p className="line2 m-0"></p>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <h2 className="mt-5 mb-5">Guest & Accommodation</h2>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col sm={3}>
            <label htmlFor="">Check In</label>
            <div className="card flex justify-content-center">
              <Calendar value={getCheckInPass} placeholder="Check-In Date" />
            </div>
          </Col>
          <Col sm={3}>
            <label htmlFor="">Check Out</label>
            <div className="card flex justify-content-center">
              <Calendar value={getCheckOutPass} placeholder="Check-Out Date" />
            </div>
          </Col>
          <Col sm={3}>
            <label htmlFor="">Adult</label>
            <div className="card flex justify-content-center">
              <Dropdown
                value={getAdultPass}
                placeholder="Adult"
                options={adultNumber1}
              />
            </div>
          </Col>
          <Col sm={3}>
            <label htmlFor="">Minor</label>
            <div className="card flex justify-content-center">
              <Dropdown
                value={getMinorPass}
                placeholder="Minor"
                options={minorNumber1}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <label htmlFor="" className="mb-3">
            Choose Your Room:
          </label>
        </Row>
        <Row>
          {reservationData.map((detail, index) => {
            return (
              <Col md={3} key={index}>
                <Card className="reservationCard mb-5">
                  <h5 className="mb-3">{detail.room_name}</h5>
                  <img
                    src={detail.room_img}
                    className="reservationImage mb-3"
                  />
                  <Row className="d-flex align-items-center">
                    <Col md={4}>
                      <i
                        className="pi pi-user"
                        style={{ fontSize: "1rem" }}
                      ></i>
                      <p className="reservationGuestText m-0">
                        {detail.room_capacity} Guests
                      </p>
                    </Col>
                    <Col
                      md={4}
                      className="p-0 d-flex justify-content-center align-items-center reservationPrice"
                    >
                      <p className=" m-0 reservationGuestPriceText">
                        P{detail.room_price}
                      </p>
                    </Col>
                    <Col md={4} className="p-0 pe-2">
                      <div className="card flex justify-content-center reservationBtnText">
                        <a href="/payment" className="reservationBtn2">
                          <Button
                            type="submit"
                            label="BOOK NOW"
                            disabled={!getCheckInPass || !getCheckOutPass}
                            className="reservationBtn p-0 px-2"
                            onClick={() => {
                              Testing(detail);
                            }}
                          />
                        </a>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Test;
