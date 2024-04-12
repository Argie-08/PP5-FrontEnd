// import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import "./Payment.css";
import Gcash from "../assets/gcash.png";
import Maya from "../assets/maya.png";
import useApi from "../utils/http";

const Payment = () => {
  const [checked, setChecked] = useState(false);
  const [checkedTerms, setCheckedTerms] = useState(false);
  // const location = useLocation();

  const [roomName, setRoomName] = useState([]);
  const [roomPrice, setRoomPrice] = useState([]);
  const [night, setNight] = useState([]);
  const [romProduct, setRomProduct] = useState([]);
  const [romDiscount, setromDiscount] = useState([]);
  const [romPayment, setromPayment] = useState([]);

  const [guestFirstName, setGuestFirstName] = useState("");
  const [guestLastName, setGuestLastName] = useState("");
  const [guestGender, setGuestGender] = useState("");
  const [guestPhone, setGuestPhone] = useState();
  const [guestEmail, setGuestEmail] = useState("");
  const [guestAdress, setGuestAdress] = useState("");
  const [guestCity, setGuestCity] = useState("");
  const [guestCountry, setGuestCountry] = useState("");

  const api = useApi();

  const [account, setAccount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  useEffect(() => {
    const firstData = JSON.parse(localStorage.getItem("room_name"));
    const secondData = JSON.parse(localStorage.getItem("room_price"));
    const thirdData = JSON.parse(localStorage.getItem("night"));
    setRoomName(firstData);
    setRoomPrice(secondData);
    setNight(thirdData);
    total();
    discount();
    grandTotal();
  }, [total, discount, grandTotal]);

  function total() {
    const nightValue = night;
    const romPrice = roomPrice;
    const product = nightValue * romPrice;
    setRomProduct(product);
  }

  function discount() {
    const subTotal = romProduct;
    const percent = 0.2;
    const totalDiscount = subTotal * percent;
    setromDiscount(totalDiscount);
  }

  function grandTotal() {
    const subNight = romProduct;
    const subDiscount = romDiscount;
    const paymentTotal = subNight - subDiscount;
    setromPayment(paymentTotal);
  }

  async function roomData() {
    const { data } = await api.get("/guest.php");
  }

  async function createGuest(e) {
    e.preventDefault();

    try {
      const body = {
        guest_firstName: guestFirstName,
        guest_lastName: guestLastName,
        guest_gender: guestGender,
        guest_phoneNumber: guestPhone,
        guest_email: guestEmail,
        guest_address: guestAdress,
        guest_city: guestCity,
        guest_country: guestCountry,
      };

      const { data } = await api.post("/guest.php", body);
      console.log(data);

      roomData();
      setGuestFirstName("");
      setGuestLastName("");
      setGuestGender("");
      setGuestPhone("");
      setGuestEmail("");
      setGuestAdress("");
      setGuestCity("");
      setGuestCountry("");
    } catch (error) {}
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
            <p className="line2 line3 m-0"></p>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center line4">
            <h2 className="mt-5 mb-3">Payment</h2>
          </Col>
        </Row>
        <form onSubmit={createGuest}>
          <Row className="mt-3">
            <Col md={4} className="border-end">
              <p className="">Your Reservation</p>
              <Table>
                <tbody>
                  <tr>
                    <td className="border-0 paymentFontColor">{roomName}</td>
                    <td className="d-flex justify-content-end border-0"></td>
                  </tr>
                  <tr>
                    <td className="border-0">
                      <span
                        className="pi pi-user"
                        style={{ fontSize: "1rem" }}
                      ></span>
                      <span className="ms-3">Guest</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-0">{night} Nights</td>
                    <td className="d-flex justify-content-end border-0">
                      {romProduct}
                    </td>
                  </tr>
                  <tr>
                    <td className="">Discount 20%</td>
                    <td className="d-flex justify-content-end">
                      {romDiscount}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-0 paymentFontWeight">Total</td>
                    <td className="d-flex justify-content-end border-0 paymentFontWeight">
                      {romPayment}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md={4} className="border-end">
              <p className="">Guest Information</p>
              <InputText
                placeholder="Firstname"
                className="paymentInputSize border-top-0 border-start-0 border-end-0 mb-3"
                value={guestFirstName}
                onChange={(e) => setGuestFirstName(e.target.value)}
              />
              <InputText
                placeholder="Lastname"
                className="paymentInputSize border-top-0 border-start-0 border-end-0 mb-3"
                value={guestLastName}
                onChange={(e) => setGuestLastName(e.target.value)}
              />
              <InputText
                placeholder="Gender"
                className="paymentInputSize border-top-0 border-start-0 border-end-0 mb-3"
                value={guestGender}
                onChange={(e) => setGuestGender(e.target.value)}
              />
              <InputText
                keyfilter="int"
                placeholder="Contact Number"
                className="paymentInputSize border-top-0 border-start-0 border-end-0 mb-3"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
              />
              <InputText
                placeholder="House No., Street, Barangay"
                className="paymentInputSize border-top-0 border-start-0 border-end-0 mb-3"
                value={guestAdress}
                onChange={(e) => setGuestAdress(e.target.value)}
              />
              <InputText
                placeholder="Municipality/City"
                className="paymentInputSize border-top-0 border-start-0 border-end-0 mb-3"
                value={guestCity}
                onChange={(e) => setGuestCity(e.target.value)}
              />
              <InputText
                placeholder="Country"
                className="paymentInputSize border-top-0 border-start-0 border-end-0 mb-3"
                value={guestCountry}
                onChange={(e) => setGuestCountry(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <p className="">Payment Method</p>
              <Row>
                <Col className="d-flex gap-3">
                  <img src={Maya} alt="" className="paymentImg" />
                  <img src={Gcash} alt="" className="paymentImg" />
                </Col>
              </Row>
              <InputText
                keyfilter="int"
                type="text"
                onChange={(e) => setAccount(e.target.value)}
                placeholder="Account Number"
                className="paymentInputSize border-top-0 border-start-0 border-end-0 mb-3 mt-3"
              />
              <InputText
                type="text"
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Account Name"
                className="paymentInputSize border-top-0 border-start-0 border-end-0 mb-3"
              />
              <div className="d-flex align-items-center">
                <div className="card flex justify-content-center me-3">
                  <Checkbox
                    onChange={(e) => setChecked(e.checked)}
                    checked={checked}
                  ></Checkbox>
                </div>
                <label className="ml-2">
                  Use the same address as contact information
                </label>
              </div>
              <div className="d-flex mt-3">
                <div className="me-3">
                  <Checkbox
                    onChange={(e) => setCheckedTerms(e.checked)}
                    checked={checkedTerms}
                  ></Checkbox>
                </div>
                <div>
                  <span>I have read and agree to the </span>
                  <span>
                    <a href="">Terms and Conditions</a>
                  </span>
                </div>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <Button
                  className="paymentButton"
                  type="submit"
                  disabled={!account || !accountNumber || !checkedTerms}
                >
                  BOOK NOW
                </Button>
              </div>
            </Col>
          </Row>
        </form>
      </Container>
    </>
  );
};

export default Payment;
