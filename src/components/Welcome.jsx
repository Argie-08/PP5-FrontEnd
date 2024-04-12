import useApi from "../utils/http";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";

import "./Welcome.css";

const Welcome = () => {
  const api = useApi();
  const navigate = useNavigate();
  const [cardData, setCardData] = useState([]);
  const [showRoom, setShowRoom] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomImg, setRoomImg] = useState();
  const [roomCap, setRoomCap] = useState();
  const [roomPrice, setRoomPrice] = useState();
  const [adult, setAdult] = useState();
  const [minor, setMinor] = useState();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState();
  const [nightDate, setNightDate] = useState();
  const adultNumber = [0, 1, 2, 3, 4, 5];
  const minorNumber = [0, 1, 2, 3, 4, 5];

  useEffect(() => {
    getRoom();
    localStorage.setItem("night", JSON.stringify(nightDate));
    localStorage.setItem("room_name", JSON.stringify(roomName));
    localStorage.setItem("room_capacity", JSON.stringify(roomCap));
    localStorage.setItem("room_price", JSON.stringify(roomPrice));

    return () => {};
  }, [nightDate]);

  async function getRoom() {
    const { data } = await api.get("/room_type.php"); //get data on localDatabase
    const limitedData = data.slice(0, 4);
    setCardData(limitedData);
  }

  function handleRoom(data) {
    setShowRoom(true);
    setRoomName(data.room_name);
    setRoomImg(data.room_img);
    setRoomCap(data.room_capacity);
    setRoomPrice(data.room_price);
  }

  function handleClose() {
    setShowRoom(false);
  }

  function modalData() {
    differe();
  }

  function differe() {
    const data1 = checkIn;
    const data2 = checkOut;
    const one = 1000 * 60 * 60 * 24;
    let result;
    result = Math.ceil((data2 - data1) / one);
    setNightDate(result);
  }

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col>
            <h4 className="welcomeSpace d-flex justify-content-center">
              WELCOME TO BAYANGAN BAY RESORT – THE PREMIER ECO RESORT ON LABASON
              (MURCIELAGOS ISLAND)
            </h4>
            <p className="mt-5">
              Bayangan island is your private sanctuary. This exclusive resort
              located in Labason, Zamboanga del Norte is a tranquil retreat for
              anyone looking to unwind and gain peace of mind.
            </p>
            <p className="mb-5">
              You can find what best suits your needs from our wide range of
              accommodations and facilities. Couples ignite their romance with
              our special candlelight dinners. Families grow closer to each
              other as they glide down our waterslide and move from one infinity
              pool to another. Companies strengthen their work relationships
              with our obstacle course and various team-building activities.
            </p>
          </Col>
        </Row>
        <Row className="d-flex">
          {cardData.map((detail, index) => {
            return (
              <Col xs={12} md={3} className="cardCol mb-4" key={index}>
                <Card className="card101">
                  <div className="overlay2"></div>
                  <Card.Img variant="top" src={detail.room_img} className="" />
                  <div className="roomdetail ps-4 pb-4">
                    <h6 className="roomprice">{detail.room_price} per night</h6>
                    <h3 className="roomtype">{detail.room_type}</h3>
                    <button
                      className="roombtn px-2"
                      onClick={() => {
                        handleRoom(detail);
                      }}
                    >
                      Read More ...
                    </button>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
        <Dialog
          header={roomName}
          visible={showRoom}
          style={{ width: "50vw" }}
          onHide={() => setShowRoom(false)}
        >
          <Row className="imgPos">
            <Col>
              <img src={roomImg} alt="" className="modalImg p-0" />
              <Row className="box d-flex align-items-center ">
                <Col xs={3} className="p-0 ps-2">
                  <Calendar
                    placeholder="Check-In Date"
                    className=""
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                    }}
                  />
                </Col>
                <Col xs={3} className="p-0 px-2">
                  <Calendar
                    placeholder="Check-Out Date"
                    value={checkOut}
                    onChange={(e) => {
                      setCheckOut(e.target.value);
                    }}
                  />
                </Col>
                <Col xs={3} className="p-0 px-2">
                  <Dropdown
                    value={adult}
                    placeholder="Adult"
                    options={adultNumber}
                    className="w-100"
                    onChange={(e) => {
                      setAdult(e.target.value);
                    }}
                  />
                </Col>
                <Col xs={3} className="p-0 pe-2">
                  <Dropdown
                    value={minor}
                    placeholder="Minor"
                    options={minorNumber}
                    className="w-100"
                    onChange={(e) => {
                      setMinor(e.target.value);
                    }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col></Col>
          </Row>
          <Row className="mt-3 ">
            <Col md={9}>
              <div className="d-flex justify-content-start">
                <span
                  className="pi pi-user pe-3"
                  style={{ fontSize: "1.2rem" }}
                ></span>
                <span>Accommodate {roomCap} guests</span>
              </div>
            </Col>
            <Col md={3}>
              <div className="d-flex justify-content-center">
                <p>Price: P{roomPrice}</p>
              </div>
            </Col>
          </Row>

          <Row className="bedColor mt-3">
            <h5 className="bedLine py-2">Bedroom</h5>
            <Row>
              <Col md={6}>
                <p className="mb-1">• Luxury king-size bed</p>
                <p className="mb-1">
                  • Extra bed for adult in room (on request)
                </p>
                <p>• Baby cot in room (on request)</p>
              </Col>
              <Col md={6}>
                <p className="mb-1">• Memory foam pillows</p>
                <p>• Extra bed for child in room (on request)</p>
              </Col>
            </Row>
          </Row>
          <Row className="bedColor mt-3">
            <h5 className="bedLine py-2">Food and Beverage</h5>
            <Row>
              <Col md={6}>
                <p className="mb-1">• Complimentary bottled water</p>
                <p>• Kettle</p>
              </Col>
              <Col md={6}>
                <p className="mb-1">• Coffee/tea in room</p>
                <p>• Mini bar</p>
              </Col>
            </Row>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end p-0 mt-3 gap-2">
              <Button
                label="Return"
                text
                className="returnBtn"
                onClick={handleClose}
              ></Button>
              <a href="/payment" className="bookLine">
                <Button
                  type="submit"
                  label="BOOK NOW"
                  onClick={modalData}
                  disabled={!checkIn || !checkOut}
                ></Button>
              </a>
            </Col>
          </Row>
        </Dialog>

        <Link to="/room" className="linkbtn d-flex justify-content-end">
          <button className="roomviewbtn px-4 py-1">View All Rooms</button>
        </Link>
      </Container>
    </>
  );
};

export default Welcome;
