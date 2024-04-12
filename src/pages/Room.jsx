import { useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
import { Button } from "primereact/button";
import "./Room.css";
import Room from "../assets/room.jpg";
import useApi from "../utils/http";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";

const room = () => {
  const api = useApi();
  const [roomData, setRoomData] = useState([]);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [capacity, setCapacity] = useState();
  const [night, setNight] = useState();

  useEffect(() => {
    getRoomData();
    localStorage.setItem("room_name", JSON.stringify(name));
    localStorage.setItem("room_price", JSON.stringify(price));
    localStorage.setItem("room_capacity", JSON.stringify(capacity));
    localStorage.setItem("night", JSON.stringify(night));
    return () => {};
  }, [name, price, capacity, night]);

  async function getRoomData() {
    const { data } = await api.get("/room_type.php");
    const reverseData = data.reverse();
    setRoomData(reverseData);
  }

  function showModalData(data) {
    setShowRoomModal(true);
    setName(data.room_name);
    setPrice(data.room_price);
    setCapacity(data.room_capacity);
  }

  function closeModal() {
    setShowRoomModal(false);
    setName("");
    setPrice("");
    setCapacity("");
  }

  function compute() {
    const d1 = checkIn;
    const d2 = checkOut;
    const oneday = 1000 * 60 * 60 * 24;
    const result = (d2 - d1) / oneday;
    setNight(result);
  }

  return (
    <>
      <div className="roomMain">
        <div className="overlay"></div>
        <img src={Room} alt="" className="roomhero" />
        <div className="roomherotext">
          <p className="roomText">ROOMS</p>
          <p>BEYOND THE EXPECTED</p>
        </div>
      </div>
      <Container>
        <Row>
          <Col className="d-flex flex-column align-items-center">
            <p className="m-0 mt-5">
              Stylish rooms, suites & cottages invite guests to unwind and enjoy
              tropical views. With exceptional amenities & high-tech fittings.
            </p>
            <p className="m-0">
              Bayangan Bay Resort takes accommodations in Mindanao to new levels
              of luxury.
            </p>
            <p className="m-0 mt-2 mb-5">
              Nothing beats a good nights sleep. That why we are always looking
              for ways to make bedtime better!
            </p>
          </Col>
        </Row>
      </Container>
      {roomData.map((detail, index) => {
        return (
          <Container key={index}>
            <Row className="my-4 d-flex justify-content-center">
              <Col md={3} className="d-flex flex-column justify-content-center">
                <h3 className="mb-3">{detail.room_name}</h3>
                <p>{detail.room_description}</p>
              </Col>
              <Col md={7}>
                <div className="roomBox1">
                  <img src={detail.room_img} alt="" className="boxImg" />
                  <div className="roomBox2 p-3">
                    <p className="roomTextTop m-0">Clean and Spacious</p>
                    <a className="roomBook1 m-0 mt-2">
                      <h5
                        className="bookClamp"
                        onClick={() => {
                          showModalData(detail);
                        }}
                      >
                        BOOK NOW
                      </h5>
                    </a>
                    {/* <p className="m-0 bookprice">P{detail.room_price} Only</p> */}
                  </div>
                  <div className="roomBox3 d-flex justify-content-center align-items-center gap-2 p-1">
                    <p className="pi pi-user m-0"></p>
                    <p className="m-0 roomGuestClamp py-2">
                      Accommodate <b>{detail.room_capacity}</b> guests
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        );
      })}
      <Dialog
        header="Confirmation"
        visible={showRoomModal}
        style={{ width: "30vw" }}
        onHide={() => showRoomModal(false)}
      >
        <Container>
          <Row className="d-flex justify-content-center">
            <Col className="d-flex justify-content-center align-items-center gap-4 mb-4 confirmLine pb-2">
              <p
                className="pi pi-exclamation-triangle m-0"
                style={{ fontSize: "2rem" }}
              ></p>
              <p className="m-0">
                Please select your Check-In Date and Check-Out Date
              </p>
            </Col>
            <Row>
              <Col>
                <p>For only {price} per night</p>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center w-100">
              <Col>
                <Calendar
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.value)}
                  placeholder="Check-In Date"
                  className="d-flex justify-content-center"
                />
              </Col>
              <Col>
                <Calendar
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.value)}
                  placeholder="Check-In Date"
                  className="d-flex justify-content-center"
                />
              </Col>
            </Row>
          </Row>
          <Row className="mt-4">
            <Col className="d-flex justify-content-end gap-2 ">
              <button className="cancel" onClick={closeModal}>
                Cancel
              </button>
              <a href="/payment" className="confirmBtn">
                <button
                  className="confirm px-3 py-2"
                  onClick={compute}
                  disabled={!checkIn || !checkOut}
                >
                  CONFIRM
                </button>
              </a>
            </Col>
          </Row>
        </Container>
      </Dialog>
    </>
  );
};

export default room;
