import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Booking from "../components/Booking";
import Welcome from "../components/Welcome";
import VideoCover from "../components/VideoCover";
import FunctionHall from "../components/FunctionHall";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Hero.css";
import Carousel from "react-bootstrap/Carousel";
import useApi from "../utils/http";
import Address from "../components/Address";

const Hero = () => {
  const navigate = useNavigate();
  const api = useApi();
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  async function getData() {
    const { data } = await api.get("/resort.php"); //get data on localDatabase
    setCarouselData(data);
  }

  return (
    <>
      <Row className="">
        <Col>
          <Carousel fade className="carouselMain">
            {carouselData.map((detail, index) => {
              return (
                <Carousel.Item
                  interval={3500}
                  className="carouselContainer"
                  key={index}
                >
                  <div className="overlay"></div>
                  <img src={detail.resort_image} className="bg3" />
                  <Carousel.Caption className="bg5">
                    <h3>{detail.resort_tags}</h3>
                    <Button
                      variant="outline-light"
                      className="p-0 px-5 py-2"
                      onClick={() => {
                        navigate("/read");
                      }}
                    >
                      READ MORE
                    </Button>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
      </Row>

      <Booking />
      <Welcome />
      <VideoCover />
      <FunctionHall />
      <Address />
    </>
  );
};

export default Hero;
