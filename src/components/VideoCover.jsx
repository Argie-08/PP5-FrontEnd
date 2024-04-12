import { useNavigate } from "react-router-dom";
import Island from "../assets/Island.mp4";
import "./VideoCover.css";

const VideoCover = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="main mt-5">
        <div className="overlay3"></div>
        <video src={Island} autoPlay loop className="mainVideo" />
        <div className="content">
          <p className="mainTitle">Bayangan Island Hopping</p>
          <p className="mainDes">
            Let the waves hit your feet, and the sand be your seat
          </p>
          <button
            className="mainBtn px-5 py-2"
            onClick={() => {
              navigate("/read");
            }}
          >
            Read More
          </button>
        </div>
      </div>
    </>
  );
};

export default VideoCover;
