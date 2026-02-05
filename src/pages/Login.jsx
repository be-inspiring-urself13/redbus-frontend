// //frontend/src/pages/Login.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import toast from "react-hot-toast";
// import { FaUser, FaLock } from "react-icons/fa";
// import bg from "../assets/bg.jpeg";
// import loginimg from "../assets/login.jpg";


// //Regex Validations
// const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;

// export default function Login() {
//   const { login } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [remember, setRemember] = useState(false);
//   const passengerEmail = localStorage.getItem("passengerEmail");

//   // auto fill email for booking flow
//   // useEffect(() => {
//   //   if (passengerEmail) {
//   //     setEmail(passengerEmail);
//   //   }
//   // }, [passengerEmail]);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       toast.error("Please fill all fields");
//       return;
//     }

//     if (!emailRegex.test(email)) {
//       toast.error("Enter valid email");
//       return;
//     }

//     // 🔥 PASSENGER EMAIL CHECK
//     const passengerEmail = localStorage.getItem("passengerEmail");
//     if (passengerEmail && passengerEmail !== email) {
//       toast.error("Login email must match passenger email");
//       return;
//     }

//     try {
//       await login(email, password);   // ✅ await
//       toast.success("You're logged in");
//       localStorage.removeItem("passengerEmail");
//       setTimeout(() => (window.location.href = "/"), 800);

//     } catch (err) {
//       const msg = err?.response?.data?.message;
//       const signupRequired = err?.response?.data?.signupRequired;

//       // 🔴 SIGNUP REQUIRED
//       if (signupRequired) {
//         toast.error("Please signup first");
//         setTimeout(() => (window.location.href = "/signup"), 800);
//       }
//       // 🔴 WRONG PASSWORD
//       else {
//         toast.error(msg || "Login failed");
//       }
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
//       style={{ backgroundImage: `url(${bg})` }}
//     >
//       {/* GLASS CARD */}
//       <div className="w-full max-w-4xl rounded-2xl bg-white/20 backdrop-blur-xl shadow-xl border border-white/30 grid md:grid-cols-2 overflow-hidden">

//         {/* LEFT IMAGE */}
//         <div className="hidden md:flex items-center justify-center p-8">
//           <img src={loginimg} alt="login visual" className="max-h-80" />
//         </div>

//         {/* RIGHT FORM */}
//         <div className="p-8 text-white">
//           <h2 className="text-3xl font-semibold mb-8 text-center">Login</h2>

//           {/* EMAIL */}
//           <div className="flex items-center border-b border-white/60 mb-6 pb-2">
//             <FaUser className="h-5 mr-3 opacity-80" />
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}              // ✅ CONTROLLED
//               onChange={(e) => setEmail(e.target.value)}
//               className="bg-transparent outline-none w-full placeholder-white/70"
//             />
//           </div>

//           {/* PASSWORD */}
//           <div className="flex items-center border-b border-white/60 mb-4 pb-2">
//             <FaLock className="h-5 mr-3 opacity-80" />
//             <input
//               type="password"
//               placeholder="Password"
//               className="bg-transparent outline-none w-full placeholder-white/70"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           {/* REMEMBER + FORGOT */}
//           <div className="flex justify-between items-center text-sm mb-6">
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 className="cursor-pointer"
//                 checked={remember}
//                 onChange={() => setRemember(!remember)}
//               />
//               Remember me
//             </label>
//             <span className="hover:underline ml-6 cursor-pointer">
//               Forgot Password?
//             </span>
//           </div>

//           {/* LOGIN BUTTON */}
//           <button
//             onClick={handleLogin}
//             className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-opacity-90 transition  hover:bg-green-600 hover:text-white"
//           >
//             Login
//           </button>

//           {/* REGISTER */}
//           <p className="text-center mt-6 text-sm">
//             Don’t have an account?{" "}

//             <span
//               onClick={() => (window.location.href = "/signup")}
//               className="font-semibold underline cursor-pointer"
//             >
//               Signup here
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

//frontend/src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FaUser, FaLock } from "react-icons/fa";
import bg from "../assets/bg.jpeg";
import loginimg from "../assets/login.jpg";
import api from "../api/axios";

const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Enter valid Gmail address");
      return;
    }

    // 🔐 passenger email check (booking flow)
    const passengerEmail = localStorage.getItem("passengerEmail");
    if (passengerEmail && passengerEmail !== email) {
      toast.error("Login email must match passenger email");
      return;
    }

    try {
      // LOGIN
      await login(email, password);

      toast.success("You're loggedIn");

      // 🔥 LINK GUEST BOOKING AFTER LOGIN
      const bookingId = localStorage.getItem("guestBookingId");

      if (bookingId) {
        await api.post("/bookings/link", { bookingId });
        localStorage.removeItem("guestBookingId");
      }

      localStorage.removeItem("passengerEmail");

      setTimeout(() => {
        window.location.href = "/bookings";
      }, 800);

    } catch (err) {
      const msg = err?.response?.data?.message;
      const signupRequired = err?.response?.data?.signupRequired;


      // 🔥 NEW USER / WRONG PASSWORD → SIGNUP
      if (signupRequired) {
        toast.error("Please signup first");
        setTimeout(() => {
          window.location.href = "/signup";
        }, 800);
        return;
      } else if (msg === "Invalid password") {
        toast.error("Invalid password");
      }else{
        toast.error(msg || "Login failed");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-full max-w-4xl rounded-2xl bg-white/20 backdrop-blur-xl shadow-xl border border-white/30 grid md:grid-cols-2 overflow-hidden">

        {/* LEFT IMAGE */}
        <div className="hidden md:flex items-center justify-center p-8">
          <img src={loginimg} alt="login visual" className="max-h-80" />
        </div>

        {/* RIGHT FORM */}
        <div className="p-8 text-white">
          <h2 className="text-3xl font-semibold mb-8 text-center">Login</h2>

          {/* EMAIL */}
          <div className="flex items-center border-b border-white/60 mb-6 pb-2">
            <FaUser className="h-5 mr-3 opacity-80" />
            <input
              type="email"
              autoComplete="off"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none w-full placeholder-white/70"
            />
          </div>

          {/* PASSWORD */}
          <div className="flex items-center border-b border-white/60 mb-6 pb-2">
            <FaLock className="h-5 mr-3 opacity-80" />
            <input
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none w-full placeholder-white/70"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition"
          >
            Login
          </button>

          <p className="text-center mt-6 text-sm">
            Don’t have an account?{" "}
            <span
              onClick={() => (window.location.href = "/signup")}
              className="font-semibold underline cursor-pointer"
            >
              Signup here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}