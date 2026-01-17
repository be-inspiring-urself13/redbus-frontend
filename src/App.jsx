//frontend/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Toaster} from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BusList from "./pages/BusList";
import SeatSelect from "./pages/SeatSelect";
import Payment from "./pages/Payment";
import BookingSuccess from "./pages/BookingSuccess";
import Navbar from "./components/Navbar";
import Bookings from "./pages/Bookings";
import Help from "./pages/Help";

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            marginBottom: "5rem",
            background: "#fff",
            color: "#111",
            border: "1px solid #eee",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
        }}
      />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/help" element={<Help />} />
            <Route path="/buses" element={<BusList />} />
            <Route path="/seats/:id" element={<SeatSelect />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/bookings" element={<Bookings />}></Route>
          </Routes>
        </div>
      </BrowserRouter >
  );
}

export default App;
