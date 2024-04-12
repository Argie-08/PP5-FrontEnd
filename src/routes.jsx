import Hero from "./pages/Hero";
import Room from "./pages/Room";
import FuncHall from "./pages/FuncHall";
import Contact from "./pages/Contact";
import Reservation from "./pages/Reservation";
import Payment from "./pages/Payment";
import Read from "./components/Read";

const routes = [
  {
    path: "/reservation",
    element: <Reservation />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/read",
    element: <Read />,
  },
  {
    path: "/functionHall",
    element: <FuncHall />,
  },
  {
    name: "Resort",
    path: "/",
    element: <Hero />,
  },
  {
    name: "Facilities",
    path: "/room",
    element: <Room />,
  },

  {
    name: "Contact Us",
    path: "/contact",
    element: <Contact />,
  },
];

export default routes;
