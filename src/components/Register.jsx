import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'



const Register = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const Navigate=useNavigate();

  const[error, setError]=useState('')

  const inputHandler = (e) => {
    setInput((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(1);
    try {
      const res = await axios.post(
        "https://my-biloog-server.onrender.com/api/auth/register",
        input,
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true, // Correct placement
        }
      );
      Navigate('/login')
    } catch (err) {
      console.log(2);
      console.log(err.response.data.Error);
      setError(err.response.data.Error);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <form>
          <h1>Register</h1>

          <div className="element">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter You Name Ex: pikachu"
              name="name"
              onChange={inputHandler}
            />
          </div>

          <div className="element">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Min 5 characters"
              minLength={5}
              name="password"
              onChange={inputHandler}
            />
          </div>

          <div className="element">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="write your E-mail"
              name="email"
              onChange={inputHandler}
            />
          </div>

          <button type="submit" onClick={submitHandler}>
            Register
          </button>
          <p >{error}</p>
          <span>
            Already have an account? Click on
            <Link className="link" to="/login">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
