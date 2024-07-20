import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../Redux/Actions/User';
import {  Link, useNavigate } from 'react-router-dom';
import './css/login.css';
import './css/baground.css';

const Register = () => {
  const [newUser, setNewUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleUser = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register(newUser));
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      console.error("Registration failed:", error);
      // Optionally handle registration failure, e.g., show error message
    }
  };

  return (
    <div>
                  <img className='books22' src="https://i.pinimg.com/originals/67/18/22/671822c2f63dd5f65d8fd15c9710420b.jpg" alt="books" style={{width:'100%',marginTop:'0%', marginRight:'50%', opacity: '0.5' }} />

         <div className="square-box3"></div>

<div className="square-box4"></div>

<div className="square-box"></div>
<div className="square-box2"></div>

<img className='books' src="https://www.freepnglogos.com/uploads/book-png/old-books-png-transparent-Images-0.png" alt="books" style={{width:'30%',marginTop:'4%', marginRight:'50%',}} />

  <p className='name' style={{marginTop:'1%'}}> Welcome to Book's Paradise!</p>


      <form className="form">
        <h1 className="heading" style={{ textShadow: '2px 2px 2px #d9aa84 ' }}>Register</h1>
        <h5>Or Login If You have an Account      <Link to="/login"> <button className="btn" style={{marginTop:'-2%'}} >Login</button></Link>
        </h5>

        <h5>Welcome..!🧡 </h5>

        <input className="inputt" placeholder="Username" type="text" name='name' onChange={handleChange} style={{ width: '100%' }} />

        <input className="inputt" placeholder="Email" type="email" name='email' onChange={handleChange} style={{ width: '100%' }} />

        <input className="inputt" type="password" placeholder="Password" name='password' onChange={handleChange} style={{ width: '100%' }} />

        <button className="btn" variant="primary" type="submit" onClick={handleUser}>Register</button>
      </form>
      <p className='prg'style={{marginTop:'2%',marginBottom:'-1%'}}>Where your gonna find you favorite book </p>

    </div>
  );
};

export default Register;


