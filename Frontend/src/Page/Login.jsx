// import React, { useState } from "react";
// import "../pagestyle/login.css";
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios'
// const Login = () => {
//   const navigate =useNavigate()
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     try {
//       console.log("Email:", email, "Password:", password);
//       const response = await axios.post("http://localhost:8080/enter/login", {
//         email,
//         password,
//       });
//       localStorage.setItem("authToken", response.data.token)
//       navigate("/")
//     } catch (error) {
      
//     }
   

//   };

//   return (
//     <div className="login-container">
//       <form className="login-form" onSubmit={handleSubmit}>
//         <h2>Login</h2>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             placeholder="Enter your email"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             placeholder="Enter your password"
//           />
//         </div>
//         <button type="submit" className="login-btn">
//           Login
//         </button>
//         <p className="new-user-text">
//         New user?   <Link to={"/signup"}>Sign up here</Link>
         
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import "../pagestyle/login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for handling errors

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    // Client-side validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/enter/login", {
        email,
        password,
      });

      localStorage.setItem("authToken", response.data.token);
      navigate("/");
    } catch (error) {
      // Handle server-side errors
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Login failed. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
        <p className="new-user-text">
          New user? <Link to={"/signup"}>Sign up here</Link>
        </p>
        {error && <p className="error-text" style={{color:"red"}}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
