import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Booking from "./components/Booking";
import Hero from "./pages/Hero";

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={route.element}
              exact
            />
          );
        })}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
